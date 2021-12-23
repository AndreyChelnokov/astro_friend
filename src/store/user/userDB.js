import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebase, { initializeApp } from 'firebase/app';
import { getDatabase, set, ref , onValue, child, get} from "firebase/database";


const appFireBase = initializeApp({
    apiKey: "AIzaSyBQBlP2M3K87JdhpFvh56318m9NFEUpvPc",
    authDomain: "hey-project-dd78c.firebaseapp.com",
    projectId: "hey-project-dd78c",
    storageBucket: "hey-project-dd78c.appspot.com",
    messagingSenderId: "489912923039",
    appId: "1:489912923039:web:bf1e600009adaf9904c3aa",
    measurementId: "G-D888PW7K40"
});
const database = getDatabase(appFireBase);

export default {
    actions: {
        // Получаем данные пользователя
        async getUserData({dispatch, commit}) {
            const uid = await dispatch('getUid');
            const userRef = ref(database, `users/${uid}`);

            return get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val();
                } else {
                    console.log("No data available");
                }
            }).catch((error) => {
                console.error('rrr', error);
            });

        },
        // Обновлкение информации о пользователе
        async clientUpdate({dispatch, commit}, {name, lastName, patronymic, pol, dateOfBirth, site, about, photo}) {
            const uid = await dispatch('getUid');

            set(ref(database, `users/${uid}`), {
                name,
                lastName,
                patronymic,
                pol,
                dateOfBirth,
                site,
                about,
                photo
            });
        },
    }
}
