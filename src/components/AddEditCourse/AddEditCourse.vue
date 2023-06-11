<script setup lang="ts">
import { ref } from 'vue';
import { db } from '../../../firebase.js';
import router from '@/utils/routes.js';
import { addDoc, collection, updateDoc, getDocs, doc } from 'firebase/firestore';
import { uploadImage } from '@/api/mediaController.js';
import { useStore } from 'vuex';

const props = defineProps(['course', 'image']);
const course = props.course && JSON.parse(JSON.stringify(props?.course));
const imageLink = props.image && JSON.parse(JSON.stringify(props?.image));
const name = ref(course?.title);
const description = ref(course?.description);
const language = ref(course?.language || 'js');
const image = ref(imageLink?.source_url);
const imageFile = ref(imageLink);
const store = useStore();

const handleImage = (e) => {
  if ('id' in imageFile) {
    image.value = imageFile.source_url
  } else {
    image.value = URL.createObjectURL(e.target.files[0]);
  }
  imageFile.value = e.target.files[0];
};

const handleUploadImage = async () => {
  if ((imageLink && !('source_url' in imageLink)) || !('id' in imageFile.value)) {
    const imageFormData = new FormData();
    imageFormData.append('file', imageFile.value );
    return await uploadImage(imageFormData);
  }
};

const onSubmit = async (data) => {
  const formData = data.target.elements;
  const imageResponse = await handleUploadImage();
  const courseData = {
    title: formData.name.value,
    description: formData.description.value,
    language: formData.language.value,
    imageId: imageResponse?.data.id ? imageResponse.data.id : course?.imageId,
    id: Date.now()
  };

  store.commit('SET_COURSES', [])

  if (props?.course) {
    const courses = await getDocs(collection(db, 'courses'));
    const filtered = courses.docs.filter(doc => doc.data().id === +course.id);
    await updateDoc(doc(db, 'courses', filtered[0].id), { ...courseData, id: props.course.id })
  } else {
    await addDoc(collection(db, 'courses'), courseData);
  }
  await router.push('/dashboard/courses');
};

</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add new course</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="onSubmit" class="space-y-2">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Course Name</label>
        <input
            id="name"
            name="name"
            type="text"
            v-model="name"
            required
            class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >

        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Course Description</label>
        <textarea
            id="description"
            name="description"
            type="text"
            v-model="description"
            required
            class="block resize-none h-24 mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />

        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Course language</label>
        <select
            id="language"
            name="language"
            v-model="language"
            required
            class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="js" selected>Javascript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="react">React</option>
        </select>

        <div>
          <label
              class="inline-block text-sm rounded-md w-full mt-2 font-medium leading-6 text-gray-900 border-2 py-1.5 px-3 shadow-sm cursor-pointer"
              for="image"
          >Select course image</label>
          <input type="file" class="hidden" accept="image/*" name="image" id="image" @change="handleImage">
          <img v-if="image" :src="image" class="w-[50%] my-4" alt="upload" />
        </div>
        <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Submit
        </button>
      </form>
    </div>
  </div>
</template>
