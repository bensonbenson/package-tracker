import { db } from './firebase';

export const fetchPackages = () => {
  db.collection("packages").get()
  .then(res => {
    const data = res.docs.map(doc => doc.data());
    return data;
  })
  .catch(error => {
    console.log(`Error fetching: ${error}`)
  })
}