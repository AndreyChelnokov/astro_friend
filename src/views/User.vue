<template>
  <div class="user-profile">

    <div class="user-profile__photo-container">
      <div class="user-profile__photo-wrap">
        <div class="user-profile__photo-slider-container" ref="photoSwiper" v-swiper:mySwiper="swiperOptions">
          <div class="swiper-wrapper">
            <div class="user-profile__photo swiper-slide" v-for="photo in user.photo" :key="photo.id" :id="photo.id">
              <img :src="photo.url" alt="">
            </div>
          </div>
          <div class="swiper-pagination"></div>
        </div>
      </div>
    </div>

    <div class="user-profile__data">
      <div class="user-profile__data-item data-item">
        <div class="user-profile-header">
          <div class="user-profile__name">{{ user.name }}</div>
          <div class="user-profile__age">24</div>
        </div>
        <div class="user-profile__descr">{{ user.about }}</div>
      </div>
      <div class="user-profile__data-item data-item">
        <div class="data-item__elem">
          Знак зодиака: {{ user.zodiac }} <br>
          Пол: {{ user.polResult }}
        </div>
      </div>
    </div>


    <router-link to="/editProfile">
      <div style="margin-top: 10px;" class="edit-profile-btn btn">
        Редактировать профиль
      </div>
    </router-link>




  </div>
</template>


<script>
import Select from '../components/Select';
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import '../assets/css/swiper.css';

import { updatingLocalUserDataFunction } from '../utils';
export default {
  name: 'User',
  data: function () {
    return {
      swiperOptions: {
        pagination: {
          el: '.swiper-pagination',
        },
      },
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
    Select,
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  methods: {
    getUserDateFromDB: async function() {
      return await this.$store.dispatch('getUserData');
    },
    updatingLocalUserData: async function() {
      const userData = await this.getUserDateFromDB();

      updatingLocalUserDataFunction(userData, this.user)
    },

    isUser: async function() {
      let uid = await this.$store.dispatch('getUid');

      if (uid) {
        return true;
      }

      return false;
    },
    updateUserRouterLocation: async function(newLocation) {
      if (await this.isUser()) {
      } else {
        await this.$router.push(newLocation)
      }
    }
  },
  computed: {
    swiper: function() {
      return this.$refs.photoSwiper.$swiper;
    },
  },
  mounted: async function () {
    await this.updateUserRouterLocation('/login'); // Перенаправляем пользователя (при необходимости)
    await this.updatingLocalUserData(); // Данные из БД помещаем в локальные данные
  }
}
</script>

<style>
  .user-profile__photo-container {
    position: relative;
    width: 100%;
    padding-bottom: 115%;
    height: 0;
    overflow: hidden;
  }
  .user-profile__photo-wrap {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
  .user-profile__photo {
    width: 100%;
    height: 100%;
  }
  .user-profile__photo img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .user-profile__photo-slider-container {
    height: 100%;
  }

  .user-profile__data {
    text-align: left;
  }
  .user-profile__data-item {
    padding: 10px;
    border-bottom: 1px solid #444444;
  }
  .user-profile-header {
    display: flex;
    align-items: center;
  }
  .user-profile__name {
    margin-right: 6px;
    font-weight: 600;
    font-size: 20px;
  }
  .user-profile__age {
    font-size: 20px;
  }
</style>
