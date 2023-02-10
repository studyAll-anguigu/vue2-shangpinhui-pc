import Vue from 'vue';
import VueRouter from 'vue-router';

import Home from '@/views/Home';
import Login from '@/views/Login';
import Register from '@/views/Register';
import Search from '@/views/Search';
import Detail from '@/views/Detail';
import AddCartSuccess from '@/views/AddCartSuccess';

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
      meta: {
        isHideFooter: true, // 隐藏footer
      },
    },
    {
      path: '/register',
      component: Register,
      name: 'Register',
      meta: {
        isHideFooter: true,
      },
    },
    {
      path: '/search',
      component: Search,
      name: 'Search',
    },
    {
      path: '/detail/:id',
      component: Detail,
      name: 'Detail',
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      name: 'AddCartSuccess',
    },
    {
      path: '*',
      redirect: '/home',
    },
  ],
  scrollBehavior() {
    // return 期望滚动到哪个的位置
    return {
      x: 0,
      y: 0,
      behavior: 'smooth', // 平滑效果
    };
  },
});
