import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemAvatar, 
  Avatar, 
  Badge,
  Divider,
  IconButton,
  TextField,
  InputAdornment,
  Button,
  useTheme
} from '@mui/material';
import { 
  Notifications as NotificationsIcon,
  CheckCircleOutline as CheckCircleOutlineIcon,
  DeleteOutline as DeleteOutlineIcon,
  NotificationsNone as NotificationsNoneIcon,
  NotificationsActive as NotificationsActiveIcon,
  Assignment as AssignmentIcon,
  Group as GroupIcon,
  Search as SearchIcon
} from '@mui/icons-material';

const Notifications = () => {
  const theme = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [notifications, setNotifications] = useState([
    {
      id: 1,
      title: 'New task assigned',
      message: 'You have been assigned a new task: Complete project proposal',
      time: '10 minutes ago',
      read: false,
      type: 'task'
    },
    {
      id: 2,
      title: 'Team update',
      message: 'New team member John Doe has joined your team',
      time: '2 hours ago',
      read: true,
      type: 'team'
    },
    {
      id: 3,
      title: 'System maintenance',
      message: 'Scheduled maintenance this weekend',
      time: '1 day ago',
      read: true,
      type: 'system'
    }
  ]);

  const markAsRead = (id) => {
    setNotifications(notifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    ));
  };

  const clearAllNotifications = () => {
    setNotifications([]);
    // TODO: Add API call to clear notifications in the backend
  };

  const deleteNotification = (id) => {
    setNotifications(notifications.filter(notification => notification.id !== id));
    // TODO: Add API call to delete notification in the backend
  };

  const filteredNotifications = notifications.filter(notification => 
    notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    notification.message.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const markAllAsRead = () => {
    setNotifications(notifications.map(notification => ({
      ...notification,
      read: true
    })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Box sx={{ p: 3 }}>
      <Paper elevation={3} sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge badgeContent={unreadCount} color="error" sx={{ mr: 2 }}>
              <NotificationsIcon sx={{ fontSize: 32, color: theme.palette.primary.main }} />
            </Badge>
            <Typography variant="h5" component="h1" fontWeight="bold">
              Notifications
            </Typography>
          </Box>
          <TextField
            size="small"
            placeholder="Search notifications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 300 }}
          />
        </Box>
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="textSecondary">
            {unreadCount} unread {unreadCount === 1 ? 'notification' : 'notifications'}
          </Typography>
          {unreadCount > 0 && (
            <Button 
              onClick={markAllAsRead}
              size="small"
              startIcon={<CheckCircleOutlineIcon />}
              sx={{ textTransform: 'none' }}
            >
              Mark all as read
            </Button>
          )}
        </Box>
      </Paper>
      
      <Paper elevation={3} sx={{ p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Badge badgeContent={unreadCount} color="error">
              <NotificationsIcon sx={{ fontSize: 32, mr: 2, color: theme.palette.primary.main }} />
            </Badge>
            <Typography variant="h4" component="h1" fontWeight="bold">
              Notifications
            </Typography>
          </Box>
          {unreadCount > 0 && (
            <Box>
              <IconButton 
                onClick={markAllAsRead}
                color="primary"
                size="small"
                sx={{ textTransform: 'none' }}
              >
                <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                Mark all as read
              </IconButton>
            </Box>
          )}
        </Box>
        
        {filteredNotifications.length === 0 ? (
          <Box sx={{ p: 4, textAlign: 'center' }}>
            <NotificationsNoneIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="textSecondary">
              No notifications yet
            </Typography>
            <Typography variant="body2" color="textSecondary">
              When you get notifications, they'll appear here
            </Typography>
          </Box>
        ) : (
          <List disablePadding>
            {filteredNotifications.map((notification, index) => (
              <React.Fragment key={notification.id}>
                {index > 0 && <Divider />}
                <ListItem 
                  sx={{ 
                    bgcolor: notification.read ? 'background.paper' : 'action.hover',
                    transition: 'background-color 0.2s',
                    '&:hover': {
                      bgcolor: 'action.hover'
                    }
                  }}
                  secondaryAction={
                    <IconButton 
                      edge="end" 
                      aria-label="delete"
                      onClick={() => deleteNotification(notification.id)}
                      size="small"
                      sx={{ ml: 1 }}
                    >
                      <DeleteOutlineIcon fontSize="small" />
                    </IconButton>
                  }
                >
                  <ListItemAvatar>
                    <Avatar sx={{ bgcolor: theme.palette.primary.light }}>
                      {notification.type === 'task' ? (
                        <AssignmentIcon />
                      ) : notification.type === 'team' ? (
                        <GroupIcon />
                      ) : (
                        <NotificationsActiveIcon />
                      )}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Typography 
                          component="span" 
                          variant="subtitle1" 
                          sx={{ 
                            fontWeight: notification.read ? 'normal' : 'bold',
                            mr: 1
                          }}
                        >
                          {notification.title}
                        </Typography>
                        {!notification.read && (
                          <IconButton 
                            size="small" 
                            onClick={() => markAsRead(notification.id)}
                            sx={{ p: 0.5, ml: 'auto' }}
                          >
                            <CheckCircleOutlineIcon fontSize="small" />
                          </IconButton>
                        )}
                      </Box>
                    }
                    secondary={
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.primary"
                          display="block"
                          sx={{
                            textDecoration: notification.read ? 'none' : 'none',
                            color: notification.read ? 'text.primary' : 'text.primary'
                          }}
                        >
                          {notification.message}
                        </Typography>
                        <Typography
                          variant="caption"
                          color="text.secondary"
                          sx={{ display: 'block', mt: 0.5 }}
                        >
                          {notification.time}
                        </Typography>
                      </>
                    }
                  />
                </ListItem>
              </React.Fragment>
            ))}
          </List>
        )}
      </Paper>
    </Box>
  );
};

export default Notifications;
