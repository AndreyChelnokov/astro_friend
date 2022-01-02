<template>
  <div class="chat">
    <div class="chat__header chat-header">
      <router-link class="chat-header__prev-btn" to="../message">
        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path fill-rule="evenodd" clip-rule="evenodd" d="M7.78033 12.5303C7.48744 12.8232 7.01256 12.8232 6.71967 12.5303L2.46967 8.28033C2.17678 7.98744 2.17678 7.51256 2.46967 7.21967L6.71967 2.96967C7.01256 2.67678 7.48744 2.67678 7.78033 2.96967C8.07322 3.26256 8.07322 3.73744 7.78033 4.03033L4.81066 7H12.25C12.6642 7 13 7.33579 13 7.75C13 8.16421 12.6642 8.5 12.25 8.5H4.81066L7.78033 11.4697C8.07322 11.7626 8.07322 12.2374 7.78033 12.5303Z" fill="#2C2C2E"/>
        </svg>
      </router-link>
      <div class="chat-header__companion-data">
        <div class="chat-header__name">{{ companion.baseData ? companion.baseData.name.name : '' }}</div>
      </div>
      <div class="chat-header__companion-img">
        <img :src="imgCompanion" alt="">
      </div>
    </div>

    <div ref="chatMessages" class="chat__messages">
      <app-chat-message
          v-for="message in messageList"
          :message="message"
          :authorMode="getClassMessage(message.author)"
      />
    </div>

    <app-chat-input
      :chatName="chatName"
      :author="currentUser.baseData ? currentUser.baseData.name.name : ''"
    />
  </div>
</template>

<script>
import chatMassage from '../components/app-chat-message';
import ChatInput from '../components/app-chat-input'

export default {
  name: 'Chat',
  data: function () {
    return {
      chatName: this.$route.params.id,
      currentUser: {},
      companion: {},
    }
  },
  components: {
    'app-chat-message': chatMassage,
    'app-chat-input': ChatInput
  },
  methods: {
    getClassMessage: function (author) {
      let className = 'admin'
      if (this.companion.baseData && this.currentUser.baseData) {
        if (this.currentUser && author === this.currentUser.baseData.name.name) {
          className = 'currentUser'
        } else if (this.companion && author === this.companion.baseData.name.name) {
          className = 'companionUser'
        }
      }

      return className;
    },
    getCompanionId: async function () {
      const uid = await this.$store.dispatch('getUid')
      return this.$route.params.id.replace(`${uid}`, '');
    },
    getCompanion: async function () {
      const companion = await this.$store.dispatch('gitUserDataById', { id: await this.getCompanionId()})
      this.companion = companion;
      return companion
    },
    getCurrentUser: async function () {
      const uid = await this.$store.dispatch('getUid');
      const currentUser = await this.$store.dispatch('gitUserDataById', { id: uid })
      this.currentUser = currentUser;
      return currentUser
    },
    scrollToBottom: function () {
      if (this.$refs.chatMessages) {
        this.$refs.chatMessages.scrollTop = this.$refs.chatMessages.clientHeight
      }
    }
  },
  computed: {
    messageList: function () {
      return this.$store.state.currentChatMessage;
    },
    imgCompanion: function () {
      let imgUrl = ''

      if (this.companion.baseData && this.companion.baseData.photoUrlList && Array.isArray(this.companion.baseData.photoUrlList)) {
        this.companion.baseData.photoUrlList.forEach(photo => {
          if (photo.avatar) {
            imgUrl = photo.url;
          }
        })
      }

      return imgUrl;
    },
    chatData: async function() {
      return await this.$store.dispatch('GET_CHAT_BY_ID', { chatName: this.chatName })
    },
  },
  mounted: async function(){
    await this.getCompanion()
    await this.getCurrentUser()

    await this.$store.dispatch('GET_MESSAGES', {
      chat: this.$route.params.id
    })
  },
  watch: {
    messageList: function () {
      this.scrollToBottom()
    }
  }
}
</script>


<style>
</style>
