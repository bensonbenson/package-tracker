import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import Loader from './Loader';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

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

  const sortPackagesByDate = () => {
    const packageList = packages;

    packageList.sort(function compare(a, b) {
      const dateA = new Date(a.timestamp.toDate());
      const dateB = new Date(b.timestamp.toDate());
      return dateA - dateB;
    })

    return packageList.reverse();
  }

  const renderPackageList = () => {
    const packageList = sortPackagesByDate();
    return (
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Package Name</TableCell>
              <TableCell>Carrier</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Tracking</TableCell>
              <TableCell>Delivered</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              packageList.map((packageItem) => (
                <TableRow key={packageItem.id}>
                  <TableCell component="th" scope="row">{packageItem.name}</TableCell>
                  <TableCell>{packageItem.carrier}</TableCell>
                  <TableCell>{(new Date(packageItem.timestamp.toDate()).toLocaleDateString())}</TableCell>
                  <TableCell>{packageItem.trackingNum}</TableCell>
                  <TableCell>{packageItem.delivered ? 'true' : 'false'}</TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    );
  }

  return (
    loading ? <Loader /> :
    <div>
      {renderPackageList()}
    </div>
  );
}

export default PackageList;