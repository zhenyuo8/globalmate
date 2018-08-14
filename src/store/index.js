import Vue from 'vue';
import Vuex from 'vuex';
import vuexI18n from 'i18n-vuex'
import globalmate from './globalmate/';
Vue.use(Vuex);

export default new Vuex.Store({
    modules: {
        i18n: vuexI18n.store,
        business: globalmate,
    }
})
