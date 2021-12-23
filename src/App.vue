<template>
  <div id="app">
    <div id="content">
      <router-view/>
    </div>
    <div id="nav">
      <router-link to="/user">User</router-link>
      <router-link to="/message">Message</router-link>
      <router-link to="/">Home</router-link>
      <router-link to="/search">Search</router-link>
    </div>
  </div>
</template>

<style lang="scss">
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
#content {
  height: calc(100vh - 40px);
  overflow: hidden;
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
</style>
