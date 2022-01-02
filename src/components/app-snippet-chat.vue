<template>
  <router-link
      :to="`/chat/${chatData ? chatData.name : ''}`"
      :style="{order: chatData.lastMassage ? new Date(chatData.lastMassage.time).getTime() : ''}"
      class="message__item-link"
  >

    <div class="message__item" :data-id="chatData ? chatData.name : ''">
      <div class="message__item-img">
        <img class="message__item-img-icon" :src="avatar" alt="">
      </div>
      <div class="message__item-content">
        <div class="message__item-header">
          <div class="message__item-name">{{ companion.baseData ? companion.baseData.name.name : '' }}</div>
        </div>
        <div class="message__item-last-message">
          <div class="message__item-last-text">{{ chatData.lastMassage ? chatData.lastMassage.message : '' }}</div>
          <div class="message__item-last-time">{{ chatData.lastMassage ? new Date(chatData.lastMassage.time).getHours() + ':' + new Date(chatData.lastMassage.time).getMinutes() : '' }}</div>
        </div>
      </div>
      counter {{ noCheckedMessageCounter }}
    </div>
  </router-link>
</template>

<script>
import { getDatabase, ref, onValue } from "firebase/database";
import { fireBaseApp } from '../firebase';
const database = getDatabase(fireBaseApp);

export default {
  name: 'snippetChat',
  data: function () {
    return {
      chatData: {},
      companion: {},
      companionId: ''
    }
  },
  props: {
    chatName: String
  },
  methods: {
    getCompanionId: async function() {
      const uid = await this.$store.dispatch('getUid');
      const companionId = this.chatName.replace(uid, '')
      this.companionId = companionId
      return companionId;
    },
    getCompanion: async function() {
      const id = await this.getCompanionId();
      this.companion = await this.$store.dispatch('gitUserDataById', { id })
    },

    getChatData: async function () {
      const refChats = ref(database, `chats/${this.chatName}`);
      await onValue(refChats, (snapshot) => {
        this.chatData = snapshot.val();
      });
    }
  },
  computed: {
    noCheckedMessageCounter: function () {
      let counter = 0;
      if (this.chatData.messages) {
        for (let key in this.chatData.messages) {
          console.log('f', this.chatData.messages[key].checked)
          if (this.chatData.messages[key].checked === false) {
            counter++
          }
        }
      }
      return counter;
    },
    avatar: function () {
      let res = 'a'

      if (this.companion.baseData) {
        if (this.companion.baseData.photoUrlList) {
          this.companion.baseData.photoUrlList.forEach(photo => {
            if (photo.avatar) {
              res = photo.url
            }
          })
        }
      }

      return res;
    },
  },
  created: function() {
    this.getChatData()
    this.getCompanion();
  },
}
</script>


<style>
  .message__item {
    display: flex;
    align-items: center;
    margin-bottom: 16px;
  }
  .message__item-link {
    text-decoration: none;
  }
  .message__item-name {
    margin-right: 10px;
    font-size: 17px;
    font-weight: 600;
    color: #000;
  }

  .message__item-img {
    width: 60px;
    min-width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #444;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .message__item-img-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .message__item-last-message {
    font-size: 14px;
    color: #524e4e;
    margin-top: 10px;
    display: flex;
    align-items: center;
  }
  .message__item-last-text {
    max-width: 75%;
    margin-right: 10px;
  }
</style>
