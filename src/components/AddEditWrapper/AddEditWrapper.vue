<script setup lang="ts">
import { useRoute } from 'vue-router';
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../../../firebase.js';
import { getImageById } from '@/api/mediaController.js';
import { onMounted, ref } from 'vue';
import { useStore } from 'vuex';
import AddEditCourse from '@/components/AddEditCourse/AddEditCourse.vue';

const route = useRoute();
const store = useStore();
const image = ref();
const course = ref();

const getCourse = async () => {
  if (route.params.id) {
    store.commit('SET_IS_LOADING', true);
    const courses = await getDocs(collection(db, 'courses'));
    const doc = courses.docs.filter(doc => doc.data().id === +route.params.id ? course.value = doc.data() : '');

    const response = await getImageById([...doc][0].data().imageId);
    image.value = response.data;
    store.commit('SET_IS_LOADING', false);
  }
};


onMounted(() => {
  getCourse();
});

</script>

<template>
  <AddEditCourse v-if="course && image" :course="course" :image="image" />
</template>
