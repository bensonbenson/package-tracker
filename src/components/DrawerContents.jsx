import React, { useContext } from 'react';
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  ListItem,
  ListItemText,
} from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { AuthContext } from './AuthContext';

const DrawerContents = (props) => {
  const { logout } = useContext(AuthContext);

  // Remove localstorage and refresh
  const handleLogOut = () => {
    logout();
  };

  return (
    <Box>
      <List>
        <ListItem key={'logout'}>
          <ListItemButton onClick={handleLogOut}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary={'Logout'} />
          </ListItemButton>
        </ListItem>
      </List>
    </Box>
  );
};

export default DrawerContents;
