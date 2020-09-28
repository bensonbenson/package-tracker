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

  // Reverse chronological order for packages
  const sortPackagesByDate = () => {
    const packageList = packages;

    packageList.sort(function compare(a, b) {
      const dateA = new Date(a.timestamp.toDate());
      const dateB = new Date(b.timestamp.toDate());
      return dateA - dateB;
    })

    return packageList.reverse();
  }

  // Use the tracking number to generate a tracking URL
  const generateTrackingURL = (packageItem) => {
    const carrier = packageItem.carrier;
    const trackingNum = packageItem.trackingNum;

    switch(carrier) {
      case 'USPS':
        return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNum}`;
      case 'UPS':
        return `https://www.ups.com/track?loc=null&tracknum=${trackingNum}`;
      case 'Fedex':
        return `https://fedex.com/apps/fedextrack/index.html?tracknumbers=${trackingNum}`;
      case 'Amazon':
        return `https://www.amazon.com/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00?ie=UTF8&orderID=${trackingNum}`
      default:
        return `http://doge2048.com/`;
    }
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
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {
              packageList.map((packageItem) => (
                <TableRow key={packageItem.id}>
                  <TableCell component="th" scope="row">{packageItem.name}</TableCell>
                  <TableCell>{packageItem.carrier}</TableCell>
                  <TableCell>{(new Date(packageItem.timestamp.toDate()).toLocaleDateString())}</TableCell>
                  <TableCell><a target="_blank" rel="noopener noreferrer" href={generateTrackingURL(packageItem)}>Track here</a></TableCell>
                  <TableCell>{packageItem.delivered ? 'true' : 'false'}</TableCell>
                  <TableCell>Delete button</TableCell>
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