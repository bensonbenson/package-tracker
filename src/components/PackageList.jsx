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
  Grid,
} from '@mui/material';
import PackageListItem from './PackageListItem';

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
          <Grid>
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
                    Tracking #
                  </TableCell>
                  <TableCell className="tableCell" align="center">
                    Delivered
                  </TableCell>
                  <TableCell className="tableCell" align="center"></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {packageList.map((packageItem) => (
                  <PackageListItem
                    key={packageItem.id}
                    packageItem={packageItem}
                    handleDelivered={handleDelivered}
                  />
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
