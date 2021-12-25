<template>
  <div class="main-layout">
    <div class="main-content">
      <router-view></router-view>
    </div>
    <NavBar/>
  </div>
</template>

<script>
import NavBar from '../components/NavBar';
export default {
  components: {
    NavBar
  }
}
</script>

<style lang="scss">
  .main-content {
    height: calc(100% - 40px);
    overflow: scroll;
  }

  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  * {
    box-sizing: border-box;
  }
  body {
    margin: 0;
  }
  #app {
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  #nav {
    display: flex;
    justify-content: space-between;
    height: 40px;
  }
  .content-page {
    padding: 10px;
    text-align: left;
  }

  .main-layout {
    height: 100%;
    overflow: scroll;
  }
</style>
