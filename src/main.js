import Vue from 'vue';
import App from './App.vue';

// 引入路由对象
import router from './router/index';
import store from './store';
// 引入重置默认样式
import './styles/normalize.css';
import 'nprogress/nprogress.css';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
