import React, { useState } from 'react';
import {
  Drawer,
  IconButton,
  List,
  ListItemText,
  ListItemButton,
  ListItemIcon,
  Box,
  Typography,
  Divider,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LogoutIcon from '@mui/icons-material/Logout';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../db/supabaseClient';

const Sidebar = () => {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  const handleDashboardButton = () => {
    setOpen(false);
    navigate('/dashboard');
  };

  const handleAccountButton = () => {
    setOpen(false);
    navigate('/account');
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setOpen(false);
    navigate('/');
  };

  const menuItems = [
    { icon: <DashboardIcon />, label: 'Dashboard', onClick: handleDashboardButton },
    { icon: <PersonOutlineIcon />, label: 'Account', onClick: handleAccountButton },
  ];

  return (
    <>
      <IconButton
        onClick={handleDrawerToggle}
        sx={{
          position: 'fixed',
          left: 16,
          top: 16,
          zIndex: 1200,
          width: 44,
          height: 44,
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
          backdropFilter: 'blur(10px)',
          borderRadius: 2.5,
          boxShadow: '0px 2px 12px rgba(45, 52, 54, 0.1)',
          transition: 'all 0.2s ease-in-out',
          '&:hover': {
            backgroundColor: '#FFFFFF',
            boxShadow: '0px 4px 16px rgba(45, 52, 54, 0.15)',
            transform: 'scale(1.05)',
          },
        }}
      >
        <MenuIcon sx={{ color: '#2D3436', fontSize: 22 }} />
      </IconButton>

      <Drawer
        open={open}
        onClose={handleDrawerToggle}
        variant="temporary"
        anchor="left"
        ModalProps={{
          keepMounted: true,
        }}
        PaperProps={{
          sx: {
            width: 280,
            backgroundColor: '#FFFFFF',
            borderRight: 'none',
            boxShadow: '4px 0px 24px rgba(45, 52, 54, 0.1)',
          },
        }}
      >
        {/* Logo Section */}
        <Box
          sx={{
            p: 3,
            display: 'flex',
            alignItems: 'center',
            gap: 1.5,
          }}
        >
          <Box
            sx={{
              width: 42,
              height: 42,
              borderRadius: 2.5,
              background: 'linear-gradient(135deg, #6C9A8B 0%, #4A7A6B 100%)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0px 4px 12px rgba(108, 154, 139, 0.3)',
            }}
          >
            <CheckCircleOutlineIcon sx={{ color: '#FFFFFF', fontSize: 24 }} />
          </Box>
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              color: '#2D3436',
              letterSpacing: '-0.02em',
            }}
          >
            Taskify
          </Typography>
        </Box>

        <Divider sx={{ mx: 2, borderColor: 'rgba(45, 52, 54, 0.06)' }} />

        {/* Navigation */}
        <Box sx={{ px: 2, py: 2 }}>
          <Typography
            variant="body2"
            sx={{
              color: '#B2BEC3',
              fontSize: '0.7rem',
              fontWeight: 600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              px: 1.5,
              mb: 1,
            }}
          >
            Menu
          </Typography>

          <List sx={{ p: 0 }}>
            {menuItems.map((item, index) => (
              <ListItemButton
                key={index}
                onClick={item.onClick}
                sx={{
                  borderRadius: 2.5,
                  mb: 0.5,
                  py: 1.25,
                  transition: 'all 0.15s ease-in-out',
                  '&:hover': {
                    backgroundColor: 'rgba(108, 154, 139, 0.08)',
                  },
                  '&:hover .MuiListItemIcon-root': {
                    color: '#6C9A8B',
                  },
                  '&:hover .MuiListItemText-primary': {
                    color: '#6C9A8B',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 40,
                    color: '#636E72',
                    transition: 'color 0.15s ease-in-out',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText
                  primary={item.label}
                  primaryTypographyProps={{
                    sx: {
                      fontWeight: 500,
                      fontSize: '0.95rem',
                      color: '#2D3436',
                      transition: 'color 0.15s ease-in-out',
                    },
                  }}
                />
              </ListItemButton>
            ))}
          </List>
        </Box>

        {/* Spacer */}
        <Box sx={{ flex: 1 }} />

        {/* Logout Section */}
        <Box sx={{ px: 2, pb: 3 }}>
          <Divider sx={{ mb: 2, borderColor: 'rgba(45, 52, 54, 0.06)' }} />
          <ListItemButton
            onClick={handleLogout}
            sx={{
              borderRadius: 2.5,
              py: 1.25,
              transition: 'all 0.15s ease-in-out',
              '&:hover': {
                backgroundColor: 'rgba(192, 57, 43, 0.08)',
              },
              '&:hover .MuiListItemIcon-root': {
                color: '#C0392B',
              },
              '&:hover .MuiListItemText-primary': {
                color: '#C0392B',
              },
            }}
          >
            <ListItemIcon
              sx={{
                minWidth: 40,
                color: '#636E72',
                transition: 'color 0.15s ease-in-out',
              }}
            >
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Sign Out"
              primaryTypographyProps={{
                sx: {
                  fontWeight: 500,
                  fontSize: '0.95rem',
                  color: '#2D3436',
                  transition: 'color 0.15s ease-in-out',
                },
              }}
            />
          </ListItemButton>
        </Box>
      </Drawer>
    </>
  );
};

export default Sidebar;
