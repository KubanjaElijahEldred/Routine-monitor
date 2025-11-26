import React, { useState, useEffect } from 'react';
import {
  Box,
  Snackbar,
  Alert,
  AlertTitle,
  IconButton,
  Typography,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Badge,
} from '@mui/material';
import {
  Notifications as NotificationsIcon,
  NotificationImportant as NotificationImportantIcon,
  Today as TodayIcon,
  Warning as WarningIcon,
  Close as CloseIcon,
  Schedule as ScheduleIcon,
} from '@mui/icons-material';

const TaskReminder = ({ tasks }) => {
  const [reminders, setReminders] = useState([]);
  const [showNotification, setShowNotification] = useState(false);
  const [currentReminder, setCurrentReminder] = useState(null);

  // Check for tasks with due dates and create reminders
  useEffect(() => {
    const checkReminders = () => {
      const now = new Date();
      const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const nextWeek = new Date(today);
      nextWeek.setDate(nextWeek.getDate() + 7);

      const newReminders = [];

      tasks.forEach(task => {
        if (task.dueDate && !task.completed) {
          const dueDate = new Date(task.dueDate);
          const daysUntilDue = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

          if (daysUntilDue < 0) {
            // Overdue
            newReminders.push({
              id: task.id,
              type: 'overdue',
              task: task,
              daysOverdue: Math.abs(daysUntilDue),
              message: `Task "${task.title}" is ${Math.abs(daysUntilDue)} day${Math.abs(daysUntilDue) > 1 ? 's' : ''} overdue`,
              severity: 'error'
            });
          } else if (daysUntilDue === 0) {
            // Due today
            newReminders.push({
              id: task.id,
              type: 'today',
              task: task,
              message: `Task "${task.title}" is due today`,
              severity: 'warning'
            });
          } else if (daysUntilDue === 1) {
            // Due tomorrow
            newReminders.push({
              id: task.id,
              type: 'tomorrow',
              task: task,
              message: `Task "${task.title}" is due tomorrow`,
              severity: 'info'
            });
          } else if (daysUntilDue <= 3) {
            // Due soon (within 3 days)
            newReminders.push({
              id: task.id,
              type: 'soon',
              task: task,
              daysUntilDue: daysUntilDue,
              message: `Task "${task.title}" is due in ${daysUntilDue} day${daysUntilDue > 1 ? 's' : ''}`,
              severity: 'info'
            });
          }
        }
      });

      // Sort by severity and date
      newReminders.sort((a, b) => {
        const severityOrder = { error: 0, warning: 1, info: 2 };
        if (severityOrder[a.severity] !== severityOrder[b.severity]) {
          return severityOrder[a.severity] - severityOrder[b.severity];
        }
        return a.daysUntilDue || a.daysOverdue || 0;
      });

      setReminders(newReminders);

      // Show notification for most urgent reminder
      if (newReminders.length > 0 && newReminders[0].severity === 'error') {
        setCurrentReminder(newReminders[0]);
        setShowNotification(true);
      }
    };

    checkReminders();
    const interval = setInterval(checkReminders, 60000); // Check every minute

    return () => clearInterval(interval);
  }, [tasks]);

  const getReminderIcon = (type) => {
    switch (type) {
      case 'overdue':
        return <WarningIcon color="error" />;
      case 'today':
        return <TodayIcon color="warning" />;
      case 'tomorrow':
        return <ScheduleIcon color="info" />;
      case 'soon':
        return <NotificationImportantIcon color="info" />;
      default:
        return <NotificationsIcon />;
    }
  };

  const getReminderColor = (severity) => {
    switch (severity) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      case 'info':
        return 'info';
      default:
        return 'default';
    }
  };

  const urgentReminders = reminders.filter(r => r.severity === 'error' || r.severity === 'warning');
  const otherReminders = reminders.filter(r => r.severity === 'info');

  if (reminders.length === 0) {
    return null;
  }

  return (
    <Box>
      {/* Reminder Summary Badge */}
      <Badge badgeContent={reminders.length} color={getReminderColor(reminders[0]?.severity)}>
        <NotificationsIcon />
      </Badge>

      {/* Urgent Notifications */}
      {urgentReminders.length > 0 && (
        <Box sx={{ mb: 2 }}>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Urgent Reminders
          </Typography>
          <List dense>
            {urgentReminders.map((reminder) => (
              <ListItem key={reminder.id} sx={{ pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {getReminderIcon(reminder.type)}
                </ListItemIcon>
                <ListItemText
                  primary={reminder.task.title}
                  secondary={reminder.message}
                  primaryTypographyProps={{
                    variant: 'body2',
                    sx: { fontWeight: reminder.severity === 'error' ? 'bold' : 'normal' }
                  }}
                  secondaryTypographyProps={{
                    variant: 'caption',
                    color: reminder.severity === 'error' ? 'error.main' : 'text.secondary'
                  }}
                />
                <Chip
                  label={reminder.type}
                  size="small"
                  color={getReminderColor(reminder.severity)}
                  variant="outlined"
                />
              </ListItem>
            ))}
          </List>
        </Box>
      )}

      {/* Other Reminders */}
      {otherReminders.length > 0 && (
        <Box>
          <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
            Upcoming Reminders
          </Typography>
          <List dense>
            {otherReminders.slice(0, 3).map((reminder) => (
              <ListItem key={reminder.id} sx={{ pl: 0 }}>
                <ListItemIcon sx={{ minWidth: 32 }}>
                  {getReminderIcon(reminder.type)}
                </ListItemIcon>
                <ListItemText
                  primary={reminder.task.title}
                  secondary={reminder.message}
                  primaryTypographyProps={{ variant: 'body2' }}
                  secondaryTypographyProps={{ variant: 'caption' }}
                />
              </ListItem>
            ))}
            {otherReminders.length > 3 && (
              <Typography variant="caption" color="text.secondary">
                +{otherReminders.length - 3} more reminders
              </Typography>
            )}
          </List>
        </Box>
      )}

      {/* Notification Snackbar */}
      <Snackbar
        open={showNotification}
        autoHideDuration={6000}
        onClose={() => setShowNotification(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        <Alert
          severity={currentReminder?.severity}
          onClose={() => setShowNotification(false)}
          sx={{ width: '100%' }}
        >
          <AlertTitle>Task Reminder</AlertTitle>
          {currentReminder?.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TaskReminder;
