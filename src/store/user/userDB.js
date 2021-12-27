import { getDatabase, set, ref, get} from "firebase/database";
import { fireBaseApp } from '../../firebase';

const database = getDatabase(fireBaseApp);

export default {
    actions: {
        // Получаем данные пользователя
        async getAllUsers({dispatch, commit}) {
            const userRef = ref(database, `users`);

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

        // Получаем данные пользователя и записываем в стор
        async getUserData({dispatch, commit}) {
            const uid = await dispatch('getUid');
            const userRef = ref(database, `users/${uid}`);

            return get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        commit('SET_USER_DATA', snapshot.val())
                        return snapshot.val();
                    }
                    console.log('Ошибка при получении userData');
                }).catch((error) => {
                    console.error('rrr', error);
                });

        },

        // Обновлкение БД из стора
        async clientUpdate({dispatch, commit}, userData) {
            const uid = await dispatch('getUid');

            set(ref(database, `users/${uid}`), userData);
        },
    }
}
