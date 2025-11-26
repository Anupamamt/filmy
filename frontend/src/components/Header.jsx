import React,{useEffect, useState} from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  Avatar,
  Box,
  IconButton,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { useSelector } from 'react-redux';
import PowerSettingsNewIcon from '@mui/icons-material/PowerSettingsNew';
import profileImage from "../assets/react.svg";

const Header = () => {

  const theme = useTheme();
  const isWideEnough = useMediaQuery('(min-width:315px)');
  
  const handleSearchChange = (event) => {
    const searchText = event.target.value;
    onSearch?.(searchText);
  };

  return (

    <>
    <AppBar
      position="fixed"
      elevation={2}
      sx={{
        height:'7vh',
        backgroundColor: '#19305e',
        top: 0,
        left: 0,
        right: 0,
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar
        sx={{
          justifyContent: 'space-between',
          alignItems: 'center',
          px: 1,
          gap: 1,
        }}
      >
        {/* Left side: App name */}
        <Typography
          variant="h6"
          noWrap
          sx={{
            color: '#fff',
            mt:1.5,
            fontSize: { xs: '1rem', sm: '2rem' },
          }}
        >
          Filmy
        </Typography>

        {/* Center: Search bar on wider screens */}
        {isWideEnough && (
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#eeeeee',
              borderRadius: 2,
              px: 2,
              py: 0.5,
              flex: 1,
              maxWidth: 400,
            }}
          >
            <SearchIcon sx={{ mr: 1, color: 'action.active' }} />
            <InputBase
              placeholder="Search…"
              onChange={handleSearchChange}
              sx={{ flex: 1 }}
              inputProps={{ 'aria-label': 'search' }}
            />
          </Box>
        )}

        {/* Right side: Search icon on small screens and Avatar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {!isWideEnough && (
            <IconButton sx={{ color: '#fff' }}>
              <SearchIcon />
            </IconButton>
          )}
          <IconButton >
            <Avatar src={profileImage} alt='profile' />
          </IconButton>

        <IconButton
            onClick={() => {
                const confirmLogout = window.confirm("Are you sure you want to logout?");
                if (confirmLogout) {
                localStorage.clear();
                window.location.href = "/"; 
                }
            }}
            sx={{
                color: "white",
                backgroundColor: "#19305e",
                "&:hover": { backgroundColor: "#14264a" },
            }}
            >
            <PowerSettingsNewIcon sx={{ height: "35px" }}/>
        </IconButton>

        </Box>
      </Toolbar>
    </AppBar>

    </>
  );
};

export default Header;
