import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    loginState: false,
    username: ''
  },
  mutations: {
    userLogin(state, username){
      state.loginState = true
      state.username = username
    },
    userLogout(state){
      state.loginState = false
      state.username = undefined
    }
  },
  actions: {
  },
  modules: {
  },
  getters: {
    getLoginState(state){
      return state.loginState
    }
  }
})
