import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useNavigate } from 'react-router-dom';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDashboardButton = () => {
    setOpen(!open);
    navigate('/dashboard');
  };

  const handleAccountButton = () => {
    setOpen(!open);
    navigate('/account');
  }

  return (
    <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: '4hv',
          top: '30px',
        }}
      >
        <MenuIcon />
      </IconButton>
      
      <Drawer
        open={open}
        onClose={handleDrawerToggle}
        variant="temporary"
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
      >
        <List sx={{ width: 200 }}>
          <ListItemButton onClick={handleDashboardButton}>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
          <ListItemButton onClick={() => navigate('/account')}>
            <ListItemText primary="Account" />
          </ListItemButton>
          
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;