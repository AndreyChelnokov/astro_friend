import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { fireBaseApp } from '../../firebase';

const storage = getStorage(fireBaseApp);

export default {
    actions: {


        async getListFile({dispatch, commit}) {
            const uid = await dispatch('getUid');
            const listRef = ref(storage, `${uid}/photos`);

            return await listAll(listRef)
                .then(res => {
                    const arr = [];
                    res.items.forEach(item => {
                        const link = item._location.path_;
                        arr.push(link);
                    })
                    return arr;
                })
                .catch((error) => {
                    console.log(error)
                });
        },


        async deletePhoto({dispatch, commit}, { name }) {
            const uid = await dispatch('getUid');

            // Delete the file
            return deleteObject(ref(storage, `${uid}/photos/${name}`))
                .then(() => {
                    return true;
                }).catch((error) => {
                    return false;
                });
        }
    }
}
