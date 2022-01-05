<template>
  <div id="app">
    <component :is="layout">
      <router-view></router-view>
    </component>
  </div>
</template>

<script>
import authLayout from './layout/auth-layout';
import baseLayout from './layout/base-layout';
import chatLayout from './layout/chat-layout';
import './assets/css/app.css';

export default {
  components: {
    authLayout,
    baseLayout,
    chatLayout
  },
  computed: {
    layout: function () {
      return `${this.$route.meta.layout || 'auth'}-layout`
    }
  },
  mounted: function() {
    // await this.$store.dispatch('getUserData'); todo
    // this.$store.commit('CREATE_USER_EMPTY_FIELDS') todo

    this.$store.dispatch('getCurrentUser') // Синхронизируемся с пользователем
  }
}
</script>


<style>
  body {
    overflow: hidden;
  }
</style>
