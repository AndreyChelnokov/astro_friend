<template>
  <div v-if="currentUserBaseData" class="user content-page">

    <div class="user__header">
      <div class="user__img">
        <img class="user__img-icon" :src="currentUserAvatar" alt="">
      </div>
      <div class="user__base-data">
        <div class="user__name">
          {{currentUserBaseData.name.lastName }}
          {{currentUserBaseData.name.name }}
        </div>
        <div class="zodiac">Знак зодиака: {{currentUserBaseData.zodiac }}</div>
        <div class="user__age">Возраст {{currentUserBaseData.age }}</div>
      </div>
    </div>

    <button @click="signOutUser" class="out">
      Выйти
    </button>

    <EditPhoto />


    <div class="user__data">
      <form @submit.prevent="updateUserData" action="" class="user__data-wrap user__about">
        <div class="user__data-title">Общая информация</div>

        <!-- Имя -->
        <div class="user__data-item">
          <input v-model="currentUserBaseData.name.name" class="input-text" type="text" placeholder="Имя">
        </div>
        <!-- Фамилия -->
        <div class="user__data-item">
          <input v-model="currentUserBaseData.name.lastName"  class="input-text" type="text" placeholder="Фамилия">
        </div>
        <!-- Отчество -->
        <div class="user__data-item">
          <input v-model="currentUserBaseData.name.patronymic" class="input-text" type="text" placeholder="Отчество">
        </div>
        <!-- Дата -->
        <div class="user__data-item">
          <input @input="changeDate" v-model="currentUserBaseData.dateAndTimeOfBirth.day" min="1" max="31" class="input-text" type="number" placeholder="дд">
          <input @input="changeDate" v-model="currentUserBaseData.dateAndTimeOfBirth.month" class="input-text" type="number" placeholder="мм">
          <input @input="changeDate" v-model="currentUserBaseData.dateAndTimeOfBirth.year" class="input-text" type="number" placeholder="гг">
        </div>
        <!-- Время -->
        <div class="user__data-item">
          <input v-model="currentUserBaseData.dateAndTimeOfBirth.hours" class="input-text" type="number" placeholder="чч">
          <input v-model="currentUserBaseData.dateAndTimeOfBirth.minutes" class="input-text" type="number" placeholder="мм">
        </div>
        <!-- Страна -->
        <div class="user__data-item">
          <input v-model="currentUserBaseData.country" class="input-text" type="text" placeholder="Город рождения">
        </div>
        <!-- Описание -->
        <div class="user__data-item">
          <textarea v-model="currentUserBaseData.description" class="input-textarea" name="" placeholder="О себе..."></textarea>
        </div>
        <!-- Пол -->
        <div class="user__data-item">
          <div class="select">
            <div class="select__btn">
              <div class="select__btn-name">{{ currentUserBaseData.pol }}</div>
              <div class="select__btn-icon">></div>
            </div>
            <select @change="" v-model="currentUserBaseData.pol" name="input-select">
              <option value="0"></option>
              <option v-for="(item, i) in pol.variantsPol" :value="item.value" :key="i">
                {{ item.value }}
              </option>
            </select>
          </div>
        </div>


        <button type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script>
import { getZodiac, getAge } from '../utils'
import EditPhoto from '../components/photo/EditPhoto'

export default {
  name: 'EditProfile',
  data: function () {
    return {
      pol: {
        name: 'Пол',
        errorText: 'Что-то пошло не так',
        variantsPol: [
          {
            value: 'Мужской'
          },
          {
            value: 'Женский'
          }
        ]
      }
    }
  },
  components: {
    EditPhoto
  },
  methods: {
    updateUserData: async function() {
      await this.$store.dispatch('updateUserData', { currentUserBaseData: this.currentUserBaseData })
    },
    signOutUser: async function () {
      const result = await this.$store.dispatch('signOutUser');
      await this.reLocation('/login')
      // Выход из аккаунта
    },

    // При любом изменении даты рождения
    changeDate: function () {
      const day = Number(this.currentUserBaseData.dateAndTimeOfBirth.day);
      const month = Number(this.currentUserBaseData.dateAndTimeOfBirth.month)
      const year = Number(this.currentUserBaseData.dateAndTimeOfBirth.year);

      this.currentUserBaseData.zodiac = getZodiac(day, month);
      this.currentUserBaseData.age = getAge(day, month, year);
    }

  },
  computed: {
    currentUserBaseData() {
      return this.$store.state.user.currentUser ? this.$store.state.user.currentUser.baseData : {}
      // Вся информация о текущем пользователе
    },

    currentUserPhotoUrlList() {
      return this.currentUserBaseData ? this.currentUserBaseData.photoUrlList : []
      // Фото пользователя
    },

    currentUserAvatar: function () {
      return this.currentUserPhotoUrlList ? this.currentUserPhotoUrlList.filter(photo => photo.avatar)[0].url : 'baseUrl';
      // Аватар пользователя
    }
  },
  mounted: async function () {
    if (! await this.$store.dispatch('getUid')) {
      await this.$router.push('/login')
    }
  }
}
</script>

<style>
  .user__header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
  }
  .user__img {
    width: 70px;
    height: 70px;
    border-radius: 50%;
    overflow: hidden;
    border: 1px solid #444;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .user__img-icon {
    width: 100%;
    height: 100%;
    object-fit: cover;
    display: block;
  }
  .user__base-data {
    margin-left: 15px;
  }
  .user__data-title {
    font-size: 20px;
    font-weight: 600;
  }
  .user__data-description {
    font-size: 14px;
    color: #b1a9a9;
    margin-bottom: 10px;
  }
  .input-text {
    border-radius: 3px;
    border: 1px solid #444;
    width: 100%;
    height: 40px;
    color: #444444;
    padding: 0 10px;
  }
  .user__data-item:not(:last-child) {
    margin-bottom: 6px;
  }
  .input-textarea {
    width: 100%;
    border: 1px solid #444444;
    border-radius: 3px;
    height: 100px;
    padding: 10px;
  }
  .input-text, .input-textarea {
    color: #5a5a5a;
    font-size: 14px;
  }


  .user__photo-wrap {
    display: flex;
    flex-wrap: wrap;
  }
  .user__photo-item {
    width: fit-content;
    border: 1px solid #000;
    margin-right: 5px;
  }
  .user__photo-btns {
    display: flex;
    justify-content: space-around;
  }

  /* select */
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
  /* end select */
</style>
