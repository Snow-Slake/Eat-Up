import firebase from "firebase";
import 'firebase/storage';
import { DB_CONFIG } from "../../config";


firebase.initializeApp(DB_CONFIG.firebaseConfig);

export const db = firebase.firestore();
export const storage = firebase.storage().ref();
