import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import { fireBaseApp } from '../../firebase';

const appFB = fireBaseApp;
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
        async signOutUser({dispatch, commit}) {
            await auth.signOut()
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
