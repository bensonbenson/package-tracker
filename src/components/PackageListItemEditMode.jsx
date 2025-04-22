import React, { useState } from 'react';
import {
  TableCell,
  TableRow,
  Checkbox,
  IconButton,
  Tooltip,
  FormControl,
  Select,
  MenuItem,
  Input,
  InputAdornment,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import EditIcon from '@mui/icons-material/Edit';
import CancelIcon from '@mui/icons-material/Cancel';
import { carriers } from '../helpers/carriers';
import { updatePackageItem } from '../firebase/firebase';
import '../styles/PackageList.css';

const PackageListItemEditMode = (props) => {
  const { packageItem, handleDelivered, handleCancelEdit } = props;
  const [packageName, setPackageName] = useState(packageItem.name);
  const [trackingNum, setTrackingNum] = useState(packageItem.trackingNum);
  const [carrier, setCarrier] = useState(packageItem.carrier);

  const handleCancelEditItem = () => {
    handleCancelEdit();
  };

  const handleSaveEditItem = async () => {
    const newPackageItem = {
      ...packageItem,
      name: packageName,
      trackingNum: trackingNum,
      carrier: carrier,
    };
    await updatePackageItem(newPackageItem).then(() => {
      handleCancelEdit();
    });
  };

  return (
    <TableRow key={packageItem.id} className={'editingRow'}>
      <TableCell style={{ borderBottom: 'none', fontWeight: '1000' }}>
        <Input
          color="secondary"
          value={packageName}
          onChange={(e) => setPackageName(e.target.value)}
          placeholder="Package Name"
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <EditIcon />
            </InputAdornment>
          }
        />
      </TableCell>
      <TableCell style={{ borderBottom: 'none' }} align="center">
        <FormControl variant="standard">
          <Select
            color="secondary"
            labelId="select-carrier-label"
            id="select-carrier"
            value={carrier}
            label="Edit Carrier"
            onChange={(e) => setCarrier(e.target.value)}
          >
            {carriers.map((item) => {
              return (
                <MenuItem key={item.value} value={item.value}>
                  {item.label}
                </MenuItem>
              );
            })}
          </Select>
        </FormControl>
      </TableCell>
      <TableCell style={{ borderBottom: 'none' }} align="center">
        <Input
          color="secondary"
          value={trackingNum}
          onChange={(e) => setTrackingNum(e.target.value)}
          placeholder="Tracking Number"
          size="small"
          startAdornment={
            <InputAdornment position="start">
              <EditIcon />
            </InputAdornment>
          }
        />
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
        <Tooltip title="Save edits">
          <IconButton onClick={handleSaveEditItem}>
            <CheckCircleIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Cancel edits">
          <IconButton onClick={handleCancelEditItem}>
            <CancelIcon />
          </IconButton>
        </Tooltip>
      </TableCell>
    </TableRow>
  );
};

export default PackageListItemEditMode;
