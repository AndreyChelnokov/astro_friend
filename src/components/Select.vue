<template>
  <div class="select">
    <div class="select__btn">
      <div class="select__btn-name">{{ resultName }}</div>
      <div class="select__btn-icon">></div>
    </div>
    <select @change="toggleValue" name="input-select">
      <option value="0"></option>
      <option v-for="(value, i) in list" :value="value.value" :key="i + value">
        {{ value.name }}
      </option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Select',
  data: function () {
    return {
      resultName: this.name
    }
  },
  props: {
    name: String,
    errorText: String,
    list: Array
  },
  methods: {
    toggleValue: function (e) {
      const index = e.target.selectedIndex;
      const text = e.target[index].innerText;

      if (text === '') {
        this.resultName = this.errorText;
        return false;
      }

      if (this.type === 'pol') {
        this.$store.commit('SET_POL', text)
      }

      this.resultName = text;
      return text;
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
