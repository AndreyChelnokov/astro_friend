<template>
  <div
      class="cart-item"
      :data-id="otherUser.id"
      :style="{ zIndex: index }"
  >
    <img class="cart-item__img" src="" alt="">
    <div class="cart-item__footer">
      <div class="cart-item__content">
        <div class="cart__name">{{ otherUser.baseData.name.name }}</div>
        <div class="cart__age">{{ otherUser.baseData.age }}</div>
        <div class="cart__description">{{ otherUser.baseData.description }}</div>
      </div>
      <div class="cart-item__btns">
        <div @click="clickRemoveOtherUser(otherUser.id)" class="cart__btn">Удалить</div>
        <div @click="clickAddOtherUser(otherUser.id)" class="cart__btn">Добавить</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'appUserCard',
  props: {
    otherUser: Object,
    index: Number,
  },
  methods: {
    clickAddOtherUser: async function (idOtherUser) {
      this.$emit('otherUserAdd', idOtherUser)
      this.$emit('changeOtherUser', idOtherUser)

      const myId = await this.$store.dispatch('getUid');
      if (await this.isMathUser(myId)) {
        await this.$store.dispatch('ADD_CHAT_NAME_USER', {
          userId: myId,
          chatName: `${this.otherUser.id}${myId}`
        }) // Добавляем название в список чатов пользователя myId
        await this.$store.dispatch('ADD_CHAT_NAME_USER', {
          userId: this.otherUser.id,
          chatName: `${this.otherUser.id}${myId}`
        }) // Добавляем название в список чатов пользователя this.otherUser.id

        await this.$store.dispatch('CREATE_CHAT', {
          chatName: `${this.otherUser.id}${myId}`,
          users: [this.otherUser.id, myId]
        })
        // todo Создаем чат ${this.otherUser.id}${myId}
      }
    },
    clickRemoveOtherUser: function (idOtherUser) {
      this.$emit('otherUserRemove', idOtherUser)
      this.$emit('changeOtherUser', idOtherUser)
    },

    isMathUser: async function (myId) {
      let isMath = false;
      if(Array.isArray(this.otherUser.selectedUsers)) {
        isMath = Boolean(this.otherUser.selectedUsers.indexOf(myId));
      }

      return isMath;
    }
  },
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
