import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';

const Sidebar = () => {
  const [open, setOpen] = useState(false);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: 16,
          top: 16,
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
          <ListItem button>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Projects" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="Upcoming" />
          </ListItem>
          <ListItem button>
            <ListItemText primary="TBD" />
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

export default Sidebar;