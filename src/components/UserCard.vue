<template>
  <div
      class="cart-item"
      :data-id="item.id"
      :style="{ zIndex: index }"
  >

    {{ item }}
    <div class="cart__footer">
      <div class="cart__content">
        <div class="cart__name">{{ item.name }}</div>
        <div class="cart__age">{{ item.age }}</div>
        <div class="cart__description">{{ item.about }}</div>
      </div>
      <div class="cart__btns">
        <div @click="removeCart(item.id)" class="cart__btn">Удалить</div>
        <div @click="addCart(item.id)" class="cart__btn">Добавить</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'userCart',
  data: function() {
    return {
      user: {
        rejectedUsers: [],
        selectedUsers: []
      }
    }
  },
  props: {
    item: Object,
    index: Number
  },
  methods: {
    addCart: function (id) {
      if (id) {
        this.user.selectedUsers.push(id);
        this.$store.dispatch('clientUpdate', {
          selectedUsers: this.user.selectedUsers
        })
        // this.deleteCardFromBaseList(id);
      }
    }, // Лайкаем
    removeCart: function (id) {
      if (id) {
        this.user.rejectedUsers.push(id);
        this.$store.dispatch('clientUpdate', {
          rejectedUsers: this.user.rejectedUsers
        })
        // this.deleteCardFromBaseList(id);
      }
    }, // Дизлайкаем

    deleteCardFromBaseList: function (id) {
      this.notSelectedUsers.forEach((user, i) => {
        if (user.id === id) {
          this.notSelectedUsers.splice(i, 1);
        }
      })
    },
  },
  components: {},
  computed: {},
  mounted: function () {}
}
</script>
