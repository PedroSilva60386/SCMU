import { initializeAuth, getReactNativePersistence, getAuth } from "firebase/auth";
import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";
//import ReactNativeAsyncStorage from "@react-native-async-storage/async-storage";

const firebaseConfig = {
  apiKey: "AIzaSyCZFSSZ8u2uLQ623MfRMPI5JXy3Z53x3xU",
  authDomain: "msp-myclinic-project.firebaseapp.com",
  projectId: "msp-myclinic-project",
  storageBucket: "msp-myclinic-project.appspot.com",
  messagingSenderId: "105024503209",
  appId: "1:105024503209:web:dacaa90e7cb074c83298b8",
  measurementId: "G-TZ5W6B9H7J",
};

const app = firebase.initializeApp(firebaseConfig);
const auth = getAuth(app);
/* const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
}); */


export { app, auth };
