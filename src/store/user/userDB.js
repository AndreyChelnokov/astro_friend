import {getDatabase, set, ref, get, update} from "firebase/database";
import { fireBaseApp } from '../../firebase';
import {convertObjectToArray} from "../../utils";

const database = getDatabase(fireBaseApp);

export default {
    actions: {
        async getAllUsers({dispatch, commit}) {
            const userRef = ref(database, `users`);

            return get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    return convertObjectToArray(snapshot.val())
                }
            }).catch((error) => {
                console.error('rrr', error);
            });
        },        // Получаем всех пользователей
        async getRejectedIdArray(context, payload) {
            const uid = await context.dispatch('getUid');
            const userRef = ref(database, `users/${uid}/rejectedUsers`);

            return get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val()
                }
            }).catch((error) => {
                console.error('rrr', error);
            });
        },   // Получаем массив дизлайкнутых
        async getSelectedIdArray(context, payload) {
            const uid = await context.dispatch('getUid');
            const userRef = ref(database, `users/${uid}/selectedUsers`);

            return get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val()
                }
            }).catch((error) => {
                console.error('rrr', error);
            });
        },   // Получаем массив лайкнутых
        async getNotSelectedUsers(context, payload) {
            const uid = await context.dispatch('getUid');
            const allOtherUsers = await context.dispatch('getAllUsers');
            const selectedUsers = await context.dispatch('getSelectedIdArray');
            const rejectedUser = await context.dispatch('getRejectedIdArray');

            return allOtherUsers.filter(user => {
                if (Array.isArray(rejectedUser)) {
                    if (rejectedUser.indexOf(user.id) >= 0) {
                        return false;
                    }
                }

                if (Array.isArray(selectedUsers)) {
                    if (selectedUsers.indexOf(user.id) >= 0) {
                        return false;
                    }
                }

                if ([uid].indexOf(user.id) >= 0) {
                    return false;
                }

                return user;
            });
        },  // Получаем отфильтроанных пользователей для показа
        async gitUserDataById(context, payload) {
            const { id } = payload;
            const userRef = ref(database, `users/${id}`);

            return get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    }
                }).catch((error) => {
                    console.error('rrr', error);
                });
        }, // Получаем инфолрмацию о пользователе по ID

        async updateSelectedOtherUser(context, newId) {
            const uid = await context.dispatch('getUid');
            const oldData = await context.dispatch('getSelectedIdArray');
            let newData = [];

            if (Array.isArray(oldData)) {
                oldData.forEach(item => {
                    newData.push(item)
                })
                newData.push(newId)
            } else {
                newData.push(newId)
            }

            set(ref(database, `users/${uid}/selectedUsers/`), newData);
        }, // Добаввляем новые id в массив текущего поль зователя
        async updateRejectedOtherUser(context, newId) {
            const uid = await context.dispatch('getUid');
            const oldData = await context.dispatch('getRejectedIdArray');
            let newData = [];

            if (Array.isArray(oldData)) {
                oldData.forEach(item => {
                    newData.push(item)
                })
                newData.push(newId)
            } else {
                newData.push(newId)
            }

            set(ref(database, `users/${uid}/rejectedUsers/`), newData);
        }, // Добаввляем новые id в массив текущего поль зователя

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
