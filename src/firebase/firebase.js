import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  deleteDoc,
  doc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';
import { creds } from './firebaseCreds';
import { v4 as uuidv4 } from 'uuid';

const firebaseApp = initializeApp(creds);

const db = getFirestore(firebaseApp);

export const packageCollection = collection(db, 'packages');

// Add a package to firestore
// Using 'setDoc' instead of 'addDoc' so we can manage the document id
export const addPackage = async (name, trackingNum, carrier) => {
  const id = uuidv4();
  const date = new Date();

  const packageItem = {
    id: id,
    name: name,
    timestamp: date,
    carrier: carrier,
    trackingNum: trackingNum,
    delivered: false,
  };

  try {
    await setDoc(doc(db, 'packages', id), packageItem);
  } catch (e) {
    console.log(`Error adding: ${e}`);
  }
};

// Deletes a package
export const deletePackage = async (packageItem) => {
  try {
    await deleteDoc(doc(db, 'packages', packageItem.id));
  } catch (e) {
    console.log(`Error deleting: ${e}`);
  }
};

// Flips 'delivered' status of package
export const updatePackageDeliveredStatus = async (packageItem) => {
  try {
    await updateDoc(doc(db, 'packages', packageItem.id), {
      delivered: !packageItem.delivered,
    });
  } catch (e) {
    console.log(`Error updating: ${e}`);
  }
};

// Modifies package item
export const updatePackageItem = async (packageItem) => {
  try {
    await updateDoc(doc(db, 'packages', packageItem.id), {
      name: packageItem.name,
      carrier: packageItem.carrier,
      trackingNum: packageItem.trackingNum,
    });
  } catch (e) {
    console.log(`Error updating: ${e}`);
  }
};

export { db };
