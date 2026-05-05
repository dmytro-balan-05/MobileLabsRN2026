import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth, initializeAuth, getReactNativePersistence } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import AsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyAGmdASLE_3TgxV_rjb63y-EGyu5F90rHM",
  authDomain: "lab6-5034c.firebaseapp.com",
  projectId: "lab6-5034c",
  storageBucket: "lab6-5034c.firebasestorage.app",
  messagingSenderId: "952937506008",
  appId: "1:952937506008:web:dddb7983d39a29dc16e3ad",
  measurementId: "G-DN04D4QHE6"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);

let auth;

try {
    auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage)
    });
} catch (error) {
    auth = getAuth(app);
}

const db = getFirestore(app);

export { auth, db };
