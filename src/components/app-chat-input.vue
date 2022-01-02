<template>
  <form @submit.prevent="sendMessage" class="chat__input chat-input">
    <button type="button" class="chat-input__upload">
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.75 1.5C1.61193 1.5 1.5 1.61193 1.5 1.75V12.25C1.5 12.3881 1.61193 12.5 1.75 12.5H2.69087C2.70013 12.4897 2.70973 12.4795 2.71967 12.4696L8.79704 6.3922C9.45643 5.73281 10.5171 5.70631 11.2086 6.33195L14.5 9.3099V1.75C14.5 1.61193 14.3881 1.5 14.25 1.5H1.75ZM14.25 12.5H4.81056L9.85769 7.45286C9.95189 7.35867 10.1034 7.35488 10.2022 7.44426L14.5 11.3327V12.25C14.5 12.3881 14.3881 12.5 14.25 12.5ZM16 12.25V11.003V10.9972V1.75C16 0.7835 15.2165 0 14.25 0H1.75C0.783501 0 0 0.7835 0 1.75V12.25C0 13.2165 0.783502 14 1.75 14H14.25C15.2165 14 16 13.2165 16 12.25ZM5.5 5C5.5 5.27614 5.27614 5.5 5 5.5C4.72386 5.5 4.5 5.27614 4.5 5C4.5 4.72386 4.72386 4.5 5 4.5C5.27614 4.5 5.5 4.72386 5.5 5ZM7 5C7 6.10457 6.10457 7 5 7C3.89543 7 3 6.10457 3 5C3 3.89543 3.89543 3 5 3C6.10457 3 7 3.89543 7 5Z" fill="#2C2C2E"/>
      </svg>
    </button>

    <input class="chat-input__field" v-model="message" type="text" name="" placeholder="Введите ваше сообщение" id="">

    <button type="submit" class="chat-input__send">
      <svg width="16" height="14" viewBox="0 0 16 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M1.59168 1.71245L2.38083 6.25004H7.25001C7.66422 6.25004 8.00001 6.58582 8.00001 7.00004C8.00001 7.41425 7.66422 7.75004 7.25001 7.75004H2.38083L1.59168 12.2876L13.9294 7.00004L1.59168 1.71245ZM0.988747 7.00004L0.0636748 1.68087C-0.0111098 1.25086 0.128032 0.811352 0.436661 0.502722C0.824446 0.114942 1.40926 0.00231168 1.91333 0.218342L15.3157 5.9622C15.7308 6.14013 16 6.54835 16 7.00004C16 7.45172 15.7308 7.85995 15.3157 8.03788L1.91333 13.7817C1.40926 13.9978 0.824446 13.8851 0.436661 13.4974C0.128032 13.1887 -0.01111 12.7492 0.0636748 12.3192L0.988747 7.00004Z" fill="#2C2C2E"/>
      </svg>
    </button>
  </form>
</template>


<script>
export default {
  name: 'chatInput',
  data: function () {
    return {
      message: ''
    }
  },
  props: {
    chatName: String,
    author: String
  },
  methods: {
    sendMessage: async function () {
      const time = new Date();

      await this.$store.dispatch('SEND_NEW_MESSAGE', {
        message: {
          message: this.message,
          author: this.author,
          time: `${time}`,
          checked: false
        },
        chat: this.chatName
      });
      await this.$store.dispatch('UPDATE_LAST_MESSAGE', {
        message: {
          message: this.message,
          author: this.author,
          time: `${time}`,
          checked: false
        },
        chat: this.chatName
      });

      this.message = '';
    },
  }
}
</script>
