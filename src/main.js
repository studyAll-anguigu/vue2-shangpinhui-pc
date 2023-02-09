import Vue from 'vue';
import App from './App.vue';

// 引入路由对象
import router from './router/index';
import store from './store/index.js';
// 引入重置默认样式
import './styles/normalize.css';

// 引入进度条样式
import 'nprogress/nprogress.css';
// 字体
import '@/styles/iconfont.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
