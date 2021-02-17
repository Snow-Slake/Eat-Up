import firebase from "firebase";
import admin from "firebase-admin";
import "firebase/storage";
import { DB_CONFIG } from "../../config";

firebase.initializeApp(DB_CONFIG.firebaseConfig);
admin.initializeApp({
    credential: admin.credential.cert(DB_CONFIG.serviceAccountKey),
    storageBucket: DB_CONFIG.bucketName,
});

export const db = firebase.firestore();
export const bucket = admin.storage().bucket();
