import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  LinearProgress,
  Avatar,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Switch,
  FormControlLabel,
} from '@mui/material';
import {
  Add,
  CheckCircle,
  RadioButtonUnchecked,
  Delete,
  Edit,
  TrendingUp,
  Fire,
  CalendarToday,
  EmojiEvents,
  Psychology,
  FitnessCenter,
  LocalCafe,
  Book,
  Code,
  Music,
} from '@mui/icons-material';

const habitIcons = {
  'Health & Fitness': FitnessCenter,
  'Mindfulness': Psychology,
  'Learning': Book,
  'Productivity': Code,
  'Creativity': Music,
  'Lifestyle': LocalCafe,
};

const habitColors = {
  'Health & Fitness': '#10b981',
  'Mindfulness': '#8b5cf6',
  'Learning': '#3b82f6',
  'Productivity': '#2563eb',
  'Creativity': '#ec4899',
  'Lifestyle': '#06b6d4',
};

const HabitTracker = () => {
  const [habits, setHabits] = useState([
    {
      id: 1,
      name: 'Morning Exercise',
      category: 'Health & Fitness',
      streak: 7,
      completed: true,
      targetDays: 30,
      completedDays: 7,
      time: '07:00 AM',
      reminder: true,
    },
    {
      id: 2,
      name: 'Meditation',
      category: 'Mindfulness',
      streak: 14,
      completed: false,
      targetDays: 30,
      completedDays: 14,
      time: '06:30 AM',
      reminder: true,
    },
    {
      id: 3,
      name: 'Read for 30 minutes',
      category: 'Learning',
      streak: 3,
      completed: false,
      targetDays: 30,
      completedDays: 3,
      time: '09:00 PM',
      reminder: false,
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingHabit, setEditingHabit] = useState(null);
  const [newHabit, setNewHabit] = useState({
    name: '',
    category: 'Health & Fitness',
    targetDays: 30,
    time: '07:00 AM',
    reminder: true,
  });

  const [stats, setStats] = useState({
    totalHabits: 3,
    completedToday: 1,
    currentStreak: 7,
    longestStreak: 14,
    completionRate: 78,
  });

  const handleCompleteHabit = (habitId) => {
    setHabits(habits.map(habit => 
      habit.id === habitId 
        ? { ...habit, completed: !habit.completed, streak: habit.completed ? Math.max(0, habit.streak - 1) : habit.streak + 1 }
        : habit
    ));
    
    const completedCount = habits.filter(h => h.id === habitId ? !h.completed : h.completed).length;
    setStats(prev => ({
      ...prev,
      completedToday: completedCount + (habits.find(h => h.id === habitId)?.completed ? -1 : 1),
    }));
  };

  const handleAddHabit = () => {
    if (editingHabit) {
      setHabits(habits.map(habit => 
        habit.id === editingHabit.id 
          ? { ...habit, ...newHabit, streak: 0, completedDays: 0, completed: false }
          : habit
      ));
    } else {
      const habit = {
        id: Date.now(),
        ...newHabit,
        streak: 0,
        completedDays: 0,
        completed: false,
      };
      setHabits([...habits, habit]);
      setStats(prev => ({ ...prev, totalHabits: prev.totalHabits + 1 }));
    }
    
    setNewHabit({
      name: '',
      category: 'Health & Fitness',
      targetDays: 30,
      time: '07:00 AM',
      reminder: true,
    });
    setEditingHabit(null);
    setOpenDialog(false);
  };

  const handleEditHabit = (habit) => {
    setEditingHabit(habit);
    setNewHabit({
      name: habit.name,
      category: habit.category,
      targetDays: habit.targetDays,
      time: habit.time,
      reminder: habit.reminder,
    });
    setOpenDialog(true);
  };

  const handleDeleteHabit = (habitId) => {
    setHabits(habits.filter(habit => habit.id !== habitId));
    setStats(prev => ({ ...prev, totalHabits: prev.totalHabits - 1 }));
  };

  const getCompletionPercentage = (habit) => {
    return Math.round((habit.completedDays / habit.targetDays) * 100);
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Habit Tracker
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 3 }}
        >
          Add Habit
        </Button>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Fire sx={{ mr: 1 }} />
                <Typography variant="h6">Current Streak</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold">{stats.currentStreak} days</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <TrendingUp sx={{ mr: 1 }} />
                <Typography variant="h6">Completion Rate</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold">{stats.completionRate}%</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <CheckCircle sx={{ mr: 1 }} />
                <Typography variant="h6">Completed Today</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold">{stats.completedToday}/{stats.totalHabits}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ background: 'linear-gradient(135deg, #1d4ed8 0%, #60a5fa 100%)', color: 'white' }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <EmojiEvents sx={{ mr: 1 }} />
                <Typography variant="h6">Longest Streak</Typography>
              </Box>
              <Typography variant="h3" fontWeight="bold">{stats.longestStreak} days</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Habits List */}
      <Grid container spacing={3}>
        {habits.map((habit) => {
          const IconComponent = habitIcons[habit.category] || CalendarToday;
          const categoryColor = habitColors[habit.category] || '#6366f1';
          
          return (
            <Grid item xs={12} md={6} lg={4} key={habit.id}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: categoryColor, mr: 2 }}>
                        <IconComponent />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {habit.name}
                        </Typography>
                        <Chip
                          label={habit.category}
                          size="small"
                          sx={{
                            bgcolor: categoryColor,
                            color: 'white',
                            fontWeight: 600,
                            mt: 0.5,
                          }}
                        />
                      </Box>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditHabit(habit)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteHabit(habit.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress: {habit.completedDays}/{habit.targetDays} days
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {getCompletionPercentage(habit)}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={getCompletionPercentage(habit)}
                      sx={{
                        height: 8,
                        borderRadius: 4,
                        bgcolor: 'grey.200',
                        '& .MuiLinearProgress-bar': {
                          background: `linear-gradient(90deg, ${categoryColor}, ${categoryColor}dd)`,
                        },
                      }}
                    />
                  </Box>

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body2" color="text.secondary" sx={{ mr: 1 }}>
                        🕐 {habit.time}
                      </Typography>
                      <Chip
                        icon={<Fire />}
                        label={`${habit.streak} day streak`}
                        size="small"
                        color="primary"
                        variant="outlined"
                      />
                    </Box>
                    <IconButton
                      onClick={() => handleCompleteHabit(habit.id)}
                      sx={{
                        color: habit.completed ? 'success.main' : 'grey.400',
                      }}
                    >
                      {habit.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add/Edit Habit Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>{editingHabit ? 'Edit Habit' : 'Add New Habit'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Habit Name"
              value={newHabit.name}
              onChange={(e) => setNewHabit({ ...newHabit, name: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={newHabit.category}
                onChange={(e) => setNewHabit({ ...newHabit, category: e.target.value })}
              >
                {Object.keys(habitIcons).map((category) => (
                  <MenuItem key={category} value={category}>
                    {category}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              fullWidth
              label="Target Days"
              type="number"
              value={newHabit.targetDays}
              onChange={(e) => setNewHabit({ ...newHabit, targetDays: parseInt(e.target.value) })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Time"
              value={newHabit.time}
              onChange={(e) => setNewHabit({ ...newHabit, time: e.target.value })}
              sx={{ mb: 2 }}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={newHabit.reminder}
                  onChange={(e) => setNewHabit({ ...newHabit, reminder: e.target.checked })}
                />
              }
              label="Enable Reminder"
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddHabit} variant="contained">
            {editingHabit ? 'Update' : 'Add'} Habit
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default HabitTracker;
