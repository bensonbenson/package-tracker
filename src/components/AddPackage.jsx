import React, { useState } from 'react';
import '../styles/AddPackage.css';
import { addPackage } from '../firebase/addToFirebase';
import { db } from '../firebase/firebase';
import {
  Button,
  TextField,
  InputLabel,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { carriers } from '../helpers/carriers';

const AddPackage = (props) => {
  const [packageName, setPackageName] = useState('');
  const [trackingNum, setTrackingNum] = useState('');
  const [carrier, setCarrier] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const handleSelect = (event) => {
    setCarrier(event.target.value);
  };

  const handlePackageName = (event) => {
    setPackageName(event.target.value);
  };

  const handleTrackingNum = (event) => {
    const trackingNum = event.target.value;
    setTrackingNum(trackingNum);
  };

  const handleAddPackage = () => {
    if (!packageName || !trackingNum || !carrier) {
      window.alert('Please complete all fields.');
    } else {
      addPackage(packageName, trackingNum, carrier);
      // Clear fields
      setPackageName('');
      setTrackingNum('');
      setCarrier('');
    }
  };

  // Remove localstorage and refresh
  const handleLogOut = () => {
    localStorage.removeItem('packagetracker');
    window.location.reload();
  };

  // Delete all checked/delivered items
  const handleDeleteAllPackages = () => {
    props.packages.forEach((element) => {
      if (element.delivered) {
        db.collection('packages')
          .doc(element.id)
          .delete()
          .catch((error) => {
            console.log(`Error in deleting a package: ${error}`);
          });
      }
    });
    handleDeleteDialogClose();
  };

  const handleDeleteDialogOpen = () => {
    setIsDeleteDialogOpen(true);
  };

  const handleDeleteDialogClose = () => {
    setIsDeleteDialogOpen(false);
  };

  const deleteDialog = () => {
    return (
      <Dialog open={isDeleteDialogOpen} onClose={handleDeleteDialogClose}>
        <DialogTitle>Delete Confirmation</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete all checked packages?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} variant="contained">
            Cancel
          </Button>
          <Button
            onClick={handleDeleteAllPackages}
            variant="contained"
            color="secondary"
          >
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  return (
    <div className="addPackageContainer">
      <div className="addTitle">Add Package</div>
      <div>
        <form className="formStyle">
          <div className="spaceBetweenFields">
            <TextField
              fullWidth
              required
              id="packageName"
              label="Package name"
              onChange={handlePackageName}
              value={packageName}
            />
          </div>
          <div className="spaceBetweenFields">
            <TextField
              fullWidth
              required
              id="trackingNum"
              label="Tracking number"
              onChange={handleTrackingNum}
              value={trackingNum}
            />
          </div>
          <div className="moreSpaceBetweenFields">
            <FormControl fullWidth>
              <InputLabel id="select-label">Select a carrier:</InputLabel>
              <Select
                labelId="select-carrier-label"
                id="select-carrier"
                value={carrier}
                label="Carrier"
                onChange={handleSelect}
              >
                {carriers.map((item) => {
                  return <MenuItem value={item.value}>{item.label}</MenuItem>;
                })}
              </Select>
            </FormControl>
          </div>
        </form>
      </div>
      <div>
        <Button
          onClick={handleAddPackage}
          variant="contained"
          disableElevation
          style={{ fontWeight: 'bold' }}
        >
          Add Package
        </Button>
        <Button
          onClick={handleLogOut}
          variant="contained"
          color="secondary"
          disableElevation
          style={{ fontWeight: 'bold', float: 'right' }}
        >
          Log Out
        </Button>
      </div>
      <Button
        onClick={handleDeleteDialogOpen}
        variant="contained"
        color="secondary"
        disableElevation
        style={{ fontWeight: 'bold', float: 'right', marginTop: '25px' }}
      >
        Delete Checked Items
      </Button>
      {deleteDialog()}
    </div>
  );
};

export default AddPackage;
