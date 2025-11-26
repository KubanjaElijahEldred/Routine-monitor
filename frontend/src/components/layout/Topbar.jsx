import React, { useContext } from 'react';
import { 
  AppBar, 
  Toolbar, 
  IconButton, 
  Badge, 
  Avatar, 
  Box, 
  Typography, 
  useTheme,
  useMediaQuery,
  InputBase,
  alpha,
  Tooltip
} from '@mui/material';
import { 
  Menu as MenuIcon,
  Notifications as NotificationsIcon, 
  Search as SearchIcon,
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
  Person as PersonIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { ColorModeContext } from '../../App';
import LogoutButton from '../auth/LogoutButton';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backgroundColor: 'white',
  color: '#333',
  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
  marginLeft: 240,
  width: `calc(100% - 240px)`,
  [theme.breakpoints.down('md')]: {
    width: '100%',
    marginLeft: 0,
  },
}));

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: '#f5f5f5',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  color: '#666',
}));

const Topbar = () => {
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);
  return (
    <StyledAppBar 
      position="fixed"
      sx={{
        backgroundColor: theme.palette.mode === 'dark' ? theme.palette.background.paper : 'white',
        color: theme.palette.text.primary,
        boxShadow: 'none',
        borderBottom: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Toolbar>
        <Search sx={{ 
          backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
          '&:hover': {
            backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.15)' : 'rgba(0, 0, 0, 0.08)',
          },
        }}>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <input
            type="text"
            placeholder="Search..."
            style={{
              width: '100%',
              padding: '8px 8px 8px 48px',
              border: 'none',
              backgroundColor: 'transparent',
              fontSize: '0.875rem',
              outline: 'none',
              color: theme.palette.text.primary,
              '&::placeholder': {
                color: theme.palette.text.secondary,
              },
            }}
          />
        </Search>
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <IconButton 
            onClick={colorMode.toggleColorMode}
            color="inherit"
            aria-label="toggle theme"
            sx={{
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            {theme.palette.mode === 'dark' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
          <IconButton 
            color="inherit" 
            sx={{ 
              backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.05)',
              '&:hover': {
                backgroundColor: theme.palette.mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <Badge badgeContent={4} color="error">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <LogoutButton />
          </Box>
        </Box>
      </Toolbar>
    </StyledAppBar>
  );
};

export default Topbar;
