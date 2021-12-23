<template>
  <div class="content-page home">
    <div ref="users" class="cart__list">
      <div
          v-for="(item, i) in listCart"
          :data-id="item.id"
          class="cart-item"
          :class="item.checked ? item.checkedClass : ''"
          :style="{ zIndex: i }"
      >
        <div class="cart__footer">
          <div class="cart__content">
            <div class="cart__name">{{ item.name }}</div>
            <div class="cart__age">{{ item.age }}</div>
            <div class="cart__description">{{ item.description }}</div>
          </div>
          <div class="cart__btns">
            <div @click="removeCart(item.id)" class="cart__btn">Удалить</div>
            <div @click="addCart(item.id)" class="cart__btn">Добавить</div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import $ from "jquery";

export default {
  name: 'Home',
  data: function () {
    return {
      swipeEvent: {
        startClientX: '',
        startClientY: '',
        endClientX: 0,
        endClientY: 0,
      },
      listCart: [
        {
          id: 12,
          name: 'Маша',
          age: 23,
          description: 'Текст описания который можно выводить',
          checked: false
        },
        {
          id: 32,
          name: 'Алина',
          age: 24,
          description: 'Текст описания который можно выводить',
          checked: false
        },
        {
          id: 17,
          name: 'Даша',
          age: 21,
          description: 'Текст описания который можно выводить',
          checked: false
        },
        {
          id: 4,
          name: 'Андрей',
          age: 24,
          description: 'Текст описания который можно выводить',
          checked: false
        }
      ],
      ignoreList: [],
      chosenList: []
    }
  },
  methods: {
    addCart: function (id) {
      this.listCart.forEach((item) => {
        if (item.id === id) {
          item.checked = true;
          item.checkedClass = 'add'
        }
      })

      setTimeout(() => {
        this.deleteCardFromBaseList(id);
        this.chosenList.push(id);

        return this.listCart.length;
      }, 1000)
    },
    removeCart: function (id) {
      this.listCart.forEach((item) => {
        if (item.id === id) {
          item.checked = true;
          item.checkedClass = 'remove'
        }
      })

      setTimeout(() => {
        this.deleteCardFromBaseList(id)
        this.ignoreList.push(id);

        return this.listCart.length;
      }, 1000)
    },

    deleteCardFromBaseList: function (id) {
      this.listCart.forEach((cart, i) => {
        if (cart.id === id) {
          this.listCart.splice(i, 1);
        }
      })
    },

    touchstart: function (e) {
      this.swipeEvent.startClientX = e.touches[0].clientX
      this.swipeEvent.startClientY = e.touches[0].clientY
    },
    touchmove: function (e) {
      this.swipeEvent.endClientX = e.touches[0].clientX;
      this.swipeEvent.endClientY = e.touches[0].clientY;
    },
    touchend: function (e) {
      const itemId = Number(e.target.getAttribute('data-id'));

      if (this.swipeEvent.endClientX > this.swipeEvent.startClientX) {
        this.addCart(itemId)
      } else {
        this.removeCart(itemId)
      }
    }
  },
  mounted() {
    this.$refs.users.addEventListener('touchstart', e => this.touchstart(e))
    this.$refs.users.addEventListener('touchmove', e => this.touchmove(e))
    this.$refs.users.addEventListener('touchend', e => this.touchend(e))

    document.ontouchend
  }
}
</script>

<style>
.home {
  height: 100%;
}
.cart__list {
  position: relative;
  height: 100%;
}
.cart-item {
  position: absolute;
  background: #fff;
  width: 100%;
  border: 1px solid #444;
  border-radius: 3px;
  height: 100%;
  transition: .1s;
}
.cart-item.remove {
  animation: remove 1s;
}
.cart-item.add {
  animation: add 1s;
}

@keyframes remove {
  0% {
    right: 0;
    bottom: 0;
    transform: none;
    opacity: 1;
  }
  100% {
    right: 450px;
    bottom: 70px;
    transform: rotate(-10deg);
    opacity: 0;
  }
}

@keyframes add {
  0% {
    left: 0;
    bottom: 0;
    transform: none;
    opacity: 1;
  }
  100% {
    left: 450px;
    bottom: 70px;
    transform: rotate(10deg);
    opacity: 0;
  }
}

.cart__footer {
  position: absolute;
  width: 100%;
  left: 0;
  right: 0;
  bottom: 0;
}
.cart__content {
  padding: 10px;
}
.cart__btns {
  display: flex;
  justify-content: space-around;
  height: 40px;
  align-items: center;
}
</style>
