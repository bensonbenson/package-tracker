import React, { useState, useEffect } from 'react';
import { db } from '../firebase/firebase';
import Loader from './Loader';
import '../styles/PackageList.css';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid
} from '@material-ui/core';

function PackageList() {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [packageToBeDeleted, setPackageToBeDeleted] = useState('');

  useEffect(() => {
    const unsub = db.collection('packages').onSnapshot(snap => {
      const data = snap.docs.map(doc => doc.data())
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
      case 'DHL':
        return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNum}`
      default:
        return `http://doge2048.com/`;
    }
  }

  // Change delivered status of a package
  const handleDelivered = (packageItem) => {
    db.collection('packages').doc(packageItem.id).update({"delivered": !packageItem.delivered})
    .catch(error => {
      console.log(`Error in changing package delivered status: ${error}`)
    });
  }

  // Open dialog to confirm deletion, save selected item in state to access it
  const handleDeleteOpen = (packageItem) => {
    setDeleteDialogOpen(true);
    setPackageToBeDeleted(packageItem);
  }

  // Reset after closing dialog
  const handleDeleteClose = () => {
    setDeleteDialogOpen(false);
    setPackageToBeDeleted('');
  }

  // Delete package and close dialog
  const handleDeletePackage = () => {
    db.collection('packages').doc(packageToBeDeleted.id).delete()
    .then(() =>{
      handleDeleteClose();
    })
    .catch(error => {
      console.log(`Error in deleting a package: ${error}`)
    })
  }

  const renderPackageList = () => {
    const packageList = sortPackagesByDate();

    if (packageList.length < 1)
      return(<div>You have no packages saved!</div>);
    else
      return (
        <Grid container>
          <Grid item xs={12}>
            <Table className="tableContainer">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell" align="center">Name</TableCell>
                  <TableCell className="tableCell" align="center">Carrier</TableCell>
                  <TableCell className="tableCell" align="center">Tracking</TableCell>
                  <TableCell className="tableCell" align="center">Delivered</TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {
                  packageList.map((packageItem) => (
                    <TableRow key={packageItem.id} className={packageItem.delivered ? "deliveredRow" : "inProgressRow"}>
                      <TableCell style={{borderBottom: "none", fontWeight: "1000"}}>{packageItem.name}</TableCell>
                      <TableCell style={{borderBottom: "none"}} align="center">{packageItem.carrier}</TableCell>
                      <TableCell style={{borderBottom: "none"}} align="center"><a target="_blank" rel="noopener noreferrer" href={generateTrackingURL(packageItem)}>Track here</a></TableCell>
                      <TableCell style={{borderBottom: "none"}} align="center">{<Checkbox checked={packageItem.delivered} onChange={() => handleDelivered(packageItem)} value={packageItem.id} />}</TableCell>
                      <TableCell style={{borderBottom: "none"}} align="center">
                        <Button onClick={() => handleDeleteOpen(packageItem)} style={{ backgroundColor: 'transparent' }}>
                          <DeleteOutlineIcon color="secondary"/>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                }
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      );
  }

  return (
    loading ? <Loader /> :
    <div>
      {renderPackageList()}
      <Dialog open={deleteDialogOpen} onClose={handleDeleteClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete '{packageToBeDeleted.name}'?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteClose} color="primary">Cancel</Button>
          <Button onClick={handleDeletePackage}>Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default PackageList;