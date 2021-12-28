<template>
  <div class="message content-page">
    <div class="message__wrap">
      <div class="message__title">Ваши чаты</div>
      <div class="message__list">
        <div v-for="user in listChats" class="message__item">
          <div class="message__item-img">ggg
<!--            <img class="message__item-img-icon" :src="user.img" alt="">-->
          </div>
          <div class="message__item-content">
<!--            <div class="message__item-header">-->
<!--              <div class="message__item-name">{{ user.name }}</div>-->
<!--              <div class="message__item-age">{{ user.age }}</div>-->
            </div>
            <div class="message__item-last-message">Круто, Давай встретимся на днях...</div>
          </div>

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { convertObjectToArray } from '../utils';

export default {
  name: 'Message',
  data: function () {
    return {}
  },
  methods: {},
  computed: {
    listChats: function () {
      return this.$store.state.user.chats;
    }
  },
  mounted: async function() {}
}
</script>


<style>

.message__item-img {
  width: 70px;
  min-width: 70px;
  height: 70px;
  border-radius: 50%;
  overflow: hidden;
  border: 1px solid #444;
  display: flex;
  align-items: center;
  justify-content: center;
}
.message__item-img-icon{
  width: 80%;
  height: 80%;
  object-fit: contain;
  display: block;
}
.message__item {
  display: flex;
  align-items: center;
  margin-bottom: 7px;
}
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



.message__wrap:not(:last-child) {
  margin-bottom: 30px;
}
.message__title {
  font-size: 20px;
  font-weight: 600;
  margin-bottom: 10px;
}
</style>
