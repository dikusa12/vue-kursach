<script setup lang="ts">
import CourseItem from '@/components/CourseItem/CourseItem.vue';
import { useStore } from 'vuex';
import loader from '../../../public/loader.svg';

const store = useStore();
store.commit('SET_IS_LOADING', true)
</script>

<template>
  <div class="container mx-auto my-32">
    <img v-if="store.state.isLoading" :src="loader" alt="" class="mx-auto w-[10%]">
    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 cursor-pointer">
      <CourseItem v-if="store.state.courses" v-for="course in store.state.courses" :role="store.state.user.role" :course="course" :key="course.id" />
    </div>
  </div>
</template>