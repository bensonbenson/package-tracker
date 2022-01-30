import React from "react";
import { db } from "../firebase/firebase";
import Loader from "./Loader";
import "../styles/PackageList.css";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Grid,
} from "@material-ui/core";

const PackageList = (props) => {
  // Reverse chronological order for packages
  const sortPackagesByDate = () => {
    const packageList = props.packages;

    packageList.sort(function compare(a, b) {
      const dateA = new Date(a.timestamp.toDate());
      const dateB = new Date(b.timestamp.toDate());
      return dateA - dateB;
    });

    return packageList.reverse();
  };

  // Use the tracking number to generate a tracking URL
  const generateTrackingURL = (packageItem) => {
    const carrier = packageItem.carrier;
    const trackingNum = packageItem.trackingNum;

    switch (carrier) {
      case "USPS":
        return `https://tools.usps.com/go/TrackConfirmAction?tLabels=${trackingNum}`;
      case "UPS":
        return `https://www.ups.com/track?loc=null&tracknum=${trackingNum}`;
      case "Fedex":
        return `https://fedex.com/apps/fedextrack/index.html?tracknumbers=${trackingNum}`;
      case "Amazon":
        return `https://www.amazon.com/gp/your-account/order-details/ref=ppx_yo_dt_b_order_details_o00?ie=UTF8&orderID=${trackingNum}`;
      case "DHL":
        return `https://www.dhl.com/en/express/tracking.html?AWB=${trackingNum}`;
      default:
        return `http://doge2048.com/`;
    }
  };

  // Change delivered status of a package
  const handleDelivered = (packageItem) => {
    db.collection("packages")
      .doc(packageItem.id)
      .update({ delivered: !packageItem.delivered })
      .catch((error) => {
        console.log(`Error in changing package delivered status: ${error}`);
      });
  };

  const renderPackageList = () => {
    const packageList = sortPackagesByDate();

    if (packageList.length < 1) return <div>You have no packages saved!</div>;
    else
      return (
        <Grid container>
          <Grid item xs={12}>
            <Table className="tableContainer">
              <TableHead>
                <TableRow>
                  <TableCell className="tableCell" align="center">
                    Name
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Carrier
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Tracking
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Delivered
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packageList.map((packageItem) => (
                  <TableRow
                    key={packageItem.id}
                    className={
                      packageItem.delivered ? "deliveredRow" : "inProgressRow"
                    }
                  >
                    <TableCell
                      style={{ borderBottom: "none", fontWeight: "1000" }}
                    >
                      {packageItem.name}
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }} align="center">
                      {packageItem.carrier}
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }} align="center">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={generateTrackingURL(packageItem)}
                      >
                        Track here
                      </a>
                    </TableCell>
                    <TableCell style={{ borderBottom: "none" }} align="center">
                      {
                        <Checkbox
                          checked={packageItem.delivered}
                          onChange={() => handleDelivered(packageItem)}
                          value={packageItem.id}
                        />
                      }
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Grid>
        </Grid>
      );
  };

  return props.loading ? <Loader /> : <div>{renderPackageList()}</div>;
};

export default PackageList;
