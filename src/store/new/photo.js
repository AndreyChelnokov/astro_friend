import { fireBaseApp } from '../../firebase';
import {getDatabase, push, ref, set} from "firebase/database";
const database = getDatabase(fireBaseApp);


export default {
    actions: {
        async uploadPhotoUser(context, payload) {
            const { imgName, file, photoUrlList } = payload;

            const fileName = await context.dispatch('pushClientPhoto', { imgName, file });
            const fileUrl  = await context.dispatch('getUrlPhoto', { name: fileName });

            const newPhotoObj = {
                url: fileUrl,
                avatar: photoUrlList.length ? false : true,
                name: fileName,
                id: photoUrlList.length >= 1 ? photoUrlList[photoUrlList.length - 1].id + 1 : 1
            }
            photoUrlList.push(newPhotoObj)
            await context.dispatch('pushUpdateArrayPhoto', { photoArr: photoUrlList })
        },


        async pushUpdateArrayPhoto(context, payload) {
            const uid = await context.dispatch('getUid');
            const { photoArr } = payload;

            const refChats = ref(database, `users/${uid}/baseData/photoUrlList`);
            set(refChats, photoArr);
        },
    }
}
