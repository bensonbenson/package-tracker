import React from 'react';
import { Grid } from '@material-ui/core';
import AddPackage from './AddPackage';
import PackageList from './PackageList';

function PackageTracker() {
  return (
    <div>
      <Grid
        container
        direction="row"
        justify="space-around"
        alignItems="center"
      >
          <AddPackage />
          <PackageList />
      </Grid>
    </div>
  );
}

export default PackageTracker;