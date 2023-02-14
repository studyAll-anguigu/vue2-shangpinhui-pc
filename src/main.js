import Vue from 'vue';
import App from './App.vue';

// 引入路由对象
import router from './router/index';
import store from './store/index.js';

// 导入api/index.js 默认暴露的所有内容
import api from '@/api/index.js';
Vue.prototype.$api = api;

// 引入重置默认样式
import './styles/normalize.css';

// 引入进度条样式
import 'nprogress/nprogress.css';
// 字体
import '@/styles/iconfont.css';

// 全局引入el-elmentui组件库
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

// 引入图片懒加载库
const loadimage = require('./assets/loading.png');
const errorimage = require('./assets/error.png');
import VueLazyload from 'vue-lazyload';
Vue.use(VueLazyload, {
  preLoad: 1.3,
  error: errorimage,
  loading: loadimage,
  attempt: 1,
});

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
