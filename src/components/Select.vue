<template>
  <div class="select">
    <div class="select__btn">
      <div class="select__btn-name">{{ selected }}</div>
      <div class="select__btn-icon">></div>
    </div>
    <select @change="updateUserData" v-model="selected" name="input-select">
      <option value="0"></option>
      <option v-for="(item, i) in list" :value="item.value" :key="i">
        {{ item.value }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data: function () {
    return {}
  },
  props: {
    name: String,
    errorText: String,
    list: Array
  },
  methods: {
    updateUserData: async function () {
      await this.$store.dispatch('clientUpdate', this.$store.state.user)
    }
  },
  computed: {
    selected: {
      get () {
        return this.$store.state.user.baseData.pol
      },
      set (value) {
        this.$store.commit('UPDATE_USER_POL', value)
      }
    }
  }
}
</script>

<style>
.select {
  width: 100%;
  height: 40px;
  border-radius: 3px;
  border: 1px solid #444444;
  padding: 0 10px;
  position: relative;
}
.select select {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
  opacity: 0;
}

.select__btn {
  display: flex;
  align-items: center;
  height: 100%;
  width: 100%;
  justify-content: space-between;
}
.select__btn-name {
  color: #5a5a5a;
  font-size: 14px;
}
</style>
