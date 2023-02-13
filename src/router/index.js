import Vue from 'vue';
import VueRouter from 'vue-router';

//   /* webpackChunkName: "Home" */ 是webpack的特殊备注，
// 作用在于打包项目时，打包后对应的js文件会以指定名称命名

const Home = () => import(/* webpackChunkName: "Home" */ '@/views/Home');
const Login = () => import('@/views/Login');
const Register = () => import('@/views/Register');
const Search = () => import('@/views/Search');
const Detail = () => import('@/views/Detail');
const AddCartSuccess = () => import('@/views/AddCartSuccess');
const ShopCart = () => import('@/views/ShopCart');
const Center = () => import('@/views/Center');
const Pay = () => import('@/views/Pay');
const PaySuccess = () => import('@/views/PaySuccess');
const Trade = () => import('@/views/Trade');

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
      path: '/shopcart',
      component: ShopCart,
      name: 'ShopCart',
    },
    {
      path: '/center',
      component: Center,
      name: 'Center',
    },
    {
      path: '/pay',
      component: Pay,
      name: 'Pay',
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      name: 'PaySuccess',
    },
    {
      path: '/trade',
      component: Trade,
      name: 'Trade',
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
