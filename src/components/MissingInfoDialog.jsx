import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const MissingInfoDialog = (props) => {
  const isMissingInfoDialogOpen = props.isMissingInfoDialogOpen;
  const handleClose = props.handleClose;

  return (
    <Dialog open={isMissingInfoDialogOpen} onClose={handleClose}>
      <DialogTitle>Missing info</DialogTitle>
      <DialogContent>
        <DialogContentText>Please complete all fields!</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Okay!
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default MissingInfoDialog;
