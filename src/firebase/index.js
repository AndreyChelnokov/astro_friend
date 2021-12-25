import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getDatabase } from "firebase/database";

const CONFIG = {
    apiKey: "AIzaSyBQBlP2M3K87JdhpFvh56318m9NFEUpvPc",
    authDomain: "hey-project-dd78c.firebaseapp.com",
    projectId: "hey-project-dd78c",
    storageBucket: "hey-project-dd78c.appspot.com",
    messagingSenderId: "489912923039",
    appId: "1:489912923039:web:bf1e600009adaf9904c3aa",
    measurementId: "G-D888PW7K40"
}

export const fireBaseApp = initializeApp(CONFIG);
export const database = getDatabase(fireBaseApp);
export const auth = getAuth();
