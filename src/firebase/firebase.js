import firebase from 'firebase';
import { creds } from './firebase-creds'

const firebaseApp = firebase.initializeApp({creds});

const db = firebaseApp.firestore();

export { db };