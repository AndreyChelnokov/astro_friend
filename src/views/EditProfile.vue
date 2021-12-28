<template>
  <div class="user content-page">
    <div class="user__header">
      <div class="user__img">
        <img class="user__img-icon" :src="userAvatar" alt="">
      </div>
      <div class="user__base-data">
        <div class="user__name">{{ this.userLastName }} {{ this.userName }}</div>
        <div v-if="this.userZodiac" class="zodiac">Знак зодиака: {{ this.userZodiac }}</div>
        <div v-if="this.userAge" class="user__age">Возраст {{ this.userAge }}</div>
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
          <input v-model="userName" class="input-text" type="text" placeholder="Имя">
        </div>
        <!-- Фамилия -->
        <div class="user__data-item">
          <input v-model="userLastName"  class="input-text" type="text" placeholder="Фамилия">
        </div>
        <!-- Отчество -->
        <div class="user__data-item">
          <input v-model="userPatronymic" class="input-text" type="text" placeholder="Отчество">
        </div>
        <!-- Дата -->
        <div class="user__data-item">
          <input @input="changeDate" v-model="userDateDay" min="1" max="31" class="input-text" type="number" placeholder="дд">
          <input @input="changeDate" v-model="userDateMonth" class="input-text" type="number" placeholder="мм">
          <input @input="changeDate" v-model="userDateYear" class="input-text" type="number" placeholder="гг">
        </div>
        <!-- Время -->
        <div class="user__data-item">
          <input v-model="userDateHours" class="input-text" type="number" placeholder="чч">
          <input v-model="userDateMinutes" class="input-text" type="number" placeholder="мм">
        </div>
        <!-- Страна -->
        <div class="user__data-item">
          <input v-model="userCountry" class="input-text" type="text" placeholder="Город рождения">
        </div>
        <!-- Описание -->
        <div class="user__data-item">
          <textarea v-model="userDescription" class="input-textarea" name="" placeholder="О себе..."></textarea>
        </div>

        <div class="user__data-item">
          <Select :type="'pol'" :name="pol.name" :list="pol.variantPol" :errorText="pol.errorText" />
        </div>

        <button type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script>
import Select from '../components/Select';
import { getZodiac, getAge } from '../utils'
import EditPhoto from '../components/photo/EditPhoto'

export default {
  name: 'EditProfile',
  data: function () {
    return {
      pol: {
        name: 'Пол',
        errorText: 'Какя-то ошибка ошибка',
        variantPol: [
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
    Select,
    EditPhoto
  },
  methods: {
    // Выход из аккаунта
    signOutUser: async function () {
      const result = await this.$store.dispatch('signOutUser');
      console.log(result)
      await this.reLocation('/login')
    },
    // Обновляем данные в БД
    updateUserData: async function () {
      await this.$store.dispatch('clientUpdate', this.$store.state.user)
    },
    // При любом изменении даты рождения
    changeDate: function () {
      const zodiac = getZodiac(Number(this.userDateDay), Number(this.userDateMonth));
      const age = getAge(Number(this.userDateDay), Number(this.userDateMonth), Number(this.userDateYear))

      if (zodiac) {
        this.$store.commit('UPDATE_USER_ZODIAC', zodiac)
      }

      if (age) {
        this.$store.commit('UPDATE_USER_AGE', age)
      }

      this.updateUserData()
    },

    // LOCATION
    isUser: async function() {
      let uid = await this.$store.dispatch('getUid');

      if (uid) {
        return true;
      }

      return false;
    },
    reLocation: async function(newLocation) {
      if (await this.isUser()) {
      } else {
        await this.$router.push(newLocation)
      }
    },
  },
  computed: {
    userName: {
      get () {
        return this.$store.state.user.baseData.name.name
      },
      set (value) {
        this.$store.commit('UPDATE_USER_NAME', value)
      }
    },
    userLastName: {
      get () {
        return this.$store.state.user.baseData.name.lastName
      },
      set (value) {
        this.$store.commit('UPDATE_USER_LASTNAME', value)
      }
    },
    userPatronymic: {
      get () {
        return this.$store.state.user.baseData.name.patronymic
      },
      set (value) {
        this.$store.commit('UPDATE_USER_PATRONYMIC', value)
      }
    },

    userDateDay: {
      get () {
        return this.$store.state.user.baseData.dateAndTimeOfBirth.day
      },
      set (value) {
        this.$store.commit('UPDATE_USER_DAY', value)
      }
    },
    userDateMonth: {
      get () {
        return this.$store.state.user.baseData.dateAndTimeOfBirth.month
      },
      set (value) {
        this.$store.commit('UPDATE_USER_MONTH', value)
      }
    },
    userDateYear: {
      get () {
        return this.$store.state.user.baseData.dateAndTimeOfBirth.year
      },
      set (value) {
        this.$store.commit('UPDATE_USER_YEAR', value)
      }
    },

    userDateHours: {
      get () {
        return this.$store.state.user.baseData.dateAndTimeOfBirth.hours
      },
      set (value) {
        this.$store.commit('UPDATE_USER_HOURS', value)
      }
    },
    userDateMinutes: {
      get () {
        return this.$store.state.user.baseData.dateAndTimeOfBirth.minutes
      },
      set (value) {
        this.$store.commit('UPDATE_USER_MINUTES', value)
      }
    },

    userCountry: {
      get () {
        return this.$store.state.user.baseData.country
      },
      set (value) {
        this.$store.commit('UPDATE_USER_COUNTRY', value)
      }
    },
    userDescription: {
      get () {
        return this.$store.state.user.baseData.description
      },
      set (value) {
        this.$store.commit('UPDATE_USER_DESCRIPTION', value)
      }
    },

    userZodiac: function () {
      return this.$store.state.user.baseData.zodiac;
    },
    userAge: function () {
      return this.$store.state.user.baseData.age;
    },

    userAvatar: function () {
      let avatar = 'base';
      if (this.$store.state.user.baseData.photoUrlList) {
        this.$store.state.user.baseData.photoUrlList.forEach(item => {
          if (item.avatar) {
            avatar = item.url;
          }
        })
      }

      return avatar;
    }
  },
  mounted: async function () {
    await this.reLocation('/login')
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
</style>
