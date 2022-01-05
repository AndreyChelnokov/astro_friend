import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import {fireBaseApp} from '../../firebase';
import {getDatabase, set, ref, get, update} from "firebase/database";
import {convertObjectToArray} from "../../utils";

const database = getDatabase(fireBaseApp);
const appFB = fireBaseApp;
const auth = getAuth();

export default {
    state: {
        currentUser: {}
    },
    mutations: {
        UPDATE_CURRENT_USER(state, newData) {
            state.currentUser = newData;
        }
    },
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


        // -----------


        async updateUserData(context, payload) {
            const uid = await context.dispatch('getUid')
            const { currentUserBaseData } = payload;

            const refChats = ref(database, `users/${uid}/baseData`);
            set(refChats, currentUserBaseData);
        },

        async gitUserDataById(context, payload) {
            const { id } = payload;
            const userRef = ref(database, `users/${id}`);

            return get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    }
                }).catch((e) => e);
        }, // Получаем инфолрмацию о пользователе по ID

        async getCurrentUser(context, payload) {
            const uid = await context.dispatch('getUid');
            const userRef = ref(database, `users/${uid}`);

            return get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {

                        const data = snapshot.val();
                        data.uid = context.dispatch('getUid')

                        context.commit('UPDATE_CURRENT_USER', data)
                        return snapshot.val();
                    }
                }).catch((e) => e);
        }
    }
}
