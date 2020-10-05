import React, { useState } from 'react';
import '../styles/AddPackage.css';
import { addPackage } from '../firebase/addToFirebase';
import {
  Button,
  TextField,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@material-ui/core';

function AddPackage() {
  const [packageName, setPackageName] = useState('');
  const [trackingNum, setTrackingNum] = useState('');
  const [carrier, setCarrier] = useState("USPS");

  const handleSelect = (event) => {
    setCarrier(event.target.value);
  }

  const handlePackageName = (event) => {
    setPackageName(event.target.value);
  }

  const handleTrackingNum = (event) => {
    setTrackingNum(event.target.value);
  }

  const handleAddPackage = () => {
    if (!packageName || !trackingNum || !carrier) {
      window.alert("Please complete all fields.");
    } else {
      addPackage(packageName, trackingNum, carrier)
      // Clear fields
      setPackageName('');
      setTrackingNum('');
      setCarrier('USPS');
    }
  }

  return (
    <div style={{width: "27%"}}>
      <div className="addTitle">
        Add Package
      </div>
      <div>
        <form className="formStyle">
          <div className="spaceBetweenFields">
            <TextField fullWidth required id="packageName" label="Package name" onChange={handlePackageName} value={packageName}/>
          </div>
          <div className="spaceBetweenFields">
            <TextField fullWidth required id="trackingNum" label="Tracking number or Amazon order ID" onChange={handleTrackingNum} value={trackingNum}/>
          </div>
          <div className="spaceBetweenFields">
            <FormControl required fullWidth={true}>
              <InputLabel id="select-label">Carrier</InputLabel>
              <Select labelId="select-label"
              id="select"
              value={carrier}
              onChange={handleSelect}
              >
                <MenuItem value="USPS">USPS</MenuItem>
                <MenuItem value="UPS">UPS</MenuItem>
                <MenuItem value="Fedex">Fedex</MenuItem>
                <MenuItem value="Amazon">Amazon</MenuItem>
              </Select>
            </FormControl>
          </div>

        </form>
      </div>
      <Button onClick={handleAddPackage} variant="contained" color="primary">Add</Button>
    </div>
  );
}

export default AddPackage;