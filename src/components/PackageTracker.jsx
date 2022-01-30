import React, { useState, useEffect } from "react";
import "../styles/PackageTracker.css";
import { Grid } from "@material-ui/core";
import AddPackage from "./AddPackage";
import PackageList from "./PackageList";
import { db } from "../firebase/firebase";
import { ThemeProvider } from "@material-ui/styles";
import { createTheme } from "@material-ui/core/styles";
import { Redirect } from "react-router-dom";

const muiFont = "'Gotu', sans-serif";

const theme = createTheme({
  typography: {
    fontFamily: muiFont,
  },
  palette: {
    primary: {
      main: "#b3e5fc",
    },
    secondary: {
      main: "#ff8a65",
    },
  },
});

const PackageTracker = () => {
  const [loading, setLoading] = useState(true);
  const [packages, setPackages] = useState([]);

  // Fetch data from store
  useEffect(() => {
    const unsub = db.collection("packages").onSnapshot((snap) => {
      const data = snap.docs.map((doc) => doc.data());
      setPackages(data);
      setLoading(false);
    });

    return () => unsub();
  }, []);

  if (!localStorage.getItem("packagetracker")) {
    return <Redirect to="/login" />;
  }

  return (
    <ThemeProvider theme={theme}>
      <div className="centertitle">Package Tracker</div>
      <Grid
        container
        direction="row"
        justify="space-evenly"
        alignItems="baseline"
      >
        <AddPackage packages={packages} />
        <div className="packageList">
          <PackageList packages={packages} loading={loading} />
        </div>
      </Grid>
    </ThemeProvider>
  );
}

export default PackageTracker;
