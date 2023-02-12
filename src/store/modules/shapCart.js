import Vue from 'vue';
import Vuex from 'vuex';

import {
  reqGetCartList,
  reqUpdateOnecheckCart,
  reqBatchCheckCart,
  reqUpdateSkuNum,
  reqDelOneCart,
  reqDelBatchCart,
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
    // 批量删除的id列表
    batchDeleteSkuIdList(state) {
      let list = [];
      state.cartInfoList.forEach((item) => {
        if (item.isChecked) list.push(item.skuId);
      });
      return list;
    },
    // 已选商品数量
    totalNums(state) {
      const list = state.cartInfoList;
      let nums = 0;
      list.forEach((item) => {
        if (item.isChecked) {
          nums += item.skuNum;
        }
      });
      return nums;
    },
    // 总价
    totalPrice(state) {
      let total = 0;
      let list = state.cartInfoList;
      list.forEach((item) => {
        if (item.isChecked) {
          total += item.skuNum * item.skuPrice;
        }
      });
      return total;
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
    // 全选 、 全不选
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
    // 添加到购物车 (改变购物车列表的商品数量, 对已有物品进行数量改动)
    async updateCartSkuNum(context, data) {
      const skuId = data.skuId;
      const value = data.newValue - data.oldValue;
      // 发送请求
      await reqUpdateSkuNum(skuId, value);
      // // 更新state，同步缓存
      let cartInfoList = context.state.cartInfoList;
      cartInfoList = cartInfoList.map((item) => {
        if (item.skuId !== data.skuId) return item;
        // 更新数量
        item.skuNum += value;
        return item;
      });
      context.commit('SET_CART_LIST', cartInfoList);
    },
    // 删除购物车商品 （单个）
    async delOneCart(context, skuId) {
      let list = context.state.cartInfoList;
      await reqDelOneCart(skuId);

      list = list.filter((item) => item.skuId !== skuId);
      context.commit('SET_CART_LIST', list);
    },
    // 删除购物车商品（批量）
    async delBatchCart(context, skuIdList) {
      await reqDelBatchCart(skuIdList);
      let list = context.state.cartInfoList;

      list = list.filter((item) => {
        // skuid包含在删除商品列表内，则过滤掉
        return !skuIdList.includes(item.skuId);
      });
      context.commit('SET_CART_LIST', list);
    },
  },
};
