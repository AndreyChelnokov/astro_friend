<template>
  <div class="content-page home">
    <div ref="users" class="cart__list">
      <userCart
          v-for="(user, i) in userForRender"
          :selectableUser="user"
          :atherUserSelectedArr="user.selectedUsers"
          :index="i"
      />
    </div>
  </div>
</template>

<script>
import { convertObjectToArray } from "../utils";
import userCart from '../components/UserCard'
import { mapGetters } from "vuex"

export default {
  name: 'Home',
  data: function () {
    return {
      allUsers: [], // Список других пользователей. Получаем 1 раз при загрузке
    }
  },
  methods: {
    getAllUserFromDB: async function () {
      const allUserFromDB = await this.$store.dispatch('getAllUsers')
      return convertObjectToArray(allUserFromDB)
    },
    filterUsers: function() {
      return this.allUsers.filter(user => {
        if (Array.isArray(this.selectedUsers)) {
          if (this.selectedUsers.indexOf(user.id) >= 0) {
            return false;
          }
        }

        if (Array.isArray(this.rejectedUsers)) {
          if (this.rejectedUsers.indexOf(user.id) >= 0) {
            return false;
          }
        }

        return user;
      });
    },
  },
  components: {
    userCart
  },
  computed: {
    userForRender: function () {
      const resultListUsers = this.filterUsers();
      return resultListUsers;
    },
    selectedUsers: function() {
      return this.$store.state.user.selectedUsers
    },
    rejectedUsers: function () {
      return this.$store.state.user.rejectedUsers;
    },
  },
  mounted: async function() {
    this.allUsers = await this.getAllUserFromDB();

    this.$store.dispatch('testGetChatByKey')
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
