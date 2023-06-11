<script setup lang="ts">

import { ref, watch } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const route = useRoute();
const activeTab = ref( route.fullPath.includes('courses') ? 'courses' : 'addCourse');
const router = useRouter();

watch(
    () => route.fullPath,
    async () => activeTab.value = route.fullPath.includes('courses') ? 'courses' : 'addCourse');
</script>

<template>
  <div class="flex h-[calc(100vh-80px)]">
    <div class="bg-gray-200 w-1/4 p-4">
      <h1 class="text-xl font-bold mb-4">Dashboard</h1>
      <div class="space-y-4">
        <router-link
            @click="activeTab = 'courses'"
            to="/dashboard/courses"
            :class="{
            'block': 'block',
            'bg-blue-500 text-white': activeTab === 'courses',
            'text-blue-500': activeTab !== 'courses'
          }"
            class="px-4 py-2 rounded-lg w-full text-left"
        >
          Courses
        </router-link>
        <router-link
            to="/dashboard/add-edit-course"
            :class="{
            'block': 'block',
            'bg-blue-500 text-white': activeTab === 'addCourse',
            'text-blue-500': activeTab !== 'addCourse'
          }"
            class="px-4 py-2 rounded-lg w-full text-left"
            @click="activeTab = 'addCourse'"
        >
          Add Course
        </router-link>
      </div>
    </div>

    <div class="flex-grow p-4">
      <router-view></router-view>
    </div>
  </div>
</template>