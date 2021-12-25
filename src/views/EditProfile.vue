<template>
  <div class="user content-page">
    <div class="user__header">
      <div class="user__img">
        <img class="user__img-icon" :src="userAvatar" alt="">
      </div>
      <div class="user__base-data">
        <div class="user__name">{{ user.lastName }} {{ user.name }}</div>
        <div v-if="user.zodiac" class="zodiac">Знак зодиака: {{ user.zodiac }}</div>
        <div class="user__age">{{ user.age }}</div>
      </div>
    </div>

    <button @click="signOutUser" class="out">
      Выйти
    </button>

    <div class="user__photo">
      <div class="user__photo-wrap">
        <div v-for="photo in user.photo"
             :key="photo.id"
             :id="photo.id"
             class="user__photo-item">
          <img
              style="width: 100px;height: 100px; object-fit: cover;"
              :src="photo.url"
          >

          <div class="user__photo-btns">
            <div @click="deletePhoto(photo.id)" class="user__photo-btn user__photo-delete">X</div>
            <div @click="updateAvatar(photo.id)" class="user__photo-btn user__photo-top">V</div>
          </div>
        </div>
      </div>
      <input @change="changeUploaderFiles" type="file" class="user__photo-input" name="" id="">
    </div>



    <div class="user__data">
      <form @submit.prevent="updateUserData" action="" class="user__data-wrap user__about">
        <div class="user__data-title">Общая информация</div>
        <div class="user__data-description">Данная информация доступная всем пользователям</div>

        <div class="user__data-item">
          <input
              v-model="user.name"
              class="input-text"
              type="text"
              placeholder="Имя">
        </div>
        <div class="user__data-item">
          <input v-model="user.lastName" class="input-text" type="text" placeholder="Фамилия">
        </div>
        <div class="user__data-item">
          <input v-model="user.patronymic" class="input-text" type="text" placeholder="Отчество">
        </div>

        <div class="user__data-item">
          <Select :type="'pol'" :name="user.pol.name" :list="user.pol.values" :errorText="user.pol.errorText" />
        </div>

        <div class="user__data-item">
          <input @change="changeData" v-model="user.date" class="input-text" type="date" placeholder="Дата рождения">
        </div>
        <div class="user__data-item">
          <input @change="changeTime" v-model="user.time" class="input-text" type="time" placeholder="Время рождения">
        </div>

        <div class="user__data-item">
          <input v-model="user.site" class="input-text" type="text" placeholder="Город рождения">
        </div>

        <div class="user__data-item">
          <textarea v-model="user.about" class="input-textarea" name="" placeholder="О себе..."></textarea>
        </div>

        <button type="submit">Сохранить</button>
      </form>
    </div>
  </div>
</template>

<script>
import Select from '../components/Select';

export default {
  name: 'User',
  data: function () {
    return {
      user: {
        photo: [],
        name: '',
        lastName: '',
        patronymic: '',
        age: '',
        date: '',
        time: '',
        zodiac: '',
        pol: {
          errorText: 'Укажите ваш пол',
          name: 'Пол',
          values: [
            {
              value: '1',
              name: 'Мужской'
            },
            {
              value: '2',
              name: 'Женский'
            }
          ]
        },
        polResult: '',
        dateOfBirth: {
          day: '',
          month: '',
          year: '',
          minute: '',
          second: ''
        },
        site: '',
        about: ''
      }
    }
  },
  components: {
    Select
  },
  methods: {
    signOutUser: function () {
      this.$store.dispatch('signOutUser')
    },
    updateUserData: async function () {
      await this.$store.dispatch('clientUpdate', {
        photo: this.user.photo,
        name: this.user.name,
        lastName: this.user.lastName,
        patronymic: this.user.patronymic,
        pol: this.user.pol.name,
        zodiac: this.user.zodiac,
        dateOfBirth: {
          day: this.user.dateOfBirth.day,
          month: this.user.dateOfBirth.month,
          year: this.user.dateOfBirth.year,
          minute: this.user.dateOfBirth.minute,
          second: this.user.dateOfBirth.second
        },
        site: this.user.site,
        about: this.user.about
      })
    },
    getZodiac: function () {
      if (!this.user.dateOfBirth.day && !this.user.dateOfBirth.month) {
        return '';
      }

      let result = '';

      switch (this.user.dateOfBirth.month) {
        case 1:
          if (this.user.dateOfBirth.day <= 19)
            result = 'Козерог';
          else
            result = 'Водолей';
          break;
        case 2:
          if (this.user.dateOfBirth.day <= 18)
            result = 'Водолей';
          else
            result = 'Рыбы';
          break;
        case 3:
          if (this.user.dateOfBirth.day <= 20)
            result = 'Рыбы';
          else
            result = 'Овен';
          break;
        case 4:
          if (this.user.dateOfBirth.day <= 19)
            result = 'Овен';
          else
            result = 'Телец';
          break;
        case 5:
          if (this.user.dateOfBirth.day <= 20)
            result = 'Телец';
          else
            result = 'Близнецы';
          break;
        case 6:
          if (this.user.dateOfBirth.day <= 21)
            result = 'Близнецы';
          else
            result = 'Рак';
          break;
        case 7:
          if (this.user.dateOfBirth.day <= 22)
            result = 'Рак';
          else
            result = 'Лев';
          break;
        case 8:
          if (this.user.dateOfBirth.day <= 22)
            result = 'Лев';
          else
            result = 'Дева';
          break;
        case 9:
          if (this.user.dateOfBirth.day <= 22)
            result = 'Дева';
          else
            result = 'Весы';
          break;
        case 10:
          if (this.user.dateOfBirth.day <= 22)
            result = 'Весы';
          else
            result = 'Скорпион';
          break;
        case 11:
          if (this.user.dateOfBirth.day <= 22)
            result = 'Скорпион';
          else
            result = 'Стрелец';
          break;
        case 12:
          if (this.user.dateOfBirth.day <= 21)
            result = 'Стрелец';
          else
            result = 'Козерог';
          break;
      };

      return result;
    },
    changeData: function (e) {
      const date = new Date(e.target.value)
      this.user.dateOfBirth.day = date.getDate();
      this.user.dateOfBirth.month = date.getMonth() + 1;
      this.user.dateOfBirth.year = date.getFullYear();

      this.user.zodiac = this.getZodiac();
      this.getAge();
    },
    changeTime: function (e) {
      const value = e.target.value;
      if (value.match(/\d+:\d+/)) {
        const data = value.split(':')
        this.user.dateOfBirth.minute = data[0];
        this.user.dateOfBirth.second = data[1];
      }
    },
    getAge: function () {
      const birthDate = new Date(this.user.date);
      const otherDate = new Date();

      let years = (otherDate.getFullYear() - birthDate.getFullYear());

      if (otherDate.getMonth() < birthDate.getMonth() ||
          otherDate.getMonth() == birthDate.getMonth() && otherDate.getDate() < birthDate.getDate()) {
        years--;
      }

      this.user.age = years || '';
    },
    setUserPhoto: function (e) {
      return this.$store.dispatch('pushClientPhoto', {
        imgName: e.target.files[0].name,
        file: e.target.files[0]
      })
    },
    getUserPhotoUrlOfStorage: async function (userPhoto) {
      return this.$store.dispatch('getUrlPhoto', {name: userPhoto})
          .then(url => {
            this.user.photo.push({
              url,
              avatar: this.user.photo.length ? false : true,
              name: userPhoto,
              id: this.user.photo.length ? this.user.photo[this.user.photo.length - 1].id + 1 : 1
            });
          })
    },
    changeUploaderFiles: async function (e) {
      const photoMame = await this.setUserPhoto(e);
      await this.getUserPhotoUrlOfStorage(photoMame).then(() => {
        this.updateUserData() // После добавления фото добавляем ссылки в БД
      })

    },
    deletePhoto: function (idPhoto) {
      this.user.photo.forEach((item, i) => {
        if (item.id === idPhoto) {
          this.user.photo.splice(i, 1);
        }
      })
      this.updateUserData()
    },
    updateAvatar: function (idPhoto) {
      this.user.photo.forEach((item, i) => {
        if (item.id === idPhoto) {
          this.user.photo[i].avatar = true;
        } else {
          this.user.photo[i].avatar = false;
        }
      })
      this.updateUserData()
    },
  },
  computed: {
    userAvatar: function () {
      let avatar = 'base';
      this.user.photo.forEach(item => {
        if (item.avatar) {
          avatar = item.url;
        }
      })

      return avatar;
    }
  },
  mounted: async function () {
    const user = await this.$store.dispatch('getUserData');

    this.user.photo = user.photo || [];
    this.user.name = user.name || '';
    this.user.lastName = user.lastName || '';
    this.user.patronymic = user.patronymic || '';
    this.user.polResult = user.pol || '';
    this.user.dateOfBirth.day = user.dateOfBirth.day || '';
    this.user.dateOfBirth.month = user.dateOfBirth.month || '';
    this.user.dateOfBirth.year = user.dateOfBirth.year || '';

    this.user.date = `${this.user.dateOfBirth.year}-0${this.user.dateOfBirth.month}-${this.user.dateOfBirth.day}`

    this.user.dateOfBirth.minute = user.dateOfBirth.minute || '';
    this.user.dateOfBirth.second = user.dateOfBirth.second || '';

    this.user.time = `${this.user.dateOfBirth.minute}:${this.user.dateOfBirth.second}`;

    this.user.site = user.site || '';
    this.user.about = user.about || '';

    this.user.zodiac = this.getZodiac();
    this.getAge();
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
