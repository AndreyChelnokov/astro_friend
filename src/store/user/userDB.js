import { getDatabase, set, ref, get} from "firebase/database";
import { fireBaseApp } from '../../firebase';

const database = getDatabase(fireBaseApp);

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
        async clientUpdate({dispatch, commit}, {name, lastName, patronymic, pol, dateOfBirth, site, about, photo, zodiac}) {
            const uid = await dispatch('getUid');

            set(ref(database, `users/${uid}`), {
                name,
                lastName,
                patronymic,
                pol,
                dateOfBirth,
                site,
                about,
                photo,
                zodiac
            });
        },
    }
}
