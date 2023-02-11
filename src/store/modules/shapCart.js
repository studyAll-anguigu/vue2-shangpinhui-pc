import Vue from 'vue';
import Vuex from 'vuex';

import { reqGetCartList } from '@/api/shopCart';

// 注册vuex
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    cartInfoList: [],
  },
  getters: {},
  mutations: {
    SET_CART_LIST(state, data) {
      // 更新state中的cartInfoList数据
      state.cartInfoList = data;
    },
  },
  actions: {
    async getCartList(context) {
      const res = await reqGetCartList();
      if (res[0]) {
        context.commit('SET_CART_LIST', res[0].cartInfoList);
      }
    },
  },
};
