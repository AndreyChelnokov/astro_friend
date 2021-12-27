<template>
  <div class="user__photo">
    <div class="user__photo-wrap">
      <div v-for="photo in this.userPhotoList"
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
    <input @change="changeFileInput" type="file" class="user__photo-input" name="" id="">
  </div>
</template>

<script>
export default {
  name: 'editPhoto',
  methods: {
    changeFileInput: async function (e) {
      const photoMame = await this.setUserPhotoFBStorage(e);
      await this.getUserPhotoUrlOfStorage(photoMame).then(() => {
        this.updateUserData() // После добавления фото добавляем ссылки в БД
      })
    },
    setUserPhotoFBStorage: function (e) {
      return this.$store.dispatch('pushClientPhoto', {
        imgName: e.target.files[0].name,
        file: e.target.files[0]
      })
    },
    getUserPhotoUrlOfStorage: async function (userPhoto) {
      return this.$store.dispatch('getUrlPhoto', {name: userPhoto})
          .then(url => {
            // Тут добавляем обьект фотографии в стор
            this.$store.commit('PUSH_USER_PHOTO_ITEM',{
              url,
              avatar: this.$store.state.user.baseData.photoUrlList ? false : true,
              name: userPhoto,
              id: this.$store.state.user.baseData.photoUrlList ? this.$store.state.user.baseData.photoUrlList[this.$store.state.user.baseData.photoUrlList.length - 1].id + 1 : 1
            })
          })
    },
    deletePhoto: async function (idPhoto) {
      const namePhoto = this.$store.state.user.baseData.photoUrlList.filter(item => {
        return item.id === idPhoto;
      })[0].name;

      const isDeletedPhoto = await this.$store.dispatch('deletePhoto', { name: namePhoto })

      if (isDeletedPhoto) {
        this.$store.commit('DELETE_USER_PHOTO_ITEM', idPhoto) // Удаляем из БД
      }

      this.updateUserData()
    },
    updateAvatar: function (idPhoto) {
      this.$store.commit('UPDATE_USER_PHOTO_ITEM_AVATAR', idPhoto)
      this.updateUserData()
    },

    // Обновляем данные в БД
    updateUserData: async function () {
      await this.$store.dispatch('clientUpdate', this.$store.state.user)
    },
  },
  computed: {
    userPhotoList: function () {
      return this.$store.state.user.baseData.photoUrlList;
    },
  }
}
</script>
