import Vue from 'vue'
import Vuex from 'vuex'

import user from './modules/user'
import docs from './modules/docs'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user,
    docs
  }
})
