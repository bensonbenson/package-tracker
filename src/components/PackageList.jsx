import React from 'react';
import { updatePackageDeliveredStatus } from '../firebase/firebase';
import Loader from './Loader';
import '../styles/PackageList.css';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  Grid,
} from '@mui/material';
import { generateCarrierTrackingUrl } from '../helpers/carriers';

const PackageList = (props) => {
  const isLoading = props.loading;
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

  // Change delivered status of a package
  const handleDelivered = (packageItem) => {
    updatePackageDeliveredStatus(packageItem);
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
                      packageItem.delivered ? 'deliveredRow' : 'inProgressRow'
                    }
                  >
                    <TableCell
                      style={{ borderBottom: 'none', fontWeight: '1000' }}
                    >
                      {packageItem.name}
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none' }} align="center">
                      {packageItem.carrier}
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none' }} align="center">
                      <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href={generateCarrierTrackingUrl(packageItem)}
                      >
                        Track here
                      </a>
                    </TableCell>
                    <TableCell style={{ borderBottom: 'none' }} align="center">
                      {
                        <Checkbox
                          checked={packageItem.delivered}
                          onChange={() => handleDelivered(packageItem)}
                          value={packageItem.id}
                          color="secondary"
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

  return isLoading ? <Loader /> : <div>{renderPackageList()}</div>;
};

export default PackageList;
