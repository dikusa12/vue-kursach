import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/pages/Home/Home.vue";
import About from "@/pages/About/About.vue";
import Login from "@/pages/Login/Login.vue";
import NotFound from "@/pages/NotFound/NotFound.vue";
import Registration from "@/pages/Registration/Registration.vue";
import AddEditCourse from "@/pages/AddEditCourse/AddEditCourse.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/about', component: About },
  { path: '/login', component: Login },
  { path: '/registration', component: Registration },
  { path: '/add-edit-course', component: AddEditCourse },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

