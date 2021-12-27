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
            return createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    return true; // Успешно зарегистирован
                })
                .catch((error) => {
                    return false;
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
    getters: {}
}
