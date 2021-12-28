import { getDatabase, set, ref, get} from "firebase/database";
import { fireBaseApp } from '../../firebase';
import { getAuth } from "firebase/auth";
const database = getDatabase(fireBaseApp);

const auth = getAuth();
const user = auth.currentUser;
const UID = user ? user.uid : null;


export const updateUserChats = async (idSelectableUser) => {
    const userData = await getUserDataById(idSelectableUser)

    console.log('Данные пользователя которомы мы хотим добавить в чаты свой id', userData);

    if (userData.chats && Array.isArray(userData.chats)) {
        const newItemIndex = userData.chats.length;

        console.log(`Вызываю добавление чата с индексом ${newItemIndex}`)
        await setChatSelectableUser({
            idSelectableUser,
            index: newItemIndex,
            userData
        })
    } else {
        console.log(`Вызываю добавление чата без индекса`)
        await setChatSelectableUser({
            idSelectableUser,
            index: 0,
            userData
        })
    }
}


async function getUserDataById(idSelectableUser) {
    const userRef = ref(database, `users/${idSelectableUser}/`);  // Ссыдка на точку в БД

    return await get(userRef)
        .then((snapshot) => {
            if (snapshot.exists()) {
                return snapshot.val();
            }

            console.log(`Ошибка при получении userData пользователя ${idSelectableUser}`);
        }).catch((error) => {
            console.error('rrr', error);
        });

}

async function setChatSelectableUser({ idSelectableUser, index, userData }) {
    if (index) {
        set(ref(database, `users/${idSelectableUser}/chats`), {
            index: UID
        });
    } else {
        userData.chats = [UID]
        set(ref(database, `users/${idSelectableUser}`), ...userData);
    }
}
