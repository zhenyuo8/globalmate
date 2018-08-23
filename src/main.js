// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import VueRouter from 'vue-router';
import App from './App'
import axios from 'axios';
import qs from 'qs';
import moment from 'moment'
import router from './router'
import './assets/css/reset.css'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import Mint from'mint-ui'
import'mint-ui/lib/style.css'
import utils from './libs/js/util.js'
import VueLazyLoad from 'vue-lazyload'
import VueI18n from 'vue-i18n';
import messages from './locales';
import store from './store'

require('es6-promise').polyfill();
window.Vue = Vue;
Vue.prototype.$eventbus = new Vue()
const defaultLang='zh-CN';
const eventbus = new Vue()
Vue.prototype.$eventbus = eventbus
Vue.use(VueI18n)
Vue.use(Mint);
Vue.use(VueAwesomeSwiper)
Vue.prototype.axios = axios
Vue.prototype.moment = moment
Vue.prototype.qs = qs
Vue.prototype.$utils = utils
Vue.config.productionTip = false

const langLoaded = Object.keys(messages)
let lang = navigator.language || defaultLang;
lang = /^zh/.test(lang) ? 'zh-CN' : /^en/.test(lang) ? 'en' : /^es/.test(lang) ? 'es' : lang;
Vue.locale = () => {};
const i18n = new VueI18n({
  locale: defaultLang,
  messages
})
const loadLang = (langToLoad) => {
  if (!~langLoaded.indexOf(langToLoad)) {
     import(`./locales/${langToLoad}.js`).then((args) => {
      i18n.setLocaleMessage(langToLoad, args.default)
    }).catch(() => {
      lang = defaultLang
    })
  }
  return Promise.resolve()
}
/* eslint-disable no-new */

loadLang(lang).then(() => {
  i18n.locale = lang
  new Vue({
    el: '#app',
    i18n,
    router,
    store,
    components: { App },
    template: '<App/>'
  })
})
// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
