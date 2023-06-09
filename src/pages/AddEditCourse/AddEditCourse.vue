<script setup lang="ts">
import { getStorage, uploadBytes } from "firebase/storage";
import { ref } from 'vue';

console.log(getStorage());
const name = ref('')
const description = ref('')
const language = ref('')
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Add new course</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="" class="space-y-2">
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
        <input
            id="description"
            name="description"
            type="text"
            v-model="description"
            required
            class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >

        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Course language</label>
        <select
            id="language"
            name="language"
            type="text"
            v-model="language"
            required
            class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >
          <option value="js">Javascript</option>
          <option value="html">HTML</option>
          <option value="css">CSS</option>
          <option value="react">React</option>
        </select>

        <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Submit
        </button>
      </form>
    </div>
  </div>
</template>
