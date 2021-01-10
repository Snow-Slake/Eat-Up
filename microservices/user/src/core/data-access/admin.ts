import firebase from "firebase";
import { DB_CONFIG } from "../../config";

firebase.initializeApp(DB_CONFIG.firebaseConfig);

export const db = firebase.firestore();
