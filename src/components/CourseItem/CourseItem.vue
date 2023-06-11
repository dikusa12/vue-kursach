<script setup lang="ts">
import { getImageById } from '@/api/mediaController.js';
import { ref, onMounted } from 'vue';
import { useStore } from 'vuex';
import router from '@/utils/routes.js';
import { formatChip } from '@/utils/formatChip.js'

const props = defineProps(['course', 'role']);
const image = ref();
const store = useStore();

const getImage = async () => {
  const response = await getImageById(props.course.imageId);
  image.value = response.data.source_url;
  store.commit('SET_IS_LOADING', false);
};

const navigateToSingleCourse = () => {
  router.push('/course/' + props.course.id)
}

onMounted(() => {
  getImage();
});
</script>

<template>
  <div @click="navigateToSingleCourse" v-if="!store.state.isLoading" class="bg-white hover:shadow-xl transition-shadow rounded-lg shadow-lg">
    <img :src="image" alt="Image 1" class="w-full h-48 object-cover rounded-t-lg">
    <div class="p-4">
      <h3 class="text-lg font-semibold mb-2">{{ props.course.title }}</h3>
      <div class="flex items-center mb-2">
        <div v-if="course.language" class="bg-blue-500 text-white font-medium rounded-full py-2 px-4 text-xs">{{ formatChip(props.course) }}</div>
      </div>
      <p class="text-sm text-gray-700">{{ props.course.description }}</p>
      <button v-if="props.role === 'customer'" class="text-sm text-gray-700">Enroll in a course</button>
    </div>
  </div>
</template>

<style scoped>

</style>