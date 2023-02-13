import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';

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

const router = new VueRouter({
  mode: 'history',
  routes: [
    {
      path: '/home',
      component: Home,
      name: 'Home',
      meta: {
        title: '首页',
      },
    },
    {
      path: '/login',
      component: Login,
      name: 'Login',
      meta: {
        isHideFooter: true, // 隐藏footer
        title: '登录',
      },
    },
    {
      path: '/register',
      component: Register,
      name: 'Register',
      meta: {
        isHideFooter: true,
        title: '注册',
      },
    },
    {
      path: '/search',
      component: Search,
      name: 'Search',
      meta: {
        title: '搜索页',
      },
    },
    {
      path: '/detail/:id',
      component: Detail,
      name: 'Detail',
      meta: {
        title: '商品详情页',
      },
    },
    {
      path: '/addcartsuccess',
      component: AddCartSuccess,
      name: 'AddCartSuccess',
      meta: {
        title: '添加购物车成功',
      },
    },
    {
      path: '/shopcart',
      component: ShopCart,
      name: 'ShopCart',
      meta: {
        title: '购物车列表页',
      },
    },
    {
      path: '/center',
      component: Center,
      name: 'Center',
      meta: {
        title: '订单列表',
      },
    },
    {
      path: '/pay',
      component: Pay,
      name: 'Pay',
      meta: {
        title: '支付',
      },
    },
    {
      path: '/paysuccess',
      component: PaySuccess,
      name: 'PaySuccess',
      meta: {
        title: '支付成功',
      },
    },
    {
      path: '/trade',
      component: Trade,
      name: 'Trade',
      meta: {
        title: '订单信息确认',
      },
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

//权限验证： 我的订单，我的购物车，添加购物车，支付
const auth_list = [
  'Center',
  'ShopCart',
  'AddCartSuccess',
  'Pay',
  'PaySuccess',
  'Trade',
];

// 全局 前置路由导航守卫
router.beforeEach((to, from, next) => {
  console.log('to', to);
  console.log('form', from);
  // 如果当前的name在验证列表内，如果不在验证列表，则直接放行
  if (auth_list.includes(to.name)) {
    // 如果已经存在token,继续放行，否则去登录页
    if (store.state.user.token) {
      next();
    } else {
      next({
        name: 'Login',
      });
    }
  } else {
    next();
  }
});

export default router;
