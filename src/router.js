import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home.vue';
import AddSmoothie from '@/views/AddSmoothie.vue';
import EditSmoothie from '@/views/EditSmoothie.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home Page',
    component: Home,
  },
  {
    path: '/add-smoothie',
    name: 'Add Smoothie',
    component: AddSmoothie,
  },
  {
    path: '/edit-smoothie/:slug',
    name: 'Edit Smoothie',
    component: EditSmoothie,
  },
];

const router = new VueRouter({ mode: 'history', routes });

export default router;
