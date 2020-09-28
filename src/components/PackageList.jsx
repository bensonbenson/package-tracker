import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import Loader from './Loader';

function PackageList() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState();

  useEffect(() => {
    const unsub = db.collection('packages').onSnapshot(snap => {
      const data = snap.docs.map(doc => doc.data())
      console.log(data);
      setPackages(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  return (
    loading ? <Loader /> :
    <div>
      list
    </div>
  );
}

export default PackageList;