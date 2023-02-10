import Vue from 'vue';
import Vuex from 'vuex';

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
