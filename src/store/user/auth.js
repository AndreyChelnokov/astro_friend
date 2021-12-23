import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebase, { initializeApp } from 'firebase/app';
// import { getDatabase, set, ref , onValue, child, get} from "firebase/database";
import { getStorage, ref, uploadBytes } from "firebase/storage";


const appFireBase = initializeApp({
    apiKey: "AIzaSyBQBlP2M3K87JdhpFvh56318m9NFEUpvPc",
    authDomain: "hey-project-dd78c.firebaseapp.com",
    projectId: "hey-project-dd78c",
    storageBucket: "hey-project-dd78c.appspot.com",
    messagingSenderId: "489912923039",
    appId: "1:489912923039:web:bf1e600009adaf9904c3aa",
    measurementId: "G-D888PW7K40"
});
const storage = getStorage(appFireBase);
// const database = getDatabase(appFireBase);
const auth = getAuth();

export default {
    actions: {
        // Авторизация пользователя => user
        async clientLogin({dispatch, commit}, {email, password}) {
            return await signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    const user = userCredential.user;
                    return true;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                });
        },
        // Регистрация пользователя => user
        async clientCreate({dispatch, commit}, {email, password}) {
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Signed in
                    const user = userCredential.user;

                    // this.success = true;
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;

                    if (errorCode === "auth/email-already-in-use") {
                        // this.isRegistered = true;
                    }
                });
        },
        // Получаем пользователя => user
        async getUser() {
            const user = auth.currentUser;
            return user ? user : null;
        },
        // Получаем uid пользователя => uid
        async getUid() {
            const user = auth.currentUser;
            return user ? user.uid : null;
        },
    },
    store: {
        user: {
            isUser: false,
            userData: {}
        }
    },
    mutations: {
        TOGGLE_IS_USER(store) {
            store.user.isUser = true;
        },
        SET_USER_DATA(store, data) {
            store.user.userData = data;
        }
    },
    getters: {}
}
