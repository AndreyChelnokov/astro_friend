<template>
  <div class="chat-layout">
    <div class="chat-content">
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ChatLayout'
}
</script>

<style lang="scss">
.main-content {
  height: calc(100% - 50px);
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

.content-page {
  padding: 10px;
  text-align: left;
}
.chat-content {
  height: 100vh;
}

</style>
