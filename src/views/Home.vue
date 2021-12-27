<template>
  <div class="content-page home">
    <div ref="users" class="cart__list">
      <userCart
          v-for="(item, i) in notSelectedUsers"
          :item="item"
          :index="i"
      />
    </div>
  </div>
</template>

<script>

import {convertObjectToArray} from "../utils";
import userCart from '../components/UserCard'

export default {
  name: 'Home',
  data: function () {
    return {
      notSelectedUsers: [], // массив не отобранных пользователец
      selectedUsers: [],
      rejectedUsers: []
    }
  },
  methods: {
    getAllUsersFromDB: async function() {
      return await this.$store.dispatch('getAllUsers')
    },
    excludeInappropriateUsers: async function(allUsers) {
      return allUsers.filter(user => {
        if (this.selectedUsers.indexOf(user.id) > 0) {
          return false;
        }

        if (this.rejectedUsers.indexOf(user.id) > 0) {
          return false;
        }

        return user;
      });
    },
    getNotSelectedUsers: async function() {
      const usersAll = convertObjectToArray( await this.getAllUsersFromDB()) ;
      return await this.excludeInappropriateUsers(usersAll);
    }
  },
  components: {
    userCart
  },
  mounted: async function() {
    this.notSelectedUsers = await this.getNotSelectedUsers();
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

.cart__footer {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
}
.cart__content {
  padding: 10px;
}
.cart__btns {
  display: flex;
  justify-content: space-around;
  height: 40px;
  align-items: center;
}
</style>
