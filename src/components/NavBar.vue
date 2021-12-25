<template>
  <div id="nav">
    <router-link to="/user">User</router-link>
    <router-link to="/message">Message</router-link>
    <router-link to="/">Home</router-link>
    <router-link to="/search">Search</router-link>
  </div>
</template>

<script>
export default {
  name: 'NavBar'
}
</script>
