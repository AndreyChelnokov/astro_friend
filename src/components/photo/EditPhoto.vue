<template>
  <div class="wrap">

    <div class="edit-photo">
      <div class="edit-photo__photo-wrap">
        <div class="edit-photo__list">
          <div class="edit-photo__item"
               style="border: 1px solid #e3e3e3;"
               v-for="photo in this.userPhotoList"
               :key="photo.id"
               :id="photo.id"
               @click="changePhoto(photo.id)"
          >
            <div class="edit-photo__item-content">
              <img class="edit-photo__item-img" :src="photo.url" v-if="photo" alt="">
            </div>
          </div>
          <div class="edit-photo__item">
            <div class="edit-photo__item-content">
              <input @change="changeFileInput" type="file" name="">
              <img class="edit-photo__icon" src="../../assets/img/upload-icon.png" alt="">
            </div>
          </div>
        </div>
      </div>
    </div>

    <div :class="photoEdit.isEdit ? 'edit-photo__open-modal' : ''" class="edit-photo__modal">
      <div class="edit-photo__content">
        <div @click="deletePhoto(photoEdit.id)" class="edit-photo__btn user__photo-delete">Удалить фото</div>
        <div @click="updateAvatar(photoEdit.id)" class="edit-photo__btn user__photo-top">Сделать главной</div>
        <div @click="photoEdit.isEdit = false" class="edit-photo__btn user__photo-top">Отмена</div>
      </div>
    </div>

  </div>
</template>

<script>
export default {
  name: 'editPhoto',
  data: function () {
    return {
      photoEdit: {
        isEdit: false,
        id: 0
      }
    }
  },
  methods: {
    changeFileInput: async function (e) {
      const photoMame = await this.setUserPhotoFBStorage(e);
      await this.getUserPhotoUrlOfStorage(photoMame)
          .then(() => {
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
              avatar: this.$store.state.user.baseData.photoUrlList.length ? false : true,
              name: userPhoto,
              id: this.$store.state.user.baseData.photoUrlList.length >= 1 ? this.$store.state.user.baseData.photoUrlList[this.$store.state.user.baseData.photoUrlList.length - 1].id + 1 : 1
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

        this.photoEdit.isEdit = false;
      }

      this.updateUserData()
    },
    updateAvatar: function (idPhoto) {
      this.$store.commit('UPDATE_USER_PHOTO_ITEM_AVATAR', idPhoto)
      this.updateUserData()

      this.photoEdit.isEdit = false;
    },

    // Обновляем данные в БД
    updateUserData: async function () {
      await this.$store.dispatch('clientUpdate', this.$store.state.user)
    },

    changePhoto: function(id) {
      this.photoEdit.isEdit = true;
      this.photoEdit.id = id;
    }
  },
  computed: {
    userPhotoList: function () {
      return this.$store.state.user.baseData.photoUrlList;
    },
  }
}
</script>



<style>
.edit-photo {
  border-top: 1px solid #f1f1f1;
  border-bottom: 1px solid #f1f1f1;
  background: #f9f9f9;
  width: calc(100% + 20px);
  position: relative;
  left: -10px;
  padding: 10px;
}
.edit-photo__list {
  display: flex;
  flex-wrap: wrap;
}
.edit-photo__item {
  width: calc(33% - 10px);
  overflow: hidden;
  border: 2px dashed #f2c9ff;
  border-radius: 3px;
  background: #fdf6fb;
  margin-bottom: 7px;
  margin-top: 7px;
}
.edit-photo__item:not(:nth-child(3n)) {
  margin-right:15px;
}
.edit-photo__item-content {
  padding-bottom: 115%;
  position: relative;
}

.edit-photo__item input[type="file"] {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  opacity: 0;
}
.edit-photo__item-img {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.edit-photo__icon {
  position: absolute;
  width: 30px;
  opacity: 0.1;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}


.edit-photo__modal {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, .4);
  opacity: 0;
  z-index: -999;
}

.edit-photo__content {
  position: absolute;
  width: calc(100% - 20px);
  bottom: -500px;
  left: 10px;
  transition: .5s;
}

.edit-photo__modal.edit-photo__open-modal .edit-photo__content {
  bottom: 10px;
  transition: .5s;
}
.edit-photo__modal.edit-photo__open-modal {
  opacity: 1;
  z-index: 99;
}



.edit-photo__btn {
  width: 100%;
  height: 40px;
  border-radius: 10px;
  background: #fff;
  margin-bottom: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
