import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

Vue.config.productionTip = false;
Vue.use(Vue2TouchEvents)


export const fb = initializeApp({
  apiKey: "AIzaSyBQBlP2M3K87JdhpFvh56318m9NFEUpvPc",
  authDomain: "hey-project-dd78c.firebaseapp.com",
  projectId: "hey-project-dd78c",
  storageBucket: "hey-project-dd78c.appspot.com",
  messagingSenderId: "489912923039",
  appId: "1:489912923039:web:bf1e600009adaf9904c3aa",
  measurementId: "G-D888PW7K40"
});
const database = getDatabase(fb);

const auth = getAuth();
onAuthStateChanged(auth, (user) => {
  if (user) {
    const uid = user.uid;
    console.log('Авторизован');
    console.log(user)

    new Vue({
      router,
      store,
      fb,
      database,
      render: h => h(App)
    }).$mount('#app')

  } else {
    new Vue({
      router,
      store,
      fb,
      database,
      render: h => h(App)
    }).$mount('#app')
    console.log('Не авторизован')
  }
});

// new Vue({
//   router,
//   store,
//   fb,
//   database,
//   render: h => h(App)
// }).$mount('#app')