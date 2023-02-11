import Vue from 'vue';
import Vuex from 'vuex';

import { reqGetCartList, reqUpdateOnecheckCart } from '@/api/shopCart';

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
      localStorage.setItem('cartInfoList', JSON.stringify(data));
    },
  },
  actions: {
    // 获取购物车列表
    async getCartList(context) {
      const res = await reqGetCartList();
      if (res[0]) {
        context.commit('SET_CART_LIST', res[0].cartInfoList);
      }
    },
    // 修改单个商品状态
    async UpdateOnecheckCart(context, { skuId, isChecked }) {
      let target = isChecked;
      target = isChecked === 'false' ? 1 : 0; // 0代表取消选中   1代表选中
      await reqUpdateOnecheckCart(skuId, target);
      // 更新state,并更新locastrage
      let list = context.state.cartInfoList.map((cart) => {
        if (cart.skuId === skuId) {
          cart.isChecked = target;
          return cart;
        }
        return cart;
      });
      context.commit('SET_CART_LIST', list);
    },
  },
};
