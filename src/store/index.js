import Vue from 'vue'
import Vuex from 'vuex'
import auth from './user/auth'
import userdata from "./user/userDB";
import userStorage from './user/userStorage'


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    user: {
      pol: ''
    }
  },
  mutations: {
    SET_POL(state, value) {
      state.user.pol = value;
    }
  },
  actions: {
  },
  modules: {
    auth,
    userdata,
    userStorage
  }
})
