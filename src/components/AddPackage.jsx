import React, { useState } from 'react';
import '../styles/AddPackage.css';
import { Button, TextField, FormControl, Select, MenuItem, InputLabel } from '@material-ui/core';
import { addPackage } from '../firebase/addToFirebase';

function AddPackage() {
  const [packageName, setPackageName] = useState();
  const [trackingNum, setTrackingNum] = useState();
  const [carrier, setCarrier] = useState();

  const handleSelect = (event) => {
    setCarrier(event.target.value);
  }

  const handlePackageName = (event) => {
    setPackageName(event.target.value);
  }

  const handleTrackingNum = (event) => {
    setTrackingNum(event.target.value);
  }

  return (
    <div>
      <div>
        Add Package
      </div>
      <div>
        <form className="formStyle">
          <TextField required id="packageName" label="Package name" onChange={handlePackageName} />
          <br />
          <TextField required id="trackingNum" label="Tracking number" onChange={handleTrackingNum} />
          <br />
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
        </form>
      </div>
      <Button onClick={() => addPackage(packageName, trackingNum, carrier)} variant="contained" color="primary">Add</Button>
    </div>
  );
}

export default AddPackage;