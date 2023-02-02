import Vue from 'vue';
import Vuex from 'vuex';
// 引入数据持久化
import createPersistedState from 'vuex-persistedstate';
Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    usersInfo: null,
  },
  getters: {},
  mutations: {},
  actions: {},
  modules: {},
  plugins: [createPersistedState],
});
