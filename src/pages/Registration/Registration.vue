<script setup lang="ts">
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

const name = ref('');
const email = ref('');
const password = ref('');
const error = ref(null);

const store = useStore();
const router = useRouter();

const register = async () => {
  try {
    await store.dispatch('register', {
      email: email.value,
      password: password.value,
      name: name.value
    });
    await router.push('/');
  } catch (err) {
    console.log(err.message);
    error.value = err.message;
  }
};
</script>

<template>
  <div class="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">Register account
        account</h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form @submit.prevent="register" class="space-y-2">
        <label for="email" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
        <input
            id="email"
            name="email"
            type="email"
            v-model="email"
            required
            class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >

        <label for="password" class="block text-sm font-medium leading-6 text-gray-900">Password</label>
        <input
            id="password"
            name="password"
            type="password"
            v-model="password"
            autocomplete="current-password"
            required
            class="block mt-2 w-full rounded-md border-0 py-1.5 px-3 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        >

        <h3 v-if="error" class="text-red-600">Invalid username or password</h3>

        <button
            type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >Register
        </button>
      </form>

      <p class="mt-10 text-center text-sm text-gray-500">
        Already registered?
        <router-link to="/login" class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">Login now
        </router-link>
      </p>
    </div>
  </div>
</template>
