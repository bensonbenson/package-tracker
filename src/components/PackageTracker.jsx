import React from 'react';
import '../styles/PackageTracker.css';
import { Grid } from '@material-ui/core';
import AddPackage from './AddPackage';
import PackageList from './PackageList';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';

const muiFont = "'Gotu', sans-serif";

const theme = createMuiTheme({
  typography: {
    fontFamily: muiFont
  },
  palette: {
    primary: {
      main: "#b3e5fc"
    },
    secondary: {
      main: "#ff8a65"
    }
  }
});

function PackageTracker() {
  return (
    <ThemeProvider theme={theme}>
      <div className='centertitle'>
        Package Tracker
      </div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="baseline"
      >
          <AddPackage />
          <PackageList />
      </Grid>
    </ThemeProvider>
  );
}

export default PackageTracker;