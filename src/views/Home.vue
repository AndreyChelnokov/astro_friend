<template>
  <div class="content-page home">
    <div ref="users" class="cart__list">
      <app-user-card
          v-for="(otherUser, index) in notSelectedUsers"
          :otherUser="otherUser"
          :key="index"
          :index="index"
          @changeOtherUser="changeOtherUser"
          @otherUserAdd="addOtherUserSelectedArray"
          @otherUserRemove="addOtherUserRejectedArray"
      />
    </div>
  </div>
</template>

<script>
import appUserCard from '../components/app-user-card'

export default {
  name: 'Home',
  data: function() {
    return {
      notSelectedUsers: [],
      selectedUsers: [],
      rejectedUsers: []
    }
  },
  components: {
    'app-user-card': appUserCard
  },
  methods: {
    changeOtherUser: function (id) {
      this.deleteOtherUserFromNotSelectedUsers(id); // Удаляем локально из массиа предлагаемых
    },
    addOtherUserSelectedArray: function (id) {
      this.$store.dispatch('updateSelectedOtherUser', id) // Добавляем в массив лайкнутых в БД
      this.selectedUsers.push(id) // Добавялем в массив лайкнтых локально
    },
    addOtherUserRejectedArray: function (id) {
      this.$store.dispatch('updateRejectedOtherUser', id) // Добавляем в массив откланненых в БД
    },
    deleteOtherUserFromNotSelectedUsers: function (changeUserId) {
      // Удаляем пользователя из массива предлагаемых локально
      this.notSelectedUsers.forEach((user, index) => {
        if (user.id === changeUserId) {
          this.notSelectedUsers.splice(index, 1)
        }
      })
    },


    getNotSelectedUsers: async function () {
      const notSelectedUser = await this.$store.dispatch('getNotSelectedUsers');
      this.notSelectedUsers = notSelectedUser;
    },
    getSelectedUsers: async function() {
      const selectedUsers = await this.$store.dispatch('getSelectedIdArray') || [];

      if (!Array.isArray(selectedUsers)) {
        this.selectedUsers = []
      } else {
        this.selectedUsers = selectedUsers;
      }
    },
    getRejectedUsers: async function () {
      const selectedUsers = await this.$store.dispatch('getRejectedIdArray');

      if (!Array.isArray(selectedUsers)) {
        this.rejectedUsers = []
      } else {
        this.rejectedUsers = selectedUsers;
      }
    },
  },
  mounted() {
    this.getNotSelectedUsers(),
    this.getSelectedUsers(),
    this.getRejectedUsers()
  },
  watch: {
    notSelectedUsers: function () {
      console.log('notSelectedUsers', this.notSelectedUsers)
    },
    selectedUsers: function () {
      console.log('selectedUsers', this.selectedUsers)
    }
  }
}
</script>

<style>
.home {
  height: 100%;
}
.cart__list {
  position: relative;
  height: 100%;
}
.cart-item {
  position: absolute;
  background: #fff;
  width: 100%;
  border: 1px solid #444;
  border-radius: 3px;
  height: 100%;
  transition: .1s;
}
.cart-item.remove {
  animation: remove 1s;
}
.cart-item.add {
  animation: add 1s;
}

@keyframes remove {
  0% {
    right: 0;
    bottom: 0;
    transform: none;
    opacity: 1;
  }
  100% {
    right: 450px;
    bottom: 70px;
    transform: rotate(-10deg);
    opacity: 0;
  }
}

@keyframes add {
  0% {
    left: 0;
    bottom: 0;
    transform: none;
    opacity: 1;
  }
  100% {
    left: 450px;
    bottom: 70px;
    transform: rotate(10deg);
    opacity: 0;
  }
}

</style>
