<template>
  <div
      class="cart-item"
      :data-id="selectableUser.id"
      :style="{ zIndex: index }"
  >
    <img class="cart-item__img" src="" alt="">
    <div class="cart-item__footer">
      <div class="cart-item__content">
        <div class="cart__name">{{ selectableUser.baseData.name.name }}</div>
        <div class="cart__age">{{ selectableUser.baseData.age }}</div>
        <div class="cart__description">{{ selectableUser.baseData.description }}</div>
      </div>
      <div class="cart-item__btns">
        <div @click="removeCart(selectableUser.id)" class="cart__btn">Удалить</div>
        <div @click="clickAddUser(selectableUser.id)" class="cart__btn">Добавить</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'userCart',
  data: function() {
    return {
      user: {
        rejectedUsers: [],
        selectedUsers: []
      }
    }
  },
  props: {
    selectableUser: Object, // Пользователь которого выбираю
    atherUserSelectedArr: Array, // Массив тех кого лайкал пользователь которого я выбираю
    index: Number
  },
  methods: {
    clickAddUser: async function (mySelectedUserID /* ID пользователя которого я лайкнул */) {
      this.addCartFromSelectedUsers(mySelectedUserID); // Добавляем в лайкнутые
      const isMatchSelectableUser = this.isMatch(mySelectedUserID) // Было ли совпадение

      if (isMatchSelectableUser) {
        // Добавляем запись в БД совпавшему пользователю
        const chatName = await this.$store.dispatch('initNewChat', {
          companionId: mySelectedUserID
        }); // Создаем чат

        await this.$store.dispatch('updateChatsUser', { idSelectableUser: mySelectedUserID, chatName }); // Добавляем чат компаньену в список чатов



        // Добавляем запись в стор.
        this.$store.commit('ADD_NEW_CHAT', chatName) // Добавлчем чат в свой список чатов
      }

      // Обнавляем БД из стора
      await this.$store.dispatch('clientUpdate', this.$store.state.user)
    },
    addCartFromSelectedUsers: function (mySelectedUserID) {
      if (mySelectedUserID) {
        this.$store.commit('PUSH__USER_SELECTED_USERS', mySelectedUserID);
      }
    },

    removeCart: function (id) {
      if (id) {
        this.$store.commit('PUSH__USER_REJECTED_USERS', id)
        this.$store.dispatch('clientUpdate', this.$store.state.user)
      }
    },

    // deleteCardFromBaseList: function (id) {
    //   this.notSelectedUsers.forEach((user, i) => {
    //     if (user.id === id) {
    //       this.notSelectedUsers.splice(i, 1);
    //     }
    //   })
    // },

    isMatch: function(mySelectedUserID /* Тот кого я лайкнул */){
      // Проверяем есть ли у пользователя id которого принимает я в массиве selectedUser
      let isMatch = false;

      if (Array.isArray(this.atherUserSelectedArr)) {
        this.atherUserSelectedArr.forEach(hisSelectedUserId => {
          console.log('Я лайкнул', mySelectedUserID)
          console.log('Онлайкал', hisSelectedUserId)

          if (mySelectedUserID == hisSelectedUserId) {
            isMatch =  true;
          }
        })
      }

      console.log(isMatch)
      return isMatch;

    },
  },
  components: {},
  computed: {},
  mounted: function () {}
}
</script>



<style>
  .cart-item__img{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .cart-item__footer {
    position: absolute;
    width: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    border-top: 1px solid;
  }
  .cart-item__content {
    padding: 10px;
  }
  .cart-item__btns {
    display: flex;
    justify-content: space-around;
    height: 40px;
    align-items: center;
  }
</style>
