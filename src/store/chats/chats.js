import { getDatabase, set, ref, get, query, equalTo, orderByChild} from "firebase/database";
import { fireBaseApp } from '../../firebase';
// import { updateUserChats } from '../../server';

const database = getDatabase(fireBaseApp);

export default {
    actions: {

        async getUserDataFromDbById({dispatch, commit}, idSelectableUser) {
            const userRef = ref(database, `users/${idSelectableUser}/`);

            return get(userRef)
                .then((snapshot) => {
                    if (snapshot.exists()) {
                        return snapshot.val();
                    }

                    console.error('Ошибка при получении данных пользователя в методе ')
                }).catch((error) => {
                    console.error('rrr', error);
                });

        },
        async setChatFromDbById({dispatch, commit}, { idSelectableUser, index, userData, chatName }) {
            const setData = { index: chatName };
            const setRef = ref(database, `users/${idSelectableUser}/chats`);

            console.log('setData', setData)

            return await set(setRef, setData);
        },

        async updateChatsUser({dispatch, commit}, { idSelectableUser, chatName }) {
            const userData = await dispatch('getUserDataFromDbById', idSelectableUser);
            let opts = {};

            if (userData.chats && Array.isArray(userData.chats)) {
                const newItemIndex = userData.chats.length;
                opts = { idSelectableUser, index: newItemIndex, userData, chatName }
            } else {
                opts = { idSelectableUser, index: 0, userData, chatName }
            }

            return dispatch('setChatFromDbById', opts);
        },


        async createChat({dispatch, commit}, { companionId }) {
            const uid = await dispatch('getUid');
            const chatName = `${uid}${companionId}`
            const refChat = ref(database, `chats/${chatName}`);

            const defaultDataChat = {
                author: 'admin',
                message: 'Вы создали чат'
            }

            await set(refChat, defaultDataChat);

            return chatName;
        },
        async initNewChat({dispatch, commit}, { companionId }) {
            const chatName = await dispatch('createChat', { companionId })


            return chatName;

        },


        async testGetChatByKey({dispatch, commit}) {

        }
    }
}
