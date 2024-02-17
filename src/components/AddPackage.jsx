import React, { useState, useEffect } from 'react';
import '../styles/AddPackage.css';
import { addPackage, deletePackage } from '../firebase/firebase';
import {
  Button,
  TextField,
  InputLabel,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import { carriers } from '../helpers/carriers';
import DeleteDialog from './DeleteDialog';
import MissingInfoDialog from './MissingInfoDialog';

const AddPackage = (props) => {
  const packages = props.packages;
  const [packageName, setPackageName] = useState('');
  const [trackingNum, setTrackingNum] = useState('');
  const [carrier, setCarrier] = useState('');
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [checkedPackagesCount, setCheckedPackagesCount] = useState(0);
  const [isMissingInfoDialogOpen, setIsMissingInfoDialogOpen] = useState(false);

  useEffect(() => {
    let packageCount = 0;
    packages.forEach((element) => {
      if (element.delivered) {
        packageCount++;
      }
    });
    setCheckedPackagesCount(packageCount);
  }, [packages]);

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
      setIsMissingInfoDialogOpen(true);
    } else {
      addPackage(packageName, trackingNum, carrier).then(() => {
        resetFields();
      });
    }
  };

  const resetFields = () => {
    setPackageName('');
    setTrackingNum('');
    setCarrier('');
  };

  // Remove localstorage and refresh
  const handleLogOut = () => {
    localStorage.removeItem('packagetracker');
    window.location.reload();
  };

  // Delete all checked/delivered items
  const handleDeleteAllPackages = () => {
    packages.forEach((element) => {
      if (element.delivered) {
        deletePackage(element);
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

  const handleMissingInfoDialogClose = () => {
    setIsMissingInfoDialogOpen(false);
  };

  return (
    <div className="addPackageContainer">
      <div className="innerAddPackageContainer">
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
          disabled={checkedPackagesCount < 1}
        >
          Delete Checked Items
        </Button>
        {
          <DeleteDialog
            isDeleteDialogOpen={isDeleteDialogOpen}
            handleClose={handleDeleteDialogClose}
            handleDelete={handleDeleteAllPackages}
            checkedPackagesCount={checkedPackagesCount}
          />
        }
        {
          <MissingInfoDialog
            isMissingInfoDialogOpen={isMissingInfoDialogOpen}
            handleClose={handleMissingInfoDialogClose}
          />
        }
      </div>
    </div>
  );
};

export default AddPackage;
