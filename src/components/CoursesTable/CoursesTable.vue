<script setup lang="ts">
import { ref, watch } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { collection, doc, deleteDoc, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../../../firebase.js';
import loader from '../../../public/loader.svg';

const store = useStore();
const courses = ref(store.state.courses);
const router = useRouter();

watch(() => store.state.courses, () => {
  courses.value = store.state.courses;
});

const editCourse = (course) => {
  router.push('add-edit-course/' + course.id);
};

const deleteCourse = async (course) => {
  await store.dispatch('deleteCourse', course.id);
  const q = query(collection(db, 'courses'), where('id', '==', course.id));
  onSnapshot(q, (querySnapshot) => {
    querySnapshot.docs.map(document => deleteDoc(doc(db, 'courses', document.id)));
  });
};
store.commit('SET_IS_LOADING', false);

</script>

<template>
  <img v-if="store.state.isLoading" :src="loader" alt="" class="mx-auto w-[10%]">
  <div v-else v-if="store.state.courses">
    <h2 class="text-lg font-semibold mb-4">Courses</h2>
    <table class="min-w-full">
      <thead>
      <tr>
        <th class="py-2 px-2 text-left">Course Name</th>
        <th class="py-2 text-left">Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(course, index) in courses" :key="course.id" :class="{'bg-gray-100': index % 2 !== 0}">
        <td class="p-2">{{course.title }}</td>
        <td class="py-2">
          <button @click="editCourse(course)" class="text-blue-500 mr-2">Edit</button>
          <button @click="deleteCourse(course)" class="text-red-500">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>
