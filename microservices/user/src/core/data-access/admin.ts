import firebase from "firebase";
import { DB_CONFIG } from "../../config";

firebase.initializeApp(DB_CONFIG);

export const db = firebase.firestore();
