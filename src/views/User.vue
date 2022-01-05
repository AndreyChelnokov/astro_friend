<template>
  <div class="user-profile">
    <div class="user-profile__photo-container">
      <div class="user-profile__photo-wrap">
        <div class="user-profile__photo-slider-container" ref="photoSwiper" v-swiper:mySwiper="swiperOptions">
          <div class="swiper-wrapper">
            <div class="user-profile__photo swiper-slide" v-for="photo in photoUrlList" :key="photo.id" :id="photo.id">
              <img :src="photo.url" alt="">
            </div>
          </div>
          <div class="user-profile__pagination" slot="pagination"></div>
        </div>
      </div>
    </div>

    <div class="user-profile__data">
      <div class="user-profile__data-item data-item">
        <div class="user-profile-header">
          <div class="user-profile__name">{{ currentUser.baseData ? currentUser.baseData.name.name : '' }}</div>
          <div class="user-profile__age">{{ currentUser.baseData ? currentUser.baseData.age : '' }}</div>
        </div>
        <div class="user-profile__descr">{{ currentUser.baseData ? currentUser.baseData.description : '' }}</div>
      </div>
      <div class="user-profile__data-item data-item">
        <div class="data-item__elem">
          Знак зодиака: {{ currentUser.baseData ? currentUser.baseData.zodiac : '' }} <br>
          Пол: {{ currentUser.baseData ? currentUser.baseData.pol : '' }}
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
import { Swiper, SwiperSlide, directive } from 'vue-awesome-swiper';
import '../assets/css/swiper.css';

export default {
  name: 'User',
  data: function () {
    return {
      swiperOptions: {
        pagination: {
          el: '.user-profile__pagination',
          loop: true
        }
      }
    }
  },
  components: {
    Swiper,
    SwiperSlide
  },
  directives: {
    swiper: directive
  },
  computed: {
    swiper() {
      return this.$refs.photoSwiper.$swiper;
    },
    currentUser() {
      return this.$store.state.user.currentUser;
    },
    photoUrlList() {
      return this.currentUser.baseData ? this.currentUser.baseData.photoUrlList : [];
    }
  },
  mounted: async function () {
    if (! await this.$store.dispatch('getUid')) {
      await this.$router.push('/login')
    } // Переадресация
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
