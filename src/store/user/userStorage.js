import {createUserWithEmailAndPassword, getAuth, signInWithEmailAndPassword} from "firebase/auth";
import firebase, { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytes, listAll, getDownloadURL } from "firebase/storage";

const appFireBase = initializeApp({
    apiKey: "AIzaSyBQBlP2M3K87JdhpFvh56318m9NFEUpvPc",
    authDomain: "hey-project-dd78c.firebaseapp.com",
    projectId: "hey-project-dd78c",
    storageBucket: "hey-project-dd78c.appspot.com",
    messagingSenderId: "489912923039",
    appId: "1:489912923039:web:bf1e600009adaf9904c3aa",
    measurementId: "G-D888PW7K40"
});
const storage = getStorage(appFireBase);

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
        async getUrlPhoto({dispatch, commit}, {name}) {
            const uid = await dispatch('getUid');

            return getDownloadURL(ref(storage, `${uid}/photos/${name}`))
                .then(url => url)
        }
    }
}
