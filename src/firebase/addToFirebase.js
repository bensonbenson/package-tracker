// import firebase from 'firebase';
import { db } from './firebase';
import { v4 as uuidv4 }from 'uuid';

export const addPackage = (name, trackingNo) => {
  const id = uuidv4();
  const date = new Date();

  const uspsPackage = {
    id: id,
    name: "test",
    timestamp: date,
    carrier: "usps",
    trackingNo: "312124sfsdfsdf",
    delivered: false
  };

  db.collection("packages").doc(id).set(uspsPackage)
  .then(() => {
    console.log("success");
    console.log(date);
  })
  .catch(e => {
    console.log(`Error: ${e}`)
  })
}