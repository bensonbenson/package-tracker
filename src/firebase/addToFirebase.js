// import firebase from 'firebase';
import { db } from './firebase';
import { v4 as uuidv4 } from 'uuid';
import { addDoc, collection } from 'firebase/firestore';

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
    await addDoc(collection(db, 'packages'), packageItem);
  } catch (e) {
    console.log(`Error adding: ${e}`);
  }

  // db.collection('packages')
  //   .doc(id)
  //   .set(uspsPackage)
  //   .catch((error) => {
  //     console.log(`Error adding: ${error}`);
  //   });
};
