<template>
  <div class="content-page create">
    <div class="stap1">
      <span>Вход</span>

      <form @submit.prevent="loginUser">
        <input class="input-text" v-model="email" type="email" placeholder="email">
        <input class="input-text" v-model="password" type="password" placeholder="password">
        <button type="submit">Войти</button>
      </form>

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
      email: '',
      password: '',
    }
  },
  methods: {
    loginUser: async function () {
      await this.$store.dispatch('clientLogin', {
        email: this.email,
        password: this.password
      }).then(data => {
        console.log('data', data)
      })
    }
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
</style>
