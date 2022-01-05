<template>
  <div ref="message" class="chat__message-wrap" :class="`chat__message-wrap-${authorMode}`">
    <div class="chat__message chat-message" :class="authorMode">
      <!--getClassMessage(message)-->

      <div class="chat-message__border">
        <!--you-->
        <svg v-if="authorMode === 'companionUser'" xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
          <path d="M9 0C9 0 3.26206 0 1.8 0C0.33795 0 3.14713e-05 1.5 1.35003 3C2.70003 4.5 8.50063 9.5 9 11C9.49936 12.5 9 0 9 0Z" fill="#F2F2F7"/>
        </svg>
        <!--my-->
        <svg v-if="authorMode === 'currentUser'" xmlns="http://www.w3.org/2000/svg" width="10" height="12" viewBox="0 0 10 12" fill="none">
          <path d="M1 0C1 0 6.73794 0 8.2 0C9.66205 0 9.99997 1.5 8.64997 3C7.29997 4.5 1.49937 9.5 1 11C0.500641 12.5 1 0 1 0Z" fill="#007AFF"/>
        </svg>
      </div>

      <div class="chat__item-content">
        <!--<div class="chat__item-name">-->
        <!--  {{message.author}}-->
        <!--</div>-->
        <div class="chat__item-message">
          {{message.message}}
        </div>

      </div>

    </div>
    <div class="chat-message__time">
      {{ new Date(message.time).getHours() }}:{{ new Date(message.time).getMinutes() }}
    </div>
  </div>
</template>


<script>
export default {
  name: 'chatMassage',
  props: {
    message: Object,
    authorMode: String,
    isChecked: false,
  },
  methods: {
    // Меняем статус сообщения на ПРОСМОТРЕННО
    checkedMessage: function () {
      const idChat = this.$route.params.id
      const idMessage = this.message.id

      this.$store.dispatch('UPDATE_CHECKED_MESSAGE', {
        idChat,
        idMessage
      })
    },

    handleVisibleMessage: function (target = this.$refs.message) {
      // Все позиции элемента
      const targetPosition = {
        top: window.pageYOffset + target.getBoundingClientRect().top,
        left: window.pageXOffset + target.getBoundingClientRect().left,
        right: window.pageXOffset + target.getBoundingClientRect().right,
        bottom: window.pageYOffset + target.getBoundingClientRect().bottom
      };
      // Получаем позиции окна
      const windowPosition = {
        top: window.pageYOffset,
        left: window.pageXOffset,
        right: window.pageXOffset + document.documentElement.clientWidth,
        bottom: window.pageYOffset + document.documentElement.clientHeight
      };

      if (targetPosition.bottom > windowPosition.top && // Если позиция нижней части элемента больше позиции верхней чайти окна, то элемент виден сверху
        targetPosition.top < windowPosition.bottom && // Если позиция верхней части элемента меньше позиции нижней чайти окна, то элемент виден снизу
        targetPosition.right > windowPosition.left && // Если позиция правой стороны элемента больше позиции левой части окна, то элемент виден слева
        targetPosition.left < windowPosition.right) { // Если позиция левой стороны элемента меньше позиции правой чайти окна, то элемент виден справа

        // Если элемент полностью видно, то запускаем следующий код
        this.checkedMessage()
      }
    }
  },
  mounted() {
    if (this.message.checked === false && this.authorMode === 'companionUser') {
      this.handleVisibleMessage()
      document.querySelector('.chat__messages').addEventListener('scroll', () => {
        this.handleVisibleMessage()
      })
    }
  }
}
</script>
