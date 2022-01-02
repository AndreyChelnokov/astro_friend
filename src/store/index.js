import Vue from 'vue'
import Vuex from 'vuex'
import auth from './user/auth'
import userdata from "./user/userDB";
import userStorage from './user/userStorage';
import chats from './chats/chats'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    currentChatMessage: [],
    user: {
      baseData: { // Заполняемая в профиле
        photoUrlList: [],
        age: '',
        name: {
          name: '',
          lastName: '',
          patronymic: ''
        },
        zodiac: '',
        pol: '',
        dateAndTimeOfBirth: {
          year: '',
          month: '',
          day: '',
          hours: '',
          minutes: ''
        },
        country: '',
        description: '',
      },
      selectedUsers: [], // Массив id пользователей которы лайкнул +
      rejectedUsers: [], // Массив id пользователей которы дизлайкнул -
      chats: [], // Чаты,
    },
    chatsList: {}
  },
  mutations: {
    UPDATE_MESSAGE(state, newData) {
      state.currentChatMessage = newData
    },
    UPDATE_CHAT_DATA(state, data) {
      state.chatsList[data.name] = data;

      console.log('обновили информацию в сторе на ', state.chatsList[data.name].lastMassage.message)
    },
    SET_USER_DATA (state, newValue) {
      state.user = newValue;
      console.log('Стор обнавлен', state)
    },

    CREATE_USER_EMPTY_FIELDS (state) {
      if (! state.user.selectedUsers) {
        state.user.selectedUsers = [];
      }

      if (! state.user.rejectedUsers) {
        state.user.rejectedUsers = [];
      }

      if (! state.user.baseData.photoUrlList) {
        state.user.baseData.photoUrlList = [];
      }
    },

    UPDATE_USER_POL (state, pol) {
      state.user.baseData.pol = pol;
    },
    UPDATE_USER_ZODIAC (state, zodiac) {
      state.user.baseData.zodiac = zodiac
    },
    UPDATE_USER_AGE (state, age) {
      state.user.baseData.age = age;
    },

    // Фото
    PUSH_USER_PHOTO_ITEM (state, photoObj) {
      if (state.user.baseData.photoUrlList) {
        state.user.baseData.photoUrlList.push(photoObj);
      } else {
        state.user.baseData.photoUrlList = [];
        state.user.baseData.photoUrlList.push(photoObj);
      }
    },
    UPDATE_USER_PHOTO_ITEM_AVATAR (state, id) {
      state.user.baseData.photoUrlList.forEach(photoObj => {
        if (photoObj.id === id) {
          photoObj.avatar = true;
        } else {
          photoObj.avatar = false;
        }
      })
    },
    DELETE_USER_PHOTO_ITEM (state, id) {
      state.user.baseData.photoUrlList.forEach((photoObj, index) => {
        console.log('photoObj.id', photoObj.id)
        console.log('id', id)
        if (photoObj.id === id) {
          state.user.baseData.photoUrlList.splice(index, 1)
        }
      })
    },

    // Обновления полей имекни пользователя
    UPDATE_USER_NAME (state, name) {
      state.user.baseData.name.name = name;
      console.log('UPDATE_USER_NAME', state.user.baseData.name.name)
    },
    UPDATE_USER_LASTNAME (state, lastName) {
      state.user.baseData.name.lastName = lastName;
      console.log('UPDATE_USER_LASTNAME', state.user.baseData.name.lastName)
    },
    UPDATE_USER_PATRONYMIC (state, patronymic) {
      state.user.baseData.name.patronymic = patronymic;
      console.log('UPDATE_USER_PATRONYMIC', state.user.baseData.name.patronymic)
    },

    // Обновления полей даты
    UPDATE_USER_YEAR (state, year) {
      state.user.baseData.dateAndTimeOfBirth.year = year;
      console.log('UPDATE_USER_YEAR', state.user.baseData.dateAndTimeOfBirth.year)
    },
    UPDATE_USER_MONTH (state, month) {
      state.user.baseData.dateAndTimeOfBirth.month = month;
      console.log('UPDATE_USER_MONTH', state.user.baseData.dateAndTimeOfBirth.month)
    },
    UPDATE_USER_DAY (state, day) {
      state.user.baseData.dateAndTimeOfBirth.day = day;
      console.log('UPDATE_USER_DAY', state.user.baseData.dateAndTimeOfBirth.day)
    },

    // Обновления полей времени
    UPDATE_USER_HOURS (state, hours) {
      state.user.baseData.dateAndTimeOfBirth.hours = hours;
      console.log('UPDATE_USER_HOURS', state.user.baseData.dateAndTimeOfBirth.hours)
    },
    UPDATE_USER_MINUTES (state, minutes) {
      state.user.baseData.dateAndTimeOfBirth.minutes = minutes;
      console.log('UPDATE_USER_MINUTES', state.user.baseData.dateAndTimeOfBirth.minutes)
    },

    UPDATE_USER_COUNTRY (state, country) {
      state.user.baseData.country = country;
      console.log('UPDATE_USER_HOURS', state.user.baseData.country)
    },
    UPDATE_USER_DESCRIPTION (state, description) {
      state.user.baseData.description = description;
      console.log('UPDATE_USER_HOURS', state.user.baseData.description)
    },

    PUSH__USER_REJECTED_USERS (state, idUser) {
      if (! Array.isArray(state.user.rejectedUsers)) {
        state.user.rejectedUsers = []
      }
      state.user.rejectedUsers.push(idUser)
    },
    PUSH__USER_SELECTED_USERS (state, idUser) {
      if (! Array.isArray(state.user.selectedUsers)) {
        state.user.selectedUsers = []
      }
      state.user.selectedUsers.push(idUser)
    },

    ADD_NEW_CHAT (state, idUserChat) {
      if (! Array.isArray(state.user.chats)) {
        state.user.chats = []
      }
      state.user.chats.push(idUserChat)
    }
  },

  actions: {
  },
  modules: {
    auth,
    userdata,
    userStorage,
    chats
  },
  getters: {}
})
