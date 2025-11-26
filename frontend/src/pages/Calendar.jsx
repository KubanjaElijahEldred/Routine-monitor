import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  IconButton,
  useTheme,
  Chip,
  List,
  ListItem,
  ListItemText,
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from '@mui/material';
import {
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  Today as TodayIcon,
  Add as AddIcon,
  Event as EventIcon,
  AccessTime as TimeIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/common/PageHeader';

const Calendar = () => {
  const theme = useTheme();
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState('month');
  const [openDialog, setOpenDialog] = useState(false);
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      date: new Date(2024, 0, 15),
      time: '10:00 AM',
      location: 'Conference Room A',
      type: 'meeting',
      description: 'Weekly team sync to discuss project progress'
    },
    {
      id: 2,
      title: 'Project Deadline',
      date: new Date(2024, 0, 20),
      time: '11:59 PM',
      location: 'Online',
      type: 'deadline',
      description: 'Submit final project deliverables'
    },
    {
      id: 3,
      title: 'Client Presentation',
      date: new Date(2024, 0, 25),
      time: '2:00 PM',
      location: 'Client Office',
      type: 'presentation',
      description: 'Quarterly results presentation'
    },
    {
      id: 4,
      title: 'Team Building Event',
      date: new Date(2024, 0, 28),
      time: '3:00 PM',
      location: 'Office',
      type: 'event',
      description: 'Monthly team building activities'
    },
  ]);

  const [newEvent, setNewEvent] = useState({
    title: '',
    date: selectedDate,
    time: '',
    location: '',
    type: 'meeting',
    description: ''
  });

  const getDaysInMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  };

  const getFirstDayOfMonth = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), 1).getDay();
  };

  const generateCalendarDays = () => {
    const daysInMonth = getDaysInMonth(currentDate);
    const firstDay = getFirstDayOfMonth(currentDate);
    const days = [];

    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      days.push(i);
    }

    return days;
  };

  const navigateMonth = (direction) => {
    const newDate = new Date(currentDate);
    if (direction === 'prev') {
      newDate.setMonth(newDate.getMonth() - 1);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    setCurrentDate(newDate);
  };

  const handleDateClick = (day) => {
    const newSelectedDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    setSelectedDate(newSelectedDate);
  };

  const getEventsForDate = (date) => {
    return events.filter(event => 
      event.date.toDateString() === date.toDateString()
    );
  };

  const handleAddEvent = () => {
    if (newEvent.title && newEvent.time) {
      const event = {
        id: events.length + 1,
        ...newEvent,
        date: new Date(newEvent.date)
      };
      setEvents([...events, event]);
      setNewEvent({
        title: '',
        date: selectedDate,
        time: '',
        location: '',
        type: 'meeting',
        description: ''
      });
      setOpenDialog(false);
    }
  };

  const getEventColor = (type) => {
    switch (type) {
      case 'meeting': return '#FF6B6B';
      case 'deadline': return '#FF9E80';
      case 'presentation': return '#4ECDC4';
      case 'event': return '#6C63FF';
      default: return theme.palette.primary.main;
    }
  };

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const CalendarDay = ({ day, isCurrentMonth, isSelected }) => {
    const date = new Date(currentDate.getFullYear(), currentDate.getMonth(), day);
    const dayEvents = day ? getEventsForDate(date) : [];
    const isToday = day && date.toDateString() === new Date().toDateString();

    return (
      <Card
        sx={{
          minHeight: 100,
          cursor: 'pointer',
          backgroundColor: isSelected ? theme.palette.primary.light : 'white',
          border: isSelected ? `2px solid ${theme.palette.primary.main}` : '1px solid #e0e0e0',
          '&:hover': {
            backgroundColor: theme.palette.action.hover,
          },
          opacity: isCurrentMonth ? 1 : 0.5,
        }}
        onClick={() => day && handleDateClick(day)}
      >
        <CardContent sx={{ p: 1, '&:last-child': { pb: 1 } }}>
          {day && (
            <>
              <Typography
                variant="body2"
                sx={{
                  fontWeight: isToday ? 'bold' : 'normal',
                  color: isToday ? theme.palette.primary.main : 'text.primary',
                  mb: 1
                }}
              >
                {day}
              </Typography>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                {dayEvents.slice(0, 2).map((event) => (
                  <Chip
                    key={event.id}
                    label={event.title}
                    size="small"
                    sx={{
                      backgroundColor: getEventColor(event.type),
                      color: 'white',
                      fontSize: '0.7rem',
                      height: 20,
                      '& .MuiChip-label': {
                        padding: '0 4px',
                      }
                    }}
                  />
                ))}
                {dayEvents.length > 2 && (
                  <Typography variant="caption" color="text.secondary">
                    +{dayEvents.length - 2} more
                  </Typography>
                )}
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <PageLayout>
      <PageHeader
        title="Calendar"
        subtitle="Manage your schedule and events"
        actions={
          <>
            <FormControl size="small" sx={{ mr: 2, minWidth: 120 }}>
              <InputLabel>View</InputLabel>
              <Select
                value={viewMode}
                label="View"
                onChange={(e) => setViewMode(e.target.value)}
              >
                <MenuItem value="month">Month</MenuItem>
                <MenuItem value="week">Week</MenuItem>
                <MenuItem value="day">Day</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => setOpenDialog(true)}
            >
              Add Event
            </Button>
          </>
        }
      />

      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          {/* Calendar Grid */}
          <Grid>
            <Paper sx={{ p: 2 }}>
              {/* Month Navigation */}
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <IconButton onClick={() => navigateMonth('prev')}>
                  <ChevronLeftIcon />
                </IconButton>
                <Typography variant="h5" fontWeight="bold">
                  {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
                </Typography>
                <IconButton onClick={() => navigateMonth('next')}>
                  <ChevronRightIcon />
                </IconButton>
              </Box>

              {/* Day Headers */}
              <Grid container spacing={1} sx={{ mb: 1 }}>
                {dayNames.map((day) => (
                  <Grid key={day}>
                    <Typography variant="body2" fontWeight="bold" textAlign="center">
                      {day}
                    </Typography>
                  </Grid>
                ))}
              </Grid>

              {/* Calendar Days */}
              <Grid container spacing={1}>
                {generateCalendarDays().map((day, index) => (
                  <Grid key={index}>
                    <CalendarDay
                      day={day}
                      isCurrentMonth={day !== null}
                      isSelected={day && selectedDate.toDateString() === new Date(currentDate.getFullYear(), currentDate.getMonth(), day).toDateString()}
                    />
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Events Sidebar */}
          <Grid>
            <Paper sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                Events for {selectedDate.toLocaleDateString()}
              </Typography>
              
              {getEventsForDate(selectedDate).length === 0 ? (
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  <EventIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
                  <Typography color="text.secondary">
                    No events scheduled for this date
                  </Typography>
                </Box>
              ) : (
                <List>
                  {getEventsForDate(selectedDate).map((event) => (
                    <React.Fragment key={event.id}>
                      <ListItem sx={{ flexDirection: 'column', alignItems: 'flex-start', p: 2 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                          <Chip
                            label={event.type}
                            size="small"
                            sx={{
                              backgroundColor: getEventColor(event.type),
                              color: 'white',
                              mr: 1
                            }}
                          />
                          <Typography variant="subtitle1" fontWeight="bold">
                            {event.title}
                          </Typography>
                        </Box>
                        
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                          <TimeIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                          <Typography variant="body2" color="text.secondary">
                            {event.time}
                          </Typography>
                        </Box>
                        
                        {event.location && (
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                            <LocationOn sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                            <Typography variant="body2" color="text.secondary">
                              {event.location}
                            </Typography>
                          </Box>
                        )}
                        
                        <Typography variant="body2" color="text.secondary">
                          {event.description}
                        </Typography>
                      </ListItem>
                      <Divider />
                    </React.Fragment>
                  ))}
                </List>
              )}
            </Paper>
          </Grid>
        </Grid>
      </Box>

      {/* Add Event Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Add New Event</DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Event Title"
              fullWidth
              value={newEvent.title}
              onChange={(e) => setNewEvent({ ...newEvent, title: e.target.value })}
            />
            
            <TextField
              label="Date"
              type="date"
              fullWidth
              value={newEvent.date.toISOString().split('T')[0]}
              onChange={(e) => setNewEvent({ ...newEvent, date: new Date(e.target.value) })}
            />
            
            <TextField
              label="Time"
              type="time"
              fullWidth
              value={newEvent.time}
              onChange={(e) => setNewEvent({ ...newEvent, time: e.target.value })}
            />
            
            <TextField
              label="Location"
              fullWidth
              value={newEvent.location}
              onChange={(e) => setNewEvent({ ...newEvent, location: e.target.value })}
            />
            
            <FormControl fullWidth>
              <InputLabel>Event Type</InputLabel>
              <Select
                value={newEvent.type}
                label="Event Type"
                onChange={(e) => setNewEvent({ ...newEvent, type: e.target.value })}
              >
                <MenuItem value="meeting">Meeting</MenuItem>
                <MenuItem value="deadline">Deadline</MenuItem>
                <MenuItem value="presentation">Presentation</MenuItem>
                <MenuItem value="event">Event</MenuItem>
              </Select>
            </FormControl>
            
            <TextField
              label="Description"
              multiline
              rows={3}
              fullWidth
              value={newEvent.description}
              onChange={(e) => setNewEvent({ ...newEvent, description: e.target.value })}
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddEvent} variant="contained">Add Event</Button>
        </DialogActions>
      </Dialog>
    </PageLayout>
  );
};

export default Calendar;
