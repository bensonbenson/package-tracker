import React, { useState } from 'react';
import { TableCell, TableRow, Checkbox, Button } from '@mui/material';
import { generateCarrierTrackingUrl } from '../helpers/carriers';
import PackageListItemEditMode from './PackageListItemEditMode';
import '../styles/PackageList.css';

const PackageListItem = (props) => {
  const { packageItem, handleDelivered } = props;
  const [isEditingItem, setIsEditingItem] = useState(false);

  const handleEditItem = () => {
    setIsEditingItem(!isEditingItem);
  };

  const handleCancelEdit = () => {
    setIsEditingItem(false);
  };

  if (isEditingItem) {
    return (
      <PackageListItemEditMode
        packageItem={packageItem}
        handleDelivered={handleDelivered}
        handleCancelEdit={handleCancelEdit}
      />
    );
  }

  return (
    <TableRow
      key={packageItem.id}
      className={packageItem.delivered ? 'deliveredRow' : 'inProgressRow'}
    >
      <TableCell style={{ borderBottom: 'none', fontWeight: '1000' }}>
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
      <TableCell style={{ borderBottom: 'none' }} align="center">
        <Button variant="contained" onClick={handleEditItem}>
          Edit
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default PackageListItem;
