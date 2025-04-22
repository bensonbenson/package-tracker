import React, { useState, useEffect } from 'react';
import '../styles/PackageTracker.css';
import { Grid } from '@mui/material';
import AddPackage from './AddPackage';
import PackageList from './PackageList';
import { packageCollection } from '../firebase/firebase';
import { ThemeProvider } from '@mui/material/styles';
import { createTheme } from '@mui/material/styles';
import { onSnapshot } from 'firebase/firestore';
import MenuIcon from '@mui/icons-material/Menu';
import { IconButton, Drawer } from '@mui/material';
import DrawerContents from './DrawerContents';

const muiFont = "'Gotu', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: muiFont,
  },
  palette: {
    primary: {
      main: '#b3e5fc',
    },
    secondary: {
      main: '#ff8a65',
    },
  },
});

const PackageTracker = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Get realtime updates from firestore using Snapshots
  useEffect(() => {
    const unsub = onSnapshot(packageCollection, (snapshot) => {
      const packageList = snapshot.docs.map((doc) => doc.data());
      setPackages(packageList);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <ThemeProvider theme={theme}>
      <Drawer
        anchor="right"
        open={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      >
        <DrawerContents />
      </Drawer>
      <div className="centertitle">
        <div className="headertitle">Package Tracker</div>
        <div className="headermenu">
          <IconButton aria-label="menu" onClick={handleDrawerToggle}>
            <MenuIcon />
          </IconButton>
        </div>
      </div>
      <Grid
        container
        direction="row"
        justifyContent="space-evenly"
        alignItems="baseline"
      >
        <AddPackage packages={packages} />
        <div className="packageList">
          <PackageList packages={packages} loading={loading} />
        </div>
      </Grid>
    </ThemeProvider>
  );
};

export default PackageTracker;
