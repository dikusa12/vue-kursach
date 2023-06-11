<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getDocs, collection, getDoc, doc } from 'firebase/firestore';
import { db } from '../../../firebase.js';
import loader from '../../../public/loader.svg';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';

const route = useRoute();
const id = route.params.id;
const course = ref();
const store = useStore();
import { formatChip } from '@/utils/formatChip.js';
import { getImageById } from '@/api/mediaController.js';

const image = ref();
const getCourse = async () => {
  store.commit('SET_IS_LOADING', true);
  const courses = await getDocs(collection(db, 'courses'));
  const doc = courses.docs.filter(doc => doc.data().id === +id ? course.value = doc.data() : '');

  const response = await getImageById([...doc][0].data().imageId);
  image.value = response.data.source_url;
  store.commit('SET_IS_LOADING', false);
};

onMounted(() => {
  getCourse();
});

</script>

<template>
  <div v-if="store.state.isLoading" class="grid h-[80vh] place-items-center">
  <img class="mx-auto w-[10%]" :src="loader" alt="">
  </div>
  <div v-else v-if="course" class="container mx-auto mt-24">
    <div class="mx-auto w-min">
    <img :src="image" alt="Image" class="min-w-[400px] object-cover rounded-lg">
    <div class="w-min bg-blue-500 text-white mt-4 rounded-full py-2 px-4 text-xs">{{ formatChip(course) }}</div>
    <h3 class="text-lg font-semibold my-2">{{ course.title }}</h3>
    <p class="text-gray-700 mb-2">{{ course.description }}</p>
    </div>
  </div>


</template>
