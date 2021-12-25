<template>
  <div class="content-page create">
    <div class="stap1">
      <div class="create__title">Регистрация</div>

      <form class="create__form" @submit.prevent="createUser" action="">
        <div class="create__data-item">
          <input class="input-text" v-model="email" type="email" placeholder="email">
        </div>
        <div class="create__data-item">
          <input class="input-text" v-model="password" type="password" placeholder="password">
        </div>
        <button class="create__btn" type="submit">Отправить</button>
      </form>

      <div class="create__result-message">
        <div v-if="noSuccess" class="err">Уто-то пошло не так... Попробуйте еще раз</div>
        <div v-if="success" class="err">Регистрация прошла успешно</div>
      </div>

      <div class="create__context">
        Вы уже зарегистрированы? Тогда <router-link to="/login">войдите</router-link> в аккаунт
      </div>
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
      noSuccess: false,
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

        setTimeout(() => {
          this.success = false;
        }, 3000)
      }).catch(() => {
        this.noSuccess = true;

        setTimeout(() => {
          this.noSuccess = false;
        }, 3000)
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
.create__title {
  text-align: center;
  font-size: 27px;
  font-weight: 600;
}
.stap1 {
  width: 100%;
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

.create__form {
  margin-top: 15px;
}
.create__data-item {
  margin-bottom: 6px;
}
.create__btn {
  width: 100%;
  height: 40px;
  border: 1px solid #444444;
  border-radius: 3px;
  margin: 0 auto;
  display: block;
  background: transparent;
}
.create__context {
  margin-top: 20px;
  text-align: center;
}
.create__context a {
  color: #444444;
}


.create__result-message {
  text-align: center;
  margin-top: 10px;
}
</style>
