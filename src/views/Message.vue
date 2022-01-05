<template>
  <div class="message content-page">
    <div class="message__wrap">
      <div class="message__title">Ваши чаты</div>
      <div class="message__list">
        <app-snippet-chat v-for="chatName in userChatsName" :chatName="chatName" />
      </div>
    </div>
  </div>
</template>

<script>
import snippetChat from '../components/app-snippet-chat'

export default {
  name: 'Message',
  computed: {
    userChatsName() {
      return this.$store.state.user.currentUser.chats ? this.$store.state.user.currentUser.chats : [];
    }
  },
  components: {
    'app-snippet-chat': snippetChat
  },
}
</script>


<style>


.message__item-content {
  margin-left: 15px;
  flex-grow: 1;
  overflow: hidden;
}
.message__item-header {
  display: flex;
}
.message__item-name {
  margin-right: 10px;
}
.message__item-last-message {
  text-overflow: clip;
  overflow: hidden;
  white-space: nowrap;
}

.message__slider {
  display: flex;
  justify-content: space-between;
  overflow: hidden;
}
.message__slider-item {
  margin-left: 10px;
  margin-right: 10px;
}
.message__list {
  display: flex;
  flex-direction: column-reverse;
}


.message__wrap:not(:last-child) {
  margin-bottom: 30px;
}
.message__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
