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

export default {
  components: {
    authLayout,
    baseLayout
  },
  computed: {
    layout: function () {
      return `${this.$route.meta.layout || 'auth'}-layout`
    }
  },
  mounted: async function() {
    await this.$store.dispatch('getUserData'); // Получаем данные из БД в стор
  }
}
</script>


<style>
  body {
    overflow: hidden;
  }
</style>
