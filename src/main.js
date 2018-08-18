// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
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

Vue.use(Mint);
Vue.use(VueAwesomeSwiper)
Vue.prototype.axios = axios
Vue.prototype.moment = moment
Vue.prototype.qs = qs
Vue.prototype.$utils = utils
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
