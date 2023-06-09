<script setup lang="ts">
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { app, db } from '../../../firebase.js';
import { getDoc, doc } from "firebase/firestore";


const store = useStore();
const router = useRouter();
const auth = getAuth(app);

const loggedIn = ref(false)
const role = ref()

const getRole = async (user) => {
  const roleDoc = await getDoc(doc(db, 'roles', user.uid))
  role.value = roleDoc.data().role;
}

onAuthStateChanged(auth,  (user) => {
  if (user) {
    store.dispatch('fetchUser', user);
    loggedIn.value = true;
    getRole(user)
  }
});
const logout = async () => {
  await store.dispatch('logOut');
  await router.push('/login');
};
</script>

<template>
  <div class="w-full h-[80px] bg-indigo-600 flex justify-end px-16 items-center">
    <div class="flex gap-12 items-center">
      <router-link class="text-white" to="/">Home</router-link>
      <router-link class="text-white" to="/courses">Courses</router-link>
      <router-link
          v-if="!loggedIn"
          to="/login"
          custom
          v-slot="{ navigate }"
      >
        <button
            class="bg-indigo-900 rounded-md px-6 py-2 text-white"
            @click="navigate"
            role="link"
        >
          Login
        </button>
      </router-link>
      <button
          v-else
          class="bg-indigo-900 rounded-md px-6 py-2 text-white"
          @click="logout"
          role="link"
      >
        Logout
      </button>

      <router-link
          v-if="role === 'admin'"
          to="/add-edit-course"
          custom
          v-slot="{ navigate }"
      >
        <button
            class="bg-indigo-900 rounded-md px-6 py-2 text-white"
            @click="navigate"
            role="link"
        >
          Add Course
        </button>
      </router-link>
    </div>
  </div>
</template>