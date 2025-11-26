import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { 
  List, 
  ListItem, 
  ListItemButton,
  ListItemIcon, 
  ListItemText, 
  Drawer, 
  Box, 
  Typography,
  Divider,
  IconButton,
  useTheme,
  Collapse,
  Tooltip,
  Avatar
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  List as ListIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
  Person as PersonIcon,
  Group as GroupIcon,
  Assessment as ReportIcon,
  Notifications as NotificationsIcon,
  Help as HelpIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  ExpandLess,
  ExpandMore,
  StarBorder,
  CalendarToday as CalendarIcon,
  BarChart as AnalyticsIcon,
  LocalFireDepartment as HabitIcon,
  Flag as GoalIcon,
} from '@mui/icons-material';
import { styled, useTheme as useMuiTheme } from '@mui/material/styles';

const drawerWidth = 260;
const collapsedWidth = 70;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
  { text: 'Tasks', icon: <ListIcon />, path: '/tasks' },
  { text: 'Habits', icon: <HabitIcon />, path: '/habits' },
  { text: 'Goals', icon: <GoalIcon />, path: '/goals' },
  { text: 'Calendar', icon: <CalendarIcon />, path: '/calendar' },
  { text: 'Analytics', icon: <AnalyticsIcon />, path: '/analytics' },
  { text: 'Team', icon: <GroupIcon />, path: '/team' },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings' },
  { text: 'Notifications', icon: <NotificationsIcon />, path: '/notifications' },
];

const settingsItems = [];

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? drawerWidth : collapsedWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    '& .MuiDrawer-paper': {
      width: open ? drawerWidth : collapsedWidth,
      boxSizing: 'border-box',
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      borderRight: 'none',
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
    },
  }),
);

const Sidebar = ({ open, onToggle }) => {
  const theme = useTheme();
  const location = useLocation();
  const navigate = useNavigate();
  const [expanded, setExpanded] = useState({});
  
  const handleToggle = (item) => {
    setExpanded(prev => ({
      ...prev,
      [item.text]: !prev[item.text]
    }));
  };

  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(`${path}/`);
  };

  const handleLogout = () => {
    // Handle logout logic here
    navigate('/login');
  };

  const renderMenuItems = (items) => (
    <List sx={{ width: '100%' }}>
      {items.map((item) => (
        <React.Fragment key={item.text}>
          <ListItem 
            disablePadding 
            sx={{ 
              display: 'block',
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
              backgroundColor: isActive(item.path) ? theme.palette.primary.main : 'transparent',
              mb: 0.5,
              borderRadius: 1,
              mx: 1,
            }}
          >
            <Tooltip title={!open ? item.text : ''} placement="right" arrow>
              <ListItemButton
                component={Link}
                to={item.path}
                onClick={item.subItems ? () => handleToggle(item) : undefined}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: isActive(item.path) ? theme.palette.common.white : 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{
                    sx: {
                      color: isActive(item.path) ? theme.palette.common.white : 'rgba(255, 255, 255, 0.7)',
                      fontWeight: isActive(item.path) ? 600 : 400,
                      fontSize: '0.9rem',
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.2s',
                    }
                  }}
                />
                {item.subItems && open && (
                  expanded[item.text] ? <ExpandLess /> : <ExpandMore />
                )}
              </ListItemButton>
            </Tooltip>
            
            {item.subItems && (
              <Collapse in={expanded[item.text]} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <ListItemButton
                      key={subItem.text}
                      component={Link}
                      to={subItem.path}
                      sx={{
                        pl: 6,
                        py: 0.5,
                        minHeight: 40,
                        '&:hover': {
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        },
                        backgroundColor: isActive(subItem.path) ? 'rgba(255, 255, 255, 0.1)' : 'transparent',
                      }}
                    >
                      <ListItemText 
                        primary={subItem.text}
                        primaryTypographyProps={{
                          sx: {
                            color: isActive(subItem.path) ? theme.palette.common.white : 'rgba(255, 255, 255, 0.7)',
                            fontSize: '0.85rem',
                            fontWeight: isActive(subItem.path) ? 500 : 400,
                          }
                        }}
                      />
                    </ListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </ListItem>
        </React.Fragment>
      ))}
    </List>
  );

  return (
    <StyledDrawer variant="permanent" open={open}>
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          p: 2,
          minHeight: 64,
        }}
      >
        {open && (
          <Typography variant="h6" noWrap component="div" sx={{ fontWeight: 700, color: 'white' }}>
            Routine Monitor
          </Typography>
        )}
        <IconButton onClick={onToggle} sx={{ color: 'white' }}>
          {open ? <ChevronLeftIcon /> : <ChevronRightIcon />}
        </IconButton>
      </Box>
      
      <Box sx={{ px: 1, mb: 2 }}>
        <Box 
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderRadius: 1,
            backgroundColor: 'rgba(255, 255, 255, 0.08)',
            cursor: 'pointer',
            '&:hover': {
              backgroundColor: 'rgba(255, 255, 255, 0.12)',
            },
          }}
        >
          <Avatar 
            src="https://randomuser.me/api/portraits/men/1.jpg"
            sx={{ 
              width: 40, 
              height: 40,
              mr: open ? 2 : 0,
              border: `2px solid ${theme.palette.primary.light}`
            }} 
          />
          {open && (
            <Box>
              <Typography variant="subtitle2" sx={{ color: 'white', fontWeight: 600 }}>
                John Doe
              </Typography>
              <Typography variant="caption" sx={{ color: 'rgba(255, 255, 255, 0.7)' }}>
                Admin
              </Typography>
            </Box>
          )}
        </Box>
      </Box>
      
      <Box sx={{ overflowY: 'auto', overflowX: 'hidden', flexGrow: 1 }}>
        {renderMenuItems(menuItems)}
      </Box>
      
      <Box sx={{ mt: 'auto' }}>
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)' }} />
        {renderMenuItems(settingsItems)}
        <Divider sx={{ borderColor: 'rgba(255, 255, 255, 0.12)', my: 1 }} />
        <List>
          <ListItem 
            disablePadding
            sx={{ 
              '&:hover': {
                backgroundColor: 'rgba(255, 255, 255, 0.08)',
              },
              borderRadius: 1,
              mx: 1,
            }}
          >
            <Tooltip title={!open ? 'Logout' : ''} placement="right" arrow>
              <ListItemButton
                onClick={handleLogout}
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                    color: 'rgba(255, 255, 255, 0.7)',
                  }}
                >
                  <LogoutIcon />
                </ListItemIcon>
                <ListItemText 
                  primary="Logout"
                  primaryTypographyProps={{
                    sx: {
                      color: 'rgba(255, 255, 255, 0.7)',
                      fontSize: '0.9rem',
                      opacity: open ? 1 : 0,
                      transition: 'opacity 0.2s',
                    }
                  }}
                />
              </ListItemButton>
            </Tooltip>
          </ListItem>
        </List>
      </Box>
    </StyledDrawer>
  );
};

export default Sidebar;
