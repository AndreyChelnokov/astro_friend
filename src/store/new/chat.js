import {equalTo, get, getDatabase, onValue, orderByChild, push, query, ref, set} from "firebase/database";
import {fireBaseApp} from '../../firebase';
const database = getDatabase(fireBaseApp);

export default {
    state: {
        currentChatMessage: {}
    },
    mutations: {
        UPDATE_MESSAGE(state, newData) {
            state.currentChatMessage = newData
        },
    },
    actions: {
        async GET_LIST_NAME_CHATS_USER(context, payload) {
            const { userId } = payload;
            const userRef = ref(database, `users/${userId}/chats`);

            return get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val()
                }
            }).catch((error) => {
                console.error('rrr', error);
            });
        },
        async GET_ALL_LIST_CHATS(context) {
            const userRef = ref(database, `chats`);

            return get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val()
                }
            }).catch((error) => {
                console.error('rrr', error);
            });
        },
        async GET_LIST_USER_CHATS(context, payload) {
            const uid = await context.dispatch('getUid')
            const allChatsNameUser = await context.dispatch('GET_LIST_NAME_CHATS_USER', { userId: uid })
            const allChats = await context.dispatch('GET_ALL_LIST_CHATS');
            let resultListChats = [];

            if (allChats) {
                for (let key in allChats) {
                    allChatsNameUser.forEach(name => {
                        if (name === key) {
                            resultListChats.push(allChats[key])
                        }
                    })
                }

            }

            return resultListChats;
        },
        async GET_CHAT_BY_ID(context, payload) {
            const { chatName } = payload;

            const userRef = ref(database, `chats/${chatName}`);

            return get(userRef).then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val()
                }
            }).catch((error) => {
                console.error('rrr', error);
            });
        },
        async GET_CHAT_BY_NAME(context, payload) {
            const { chat } = payload;

            const mostViewedPosts = await query(ref(database, 'chats'), orderByChild('name'), equalTo(chat));

            return get(mostViewedPosts).then((snapshot) => {
                if (snapshot.exists()) {
                    return snapshot.val().filter(Boolean)
                }
            }).catch((error) => {
                console.error('rrr', error);
            });
        },

        async CREATE_CHAT(context, payload) {
            const { chatName, users } = payload

            const refChats = ref(database, `chats/${chatName}`);

            const newChat = {
                name: chatName,
                users: users,
                lastMassage: {
                    author: 'admin',
                    message: 'Вы создали чат',
                    time: `${new Date()}`
                },
                messages: {
                    message: {
                        author: 'admin',
                        message: 'Вы создали чат'
                    }
                }
            }

            set(refChats, newChat)
        },

        async ADD_CHAT_NAME_USER(context, payload) {
            const { userId, chatName } = payload;
            let newListChats = []
            const refUserChatsList = ref(database, `users/${userId}/chats`);

            const oldChatsList = await context.dispatch('GET_LIST_NAME_CHATS_USER', { userId })

            if (Array.isArray(oldChatsList)) {
                oldChatsList.forEach(item => {
                    newListChats.push(item)
                })
            }
            newListChats.push(chatName)

            set(refUserChatsList, newListChats)
        },
        async SEND_NEW_MESSAGE(context, payload) {
            const { message, chat } = payload;

            const refChats = ref(database, `chats/${chat}/messages`);
            push(refChats, message);
        },
        async UPDATE_LAST_MESSAGE(context, payload) {
            const { message, chat } = payload;

            const refChats = ref(database, `chats/${chat}/lastMassage`);
            set(refChats, message);
        },

        async UPDATE_CHECKED_MESSAGE(context, payload) {
            const { idChat, idMessage } = payload;

            const refChats = ref(database, `chats/${idChat}/messages/${idMessage}/checked`);
            set(refChats, true);
        },


        // sync
        async GET_MESSAGES(context, payload) {
            const { chat } = payload;

            const refChats = ref(database, `chats/${chat}/messages`);

            onValue(refChats, await function (snapshot) {
                const data = snapshot.val();

                for (const key in data) {
                    data[key].id = key
                }

                context.commit('UPDATE_MESSAGE', data)
                return data
            });
        }
    }
}
