import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Search from '@/views/Search';

Vue.use(VueRouter);

export default new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'Home',
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
    },
    {
      path: '/register',
      component: Register,
      name: 'Register',
    },
    {
      path: '/search',
      component: Search,
      name: 'Search',
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
});
