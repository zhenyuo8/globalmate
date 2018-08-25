import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'i18n-vuex'
import globalmate from './globalmate/';
Vue.use(Vuex);
import config from '../config/config'

export default new Vuex.Store({
  state: {
    ip: config[__ENV__].apiHost
  },
  modules: {
    i18n: vuexI18n.store,
    globalmate: globalmate,
  }
})
