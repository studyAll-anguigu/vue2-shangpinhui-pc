import Vue from 'vue';
import Vuex from 'vuex';

import {
  reqGetCartList,
  reqUpdateOnecheckCart,
  reqBatchCheckCart,
} from '@/api/shopCart';

// 注册vuex
Vue.use(Vuex);

export default {
  namespaced: true,
  state: {
    cartInfoList: JSON.parse(localStorage.getItem('cartInfoList')) || [],
  },
  getters: {
    // 判断购物车商品是否全选
    isAllChecked(state) {
      return (
        state.cartInfoList.every((item) => item.isChecked) &&
        state.cartInfoList.length
      );
    },
  },
  mutations: {
    // 更新state, 并同步缓存
    SET_CART_LIST(state, data) {
      console.log('触发了SET_CART_LIST', data);
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
      target = isChecked === false ? 0 : 1; // 0代表取消选中   1代表选中

      await reqUpdateOnecheckCart(skuId, target);
      // 更新state,并更新locastrage
      let list = context.state.cartInfoList.map((cart) => {
        if (cart.skuId !== skuId) return cart;
        cart.isChecked = target;
        return cart;
      });
      context.commit('SET_CART_LIST', list);
    },

    // 批量
    async UpdateAllcheckCart({ state, commit }, isChecked) {
      let target = isChecked === false ? 0 : 1;
      // 获得ID列表
      let skuIdList = state.cartInfoList.map((item) => {
        return item.skuId;
      });
      let list = state.cartInfoList.map((item) => {
        item.isChecked = target;
        return item;
      });
      await reqBatchCheckCart(target, skuIdList);

      commit('SET_CART_LIST', list);
    },
  },
};
