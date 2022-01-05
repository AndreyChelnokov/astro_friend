import Vue from 'vue'
import Vuex from 'vuex'
import auth from './user/auth'
import userdata from "./user/userDB";
import userStorage from './user/userStorage';


import user from './new/user'
import chat from './new/chat'
import storage from './new/storage'
import photo from './new/photo'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    chatsList: {}
  },
  mutations: {

    UPDATE_CHAT_DATA(state, data) {
      state.chatsList[data.name] = data;
    }
  },

  actions: {
  },
  modules: {
    auth,
    userdata,
    userStorage,

    chat,
    user,
    storage,
    photo
  },
  getters: {}
})
