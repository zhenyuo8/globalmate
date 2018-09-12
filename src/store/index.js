import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'i18n-vuex'
import globalmate from './globalmate/';
Vue.use(Vuex);
import config from '../config/config'

export default new Vuex.Store({
  state: {
    ip: config[__ENV__].apiHost,
    // wxAppId: 'wx4107d508cc1d5171',
    wxAppId: 'wxfd37dadae5230dc9',
    // wxAppSecret: '2d437dabf5d45f5bbaed8f727631c6cb',
    wxAppSecret: '2e3bb44a9bea31b7ef4adee7fc75045b',
    isWXVerified: false
  },
  mutations: {
    updateWxVertified (state, payload) {
      state.isWXVerified = payload.isWXVerified
    }
  },
  modules: {
    i18n: vuexI18n.store,
    globalmate: globalmate,
  }
})
