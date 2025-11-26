import React, { useState, useEffect, useRef } from 'react';
import {
  Box,
  Button,
  Typography,
  IconButton,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Divider,
  CircularProgress,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  PlayArrow as PlayIcon,
  Pause as PauseIcon,
  Stop as StopIcon,
  Timer as TimerIcon,
  History as HistoryIcon,
  Delete as DeleteIcon,
  MoreVert as MoreVertIcon,
  AccessTime as TimeIcon,
} from '@mui/icons-material';

const TimeTracker = ({ taskId, taskTitle, timeEntries, onStartTimer, onStopTimer, onUpdateTimeEntry, onDeleteTimeEntry }) => {
  const [isRunning, setIsRunning] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [showTimeDialog, setShowTimeDialog] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const intervalRef = useRef(null);
  const startTimeRef = useRef(null);

  // Calculate total time for this task
  const taskTimeEntries = timeEntries.filter(entry => entry.taskId === taskId);
  const totalTime = taskTimeEntries.reduce((total, entry) => total + entry.duration, 0);

  // Find active timer entry
  const activeEntry = taskTimeEntries.find(entry => entry.isActive);

  useEffect(() => {
    if (activeEntry) {
      setIsRunning(true);
      startTimeRef.current = Date.now() - activeEntry.duration;
      intervalRef.current = setInterval(() => {
        setCurrentTime(Date.now() - startTimeRef.current);
      }, 1000);
    } else {
      setIsRunning(false);
      setCurrentTime(0);
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [activeEntry]);

  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    if (!isRunning) {
      onStartTimer(taskId);
    }
  };

  const handleStop = () => {
    if (isRunning && activeEntry) {
      onStopTimer(taskId, activeEntry.id);
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const getTotalTimeToday = () => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    return taskTimeEntries
      .filter(entry => {
        const entryDate = new Date(entry.startTime);
        return entryDate >= today && entryDate < tomorrow;
      })
      .reduce((total, entry) => total + entry.duration, 0);
  };

  const getRecentEntries = () => {
    return taskTimeEntries
      .filter(entry => !entry.isActive)
      .sort((a, b) => new Date(b.startTime) - new Date(a.startTime))
      .slice(0, 5);
  };

  return (
    <Box>
      {/* Time Tracker Button */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        <Badge
          badgeContent={isRunning ? '⚡' : 0}
          color={isRunning ? 'success' : 'default'}
          overlap="circular"
        >
          <Button
            size="small"
            variant={isRunning ? 'contained' : 'outlined'}
            color={isRunning ? 'success' : 'primary'}
            startIcon={isRunning ? <PauseIcon /> : <PlayIcon />}
            onClick={isRunning ? handleStop : handleStart}
            sx={{ minWidth: 'auto', px: 1 }}
          >
            {formatTime(isRunning ? currentTime : totalTime)}
          </Button>
        </Badge>
        
        <IconButton size="small" onClick={handleMenuClick}>
          <MoreVertIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Time Tracker Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={() => {
          setShowTimeDialog(true);
          handleMenuClose();
        }}>
          <TimerIcon fontSize="small" sx={{ mr: 1 }} />
          View Time Details
        </MenuItem>
        <MenuItem disabled>
          <HistoryIcon fontSize="small" sx={{ mr: 1 }} />
          Time History
        </MenuItem>
      </Menu>

      {/* Time Details Dialog */}
      <Dialog 
        open={showTimeDialog} 
        onClose={() => setShowTimeDialog(false)} 
        maxWidth="sm" 
        fullWidth
      >
        <DialogTitle>
          <Typography variant="h6">
            Time Tracking: {taskTitle}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {/* Current Session */}
          {isRunning && (
            <Box sx={{ mb: 3, p: 2, backgroundColor: 'success.light', borderRadius: 1 }}>
              <Typography variant="subtitle2" color="success.dark" gutterBottom>
                Current Session
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Typography variant="h4" color="success.dark">
                  {formatTime(currentTime)}
                </Typography>
                <Button
                  variant="contained"
                  color="success"
                  startIcon={<StopIcon />}
                  onClick={handleStop}
                >
                  Stop Timer
                </Button>
              </Box>
            </Box>
          )}

          {/* Time Statistics */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="subtitle2" gutterBottom>
              Time Statistics
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <Box sx={{ flex: 1, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Total Time
                </Typography>
                <Typography variant="h6">
                  {formatTime(totalTime)}
                </Typography>
              </Box>
              <Box sx={{ flex: 1, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
                <Typography variant="caption" color="text.secondary">
                  Today
                </Typography>
                <Typography variant="h6">
                  {formatTime(getTotalTimeToday())}
                </Typography>
              </Box>
            </Box>
          </Box>

          {/* Recent Entries */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Recent Time Entries
            </Typography>
            {getRecentEntries().length === 0 ? (
              <Box sx={{ p: 2, textAlign: 'center', color: 'text.secondary' }}>
                <TimeIcon sx={{ fontSize: 48, mb: 1 }} />
                <Typography variant="body2">
                  No time entries yet
                </Typography>
              </Box>
            ) : (
              <List dense>
                {getRecentEntries().map((entry) => (
                  <ListItem
                    key={entry.id}
                    secondaryAction={
                      <IconButton
                        edge="end"
                        size="small"
                        onClick={() => onDeleteTimeEntry(entry.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    }
                  >
                    <ListItemIcon>
                      <TimerIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText
                      primary={formatTime(entry.duration)}
                      secondary={`${new Date(entry.startTime).toLocaleString()} - ${new Date(entry.endTime).toLocaleString()}`}
                      primaryTypographyProps={{ variant: 'body2' }}
                      secondaryTypographyProps={{ variant: 'caption' }}
                    />
                  </ListItem>
                ))}
              </List>
            )}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowTimeDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TimeTracker;
