<template>
  <div class="content-page create">
    <div class="stap1">
      <span>Введите номер телефона</span>
      <input class="input-text" v-model="email" type="email" placeholder="email">
      <input class="input-text" v-model="password" type="password" placeholder="password">
      <div @click="createUser" class="send">Отправить</div>

      <div v-if="isRegistered" class="err">Вы уже зарегистрированы</div>
      <div v-if="success" class="err">Регистрация прошла успешно</div>
    </div>
  </div>
</template>

<script>
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const auth = getAuth();

export default {
  name: 'Create',
  data: function () {
    return {
      email: '',
      password: '',
      isRegistered: false,
      success: false
    }
  },
  methods: {
    createUser: async function () {
      await this.$store.dispatch('clientCreate', {
        email: this.email,
        password: this.password
      }).then(() => {
        this.success = true;
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
