import { getStorage, ref, uploadBytes, listAll, getDownloadURL, deleteObject } from "firebase/storage";
import { fireBaseApp } from '../../firebase';

const storage = getStorage(fireBaseApp);

export default {
    actions: {
        async pushClientPhoto({dispatch, commit}, {imgName, file}) {
            const uid = await dispatch('getUid');

            const storeRef = ref(storage, `${uid}/photos/${imgName}`);

            return await uploadBytes(storeRef, file)
                .then(snapshot => imgName)
                .catch(e => e)
        },

        async getUrlPhoto({dispatch, commit}, { name }) {
            const uid = await dispatch('getUid');

            return getDownloadURL(ref(storage, `${uid}/photos/${name}`))
                .then(url => url)
        },
    }
}
