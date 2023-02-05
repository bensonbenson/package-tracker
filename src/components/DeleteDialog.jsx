import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@mui/material';

const DeleteDialog = (props) => {
  const isDeleteDialogOpen = props.isDeleteDialogOpen;
  const handleClose = props.handleClose;
  const handleDelete = props.handleDelete;

  return (
    <Dialog open={isDeleteDialogOpen} onClose={handleClose}>
      <DialogTitle>Delete Confirmation</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete all checked packages?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} variant="contained">
          Cancel
        </Button>
        <Button onClick={handleDelete} variant="contained" color="secondary">
          Delete
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteDialog;
