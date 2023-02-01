import Vue from 'vue';
import App from './App.vue';

// 引入路由对象
import router from './router/index';
// 引入重置默认样式
import './styles/normalize.css';

Vue.config.productionTip = false;

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
