// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import vueScrollBehavior from 'vue-scroll-behavior'
import InfiniteLoading from 'vue-infinite-loading'
import 'normalize.css'

Vue.use(vueScrollBehavior, { router: router })
Vue.use(InfiniteLoading, {
  system: {
    throttleLimit: 5000
  }
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App }
})
