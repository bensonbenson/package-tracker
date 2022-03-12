import firebase from 'firebase';
import { creds } from './firebaseCreds';

const firebaseApp = firebase.initializeApp(creds);

const db = firebaseApp.firestore();

export { db };
