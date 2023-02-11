import Vue from 'vue';
import Vuex from 'vuex';

import user from './modules/user';
import shopCart from './modules/shapCart';
Vue.use(Vuex);

const store = new Vuex.Store({
  modules: { user, shopCart },
});

export default store;
