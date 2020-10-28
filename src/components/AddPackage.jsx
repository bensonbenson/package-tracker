import React, { useState } from 'react';
import '../styles/AddPackage.css';
import { addPackage } from '../firebase/addToFirebase';
import {
  Button,
  TextField,
  InputLabel,
  RadioGroup,
  FormControlLabel,
  Radio
} from '@material-ui/core';

function AddPackage() {
  const [packageName, setPackageName] = useState('');
  const [trackingNum, setTrackingNum] = useState('');
  const [carrier, setCarrier] = useState('');

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
      setCarrier('');
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
            <TextField fullWidth required id="trackingNum" label="Tracking number" onChange={handleTrackingNum} value={trackingNum}/>
          </div>
          <div className="moreSpaceBetweenFields">
            <RadioGroup
              value={carrier}
              onChange={handleSelect}
            >
              <InputLabel id="select-label">Select a carrier:</InputLabel>
              <FormControlLabel value="Amazon" control={<Radio color="primary" size="small"/>} label="Amazon (use Order ID number)" />
              <FormControlLabel value="DHL" control={<Radio color="primary" size="small" />} label="DHL" />
              <FormControlLabel value="Fedex" control={<Radio color="primary" size="small" />} label="Fedex" />
              <FormControlLabel value="UPS" control={<Radio color="primary" size="small" />} label="UPS" />
              <FormControlLabel value="USPS" control={<Radio color="primary" size="small" />} label="USPS" />
            </RadioGroup>
          </div>
        </form>
      </div>
      <Button onClick={handleAddPackage} variant="contained" color="primary" disableElevation style={{fontWeight: "bold"}}>Add Package</Button>
    </div>
  );
}

export default AddPackage;