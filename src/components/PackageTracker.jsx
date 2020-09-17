import React from 'react';
import '../styles/PackageTracker.css';
import { Grid } from '@material-ui/core';
import AddPackage from './AddPackage';
import PackageList from './PackageList';

function PackageTracker() {
  return (
    <div>
      <div className='centertitle'>
        Package Tracker
      </div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="baseline"
      >
          <AddPackage />
          <PackageList />
      </Grid>
    </div>
  );
}

export default PackageTracker;