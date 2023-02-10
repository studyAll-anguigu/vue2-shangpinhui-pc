/**
 * 总结：
 * namespace最好都要开启，
 *     true：代表是一个独立的模块
 *     false： 所有的内容都会汇总到主模块中。axtons和mutaions与主模块合并，容易发生同名与修改同一个数据
 *
 * action： 一般用来发送请求，获取数据。把返回的数据同步到state中。异步任务。
 *          且最后只能通过commit mutaion来实现修改数据
 * mutaion  ： 修改数据的唯一途径，直接修改。同步任务。
 *
 * getter ： 仅仅读取的计算属性
 *
 * */
import Vue from 'vue';
import Vuex from 'vuex';

import { reqUserLogin } from '@/api/user';

Vue.use(Vuex);

// 从localstoreage中获取有用户数据
const initUserInfo = JSON.parse(localStorage.getItem('userInfo')) || {
  token: '',
  nickName: '',
};

export default {
  namespaced: true,
  state: initUserInfo,
  getters: {},
  mutations: {
    LOGIN(state, user) {
      state.token = user.token;
      state.nickName = user.nickName;
      // 数据持久化
      localStorage.setItem('userInfo', JSON.stringify(user));
    },
  },
  actions: {
    // 登录
    async login(context, user) {
      const res = await reqUserLogin(user.phone, user.password);
      // 提交mutaion
      context.commit('LOGIN', res);
    },
  },
};
