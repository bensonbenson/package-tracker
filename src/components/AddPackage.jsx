import React from 'react';
import { Button } from '@material-ui/core';
import { addPackage } from '../firebase/addToFirebase';

function AddPackage() {
  return (
    <div>
      <Button onClick={() => addPackage()}>Add</Button>
    </div>
  );
}

export default AddPackage;