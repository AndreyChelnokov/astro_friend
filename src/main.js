import Vue from 'vue'
import Vue2TouchEvents from 'vue2-touch-events'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import { onAuthStateChanged } from "firebase/auth";
import { auth, database } from './firebase';
Vue.config.productionTip = false;
Vue.use(Vue2TouchEvents)


let initApp = false
onAuthStateChanged(auth, (user) => {
  if (initApp) return;

  initApp = new Vue({
    router,
    store,
    database,
    render: h => h(App)
  }).$mount('#app')

  if (user) {
    console.log('Авторизован')
  } else {
    console.log('Не авторизован')
  }
});

