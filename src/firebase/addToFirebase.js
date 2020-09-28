// import firebase from 'firebase';
import { db } from './firebase';
import { v4 as uuidv4 }from 'uuid';

export const addPackage = (name, trackingNum, carrier) => {
  const id = uuidv4();
  const date = new Date();

  const uspsPackage = {
    id: id,
    name: name,
    timestamp: date,
    carrier: carrier,
    trackingNum: trackingNum,
    delivered: false
  };

  db.collection("packages").doc(id).set(uspsPackage)
  .catch(error => {
    console.log(`Error adding: ${error}`)
  })
}