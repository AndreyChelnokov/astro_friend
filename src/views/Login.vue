<template>
  <div class="content-page create">
    <div class="stap1">
      <div class="login__title">Вход</div>

      <form class="login__form" @submit.prevent="loginUser">
        <div class="login__data-item">
          <input class="input-text" v-model="email" type="email" placeholder="email">
        </div>
        <div class="login__data-item">
          <input class="input-text" v-model="password" type="password" placeholder="password">
        </div>
        <button class="login__btn" type="submit">Войти</button>
      </form>

      <div class="login__result-message">
        <div v-if="isLoginError" class="err">Уто-то пошло не так... Попробуйте еще раз</div>
      </div>

      <div class="login__context">
        Еще не зарегистрированы? Тогда <router-link to="/create">зарегистрируйтесь</router-link>
      </div>

    </div>
  </div>
</template>

<script>
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export default {
  name: 'Login',
  data: function () {
    return {
      isLoginError: false,
      email: '',
      password: '',
    }
  },
  methods: {
    loginUser: async function () {
      await this.$store.dispatch('clientLogin', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.$router.push('/user')
      }).catch(() => {
        this.isLoginError = true;

        setTimeout(() => {
          this.isLoginError = false;
        }, 3000)
      })
    },

    isUser: async function() {
      let uid = await this.$store.dispatch('getUid');

      if (uid) {
        return true;
      }

      return false;
    },
    updateUserRouterLocation: async function(newLocation) {
      if (await this.isUser()) {
        await this.$router.push(newLocation)
      }
    }
  },
  mounted: function () {
    this.updateUserRouterLocation('/user')
  }
}
</script>


<style>
.create {
  display: flex;
  align-items: center;
  height: 100%;
}
.input-text {
  border-radius: 3px;
  border: 1px solid #444;
  width: 100%;
  height: 40px;
  color: #444444;
  padding: 0 10px;
}
.input-text {
  color: #5a5a5a;
  font-size: 14px;
}

.login__title {
  text-align: center;
  font-size: 27px;
  font-weight: 600;
}


.login__form {
  margin-top: 15px;
}
.login__data-item {
  margin-bottom: 6px;
}
.login__btn {
  width: 100%;
  height: 40px;
  border: 1px solid #444444;
  border-radius: 3px;
  margin: 0 auto;
  display: block;
  background: transparent;
}
.login__context {
  margin-top: 20px;
  text-align: center;
}
.login__context a {
  color: #444444;
}


.create__result-message {
  text-align: center;
  margin-top: 10px;
}
</style>
