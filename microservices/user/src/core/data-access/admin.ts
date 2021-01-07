import firebase from "firebase";
import "firebase/firestore";
import { firebaseConfig } from "../../config/db-connection";

firebase.initializeApp(firebaseConfig);

export const db = firebase.database();
