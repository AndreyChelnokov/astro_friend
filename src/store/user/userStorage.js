import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { fireBaseApp } from '../../firebase';

const storage = getStorage(fireBaseApp);

export default {
    actions: {
        // => imgName
        async pushClientPhoto({dispatch, commit}, {imgName, file}) {
            const uid = await dispatch('getUid');

            const storeRef = ref(storage, `${uid}/photos/${imgName}`);

            return await uploadBytes(storeRef, file)
                .then((snapshot) => {
                    console.log('snapshot', snapshot)
                    console.log('Uploaded a blob or file!');

                    return imgName;
                })
                .catch(e => {
                    console.log(e)
                })
        },
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
        async getUrlPhoto({dispatch, commit}, { name }) {
            const uid = await dispatch('getUid');

            return getDownloadURL(ref(storage, `${uid}/photos/${name}`))
                .then(url => url)
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
