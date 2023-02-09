import Vue from 'vue';
import Vuex from 'vuex';
// 导入vuex持久化的插件
Vue.use(Vuex);

const store = new Vuex.Store({
  strict: true,
  state: {
    userInfo: null,
  },
  mutations: {
    setUerInfo(state, payload) {
      // payload: 载荷，就是commit调用时，额外传过来的数据
      state.userInfo = payload;
    },
  },
});

export default store;
