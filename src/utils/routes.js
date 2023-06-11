import { createRouter, createWebHistory } from 'vue-router';
import Home from "@/pages/Home/Home.vue";
import Login from "@/pages/Login/Login.vue";
import NotFound from "@/pages/NotFound/NotFound.vue";
import Registration from "@/pages/Registration/Registration.vue";
import AddEditCourse from "@/components/AddEditCourse/AddEditCourse.vue";
import Courses from "@/pages/Courses/Courses.vue";
import SingleCourse from "@/pages/SingleCourse/SingleCourse.vue";
import Dashboard from "@/pages/Dashboard/Dashboard.vue";
import CoursesTable from "@/components/CoursesTable/CoursesTable.vue";
import AddEditWrapper from "@/components/AddEditWrapper/AddEditWrapper.vue";

const routes = [
  { path: '/', component: Home },
  { path: '/login', component: Login },
  { path: '/registration', component: Registration },
  { path: '/courses', component: Courses },
  { path: '/course/:id', component: SingleCourse },
  {
    path: '/dashboard',
    component: Dashboard,
    children: [
      { path: 'courses', component: CoursesTable, },
      { path: 'add-edit-course', component: AddEditCourse, },
      { path: '/dashboard/add-edit-course/:id', component: AddEditWrapper },
    ],
  },
  { path: '/:pathMatch(.*)*', component: NotFound }
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;

