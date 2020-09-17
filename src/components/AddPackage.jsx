import React, { useState } from 'react';
import '../styles/AddPackage.css';
import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { addPackage } from '../firebase/addToFirebase';

function AddPackage() {
  const [packageName, setPackageName] = useState();
  const [trackingNum, setTrackingNum] = useState();
  const [carrier, setCarrier] = useState("usps");

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
      addPackage(packageName, trackingNum, carrier);
    }
  }

  return (
    <div>
      <div>
        Add Package
      </div>
      <div>
        <form className="formStyle">
          <div className="spaceBetweenFields">
            <TextField required id="packageName" label="Package name" onChange={handlePackageName} />
          </div>
          <div className="spaceBetweenFields">
            <TextField required id="trackingNum" label="Tracking number" onChange={handleTrackingNum} />
          </div>
          <div className="spaceBetweenFields">
            <FormControl required fullWidth={true}>
              <InputLabel id="select-label">Carrier</InputLabel>
              <Select labelId="select-label"
              id="select"
              value={carrier}
              onChange={handleSelect}
              >
                <MenuItem value="usps">USPS</MenuItem>
                <MenuItem value="ups">UPS</MenuItem>
                <MenuItem value="fedex">Fedex</MenuItem>
                <MenuItem value="amazon">Amazon</MenuItem>
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