import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  CardActions,
  CircularProgress,
  IconButton,
  Button,
  Avatar,
  Stack,
  Divider,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Menu,
  MenuItem,
  Tooltip
} from '@mui/material';
import {
  LocalFireDepartment as FireIcon,
  DirectionsRun as RunIcon,
  Favorite as HeartIcon,
  WaterDrop as WaterIcon,
  ChevronRight as ChevronRightIcon,
  MoreVert as MoreVertIcon,
  FitnessCenter as FitnessCenterIcon,
  AccessTime as TimeIcon,
  Whatshot as WhatshotIcon,
  EmojiEvents as TrophyIcon,
  Person as PersonIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useAppContext } from '../contexts/AppContext';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/common/PageHeader';

// StatCard component with CRUD operations
const StatCard = ({ title, value, color, unit, onEdit, onDelete, trend }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  
  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        background: `linear-gradient(135deg, ${color}dd, ${color})`,
        color: 'white',
        position: 'relative',
        overflow: 'visible',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 12px 40px rgba(0,0,0,0.2)',
        },
      }}
    >
      <CardContent sx={{ pb: 1 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <Box>
            <Typography variant="h6" fontWeight="bold" sx={{ mb: 1 }}>
              {title}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline', mb: 1 }}>
              <Typography variant="h3" fontWeight="bold" sx={{ mr: 1 }}>
                {value}
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.8 }}>
                {unit}
              </Typography>
            </Box>
            {trend && (
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography variant="body2" sx={{ mr: 1 }}>
                  {trend > 0 ? '+' : ''}{trend}%
                </Typography>
                <Icon sx={{ fontSize: 16, color: trend > 0 ? 'success.light' : 'error.light' }} />
              </Box>
            )}
          </Box>
          <Avatar 
            sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)',
              color: 'white',
              width: 56,
              height: 56,
            }}
          >
            <FireIcon sx={{ fontSize: 32 }} />
          </Avatar>
        </Box>
      </CardContent>
      {(onEdit || onDelete) && (
        <CardActions sx={{ justifyContent: 'flex-end', pt: 0 }}>
          <IconButton size="small" onClick={handleMenuClick} sx={{ color: 'white' }}>
            <MoreVertIcon />
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleMenuClose}
          >
            {onEdit && (
              <MenuItem onClick={() => { onEdit(); handleMenuClose(); }}>
                <EditIcon sx={{ mr: 1 }} /> Edit
              </MenuItem>
            )}
            {onDelete && (
              <MenuItem onClick={() => { onDelete(); handleMenuClose(); }}>
                <DeleteIcon sx={{ mr: 1 }} /> Delete
              </MenuItem>
            )}
          </Menu>
        </CardActions>
      )}
    </Card>
  );
};

const ActivityItem = ({ title, time, value, color }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 1, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
    <Box sx={{
      width: 40,
      height: 40,
      borderRadius: '12px',
      bgcolor: `${color}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mr: 2,
      color: color
    }}>
      <Typography variant="h6" fontWeight="bold">
        {title.charAt(0)}
      </Typography>
    </Box>
    <Box sx={{ flex: 1 }}>
      <Typography variant="subtitle2" fontWeight="medium">{title}</Typography>
      <Typography variant="caption" color="text.secondary">{time}</Typography>
    </Box>
    <Typography variant="subtitle2" fontWeight="bold" color={color}>
      {value}
    </Typography>
  </Box>
);

const Dashboard = () => {
  const { tasks, addTask } = useAppContext();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newTask, setNewTask] = useState({
    title: '',
    status: 'To Monitor',
    priority: 'Medium'
  });

  const stats = {
    calories: { value: '2,450', unit: 'kcal', trend: 12 },
    steps: { value: '12,548', unit: 'steps', trend: 8 },
    heartRate: { value: '128', unit: 'bpm', trend: -2 },
    water: { value: '2.5', unit: 'L', trend: 15 },
  };

  const activities = [
    { id: 1, title: 'Morning Run', time: 'Today, 07:30 AM', value: '5.2 km', icon: RunIcon, color: '#2563eb' },
    { id: 2, title: 'Weight Training', time: 'Today, 06:15 AM', value: '45 min', icon: FitnessCenterIcon, color: '#3b82f6' },
    { id: 3, title: 'Water Intake', time: 'Today, 03:45 PM', value: '1.2 L', icon: WaterIcon, color: '#1d4ed8' },
  ];

  const workoutPlan = {
    title: 'Full Body Workout',
    time: '45 min',
    calories: '320',
    exercises: [
      { name: 'Warm Up', time: '5 min' },
      { name: 'Jumping Jacks', time: '1 min' },
      { name: 'Push Ups', time: '3 x 12' },
      { name: 'Squats', time: '3 x 15' },
      { name: 'Plank', time: '1 min' },
      { name: 'Cool Down', time: '5 min' },
    ],
  };

  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        // TODO: Replace with actual API call
        // const response = await fetch('/api/fitness-stats');
        // const data = await response.json();
        // setStats(data.stats);
        // setActivities(data.activities);
        // setWorkoutPlan(data.workoutPlan);
      } catch (error) {
        console.error('Error fetching fitness data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRefresh = () => {
    setRefreshing(true);
    // TODO: Replace with actual refresh logic
    // fetchData().finally(() => setRefreshing(false));
    setTimeout(() => {
      setRefreshing(false);
    }, 500);
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: 'calc(100vh - 200px)' 
      }}>
        <CircularProgress />
      </Box>
    );
  }

  const handleAddTask = () => {
    if (newTask.title.trim()) {
      addTask(newTask);
      setNewTask({ title: '', status: 'To Monitor', priority: 'Medium' });
      setIsAddDialogOpen(false);
    }
  };

  const handleUpdateStat = (statType, value) => {
    // This is where you'd update the stats in your state
    console.log(`Updating ${statType} to ${value}`);
  };

  return (
    <PageLayout>
      <Box sx={{ flexGrow: 1, p: 3 }}>
        <PageHeader 
          title="Dashboard Overview" 
          subtitle="Track your fitness progress and activities"
          actions={
            <>
              <Button 
                variant="outlined" 
                color="primary" 
                startIcon={<RefreshIcon />}
                onClick={handleRefresh}
                sx={{ mr: 1 }}
              >
                Refresh
              </Button>
              <Button 
                variant="contained" 
                color="primary" 
                startIcon={<AddIcon />}
                onClick={() => setIsAddDialogOpen(true)}
              >
                Add Task
              </Button>
            </>
          }
        />
        {/* Header */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4
        }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ 
              fontSize: { xs: '1.5rem', sm: '2rem' },
              background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              display: 'inline-block',
              fontFamily: '"Poppins", sans-serif'
            }}>
              FitTrack
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
              Welcome back, Alex!
            </Typography>
          </Box>
          <Avatar sx={{ bgcolor: 'primary.main', width: 48, height: 48 }}>
            <PersonIcon />
          </Avatar>
        </Box>

        {/* Header with Add Button */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ 
            fontSize: { xs: '1.5rem', sm: '2rem' },
            background: 'linear-gradient(90deg, #2563eb 0%, #3b82f6 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            display: 'inline-block',
          }}>
            Dashboard
          </Typography>
          <Button 
            variant="contained" 
            startIcon={<AddIcon />}
            onClick={() => setIsAddDialogOpen(true)}
            sx={{ 
              bgcolor: 'primary.main',
              '&:hover': {
                bgcolor: 'primary.dark',
                transform: 'translateY(-2px)'
              },
              transition: 'all 0.3s ease-in-out',
              boxShadow: 2
            }}
          >
            Add Task
          </Button>
        </Box>

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Calories" 
              value={stats.calories.value} 
              color="#2563eb" 
              unit={stats.calories.unit}
              trend={stats.calories.trend}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Steps" 
              value={stats.steps.value} 
              color="#3b82f6" 
              unit={stats.steps.unit}
              trend={stats.steps.trend}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Heart Rate" 
              value={stats.heartRate.value} 
              color="#1d4ed8" 
              unit={stats.heartRate.unit}
              trend={stats.heartRate.trend}
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Water Intake" 
              value={stats.water.value} 
              color="#60a5fa" 
              unit={stats.water.unit}
              trend={stats.water.trend}
            />
          </Grid>
        </Grid>

        {/* Workout Plan */}
        <Card sx={{ 
          mb: 3, 
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          background: 'white',
          overflow: 'hidden'
        }}>
          <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Typography variant="h6" fontWeight="bold">Today's Workout</Typography>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>Full Body Workout</Typography>
              </Box>
              <Box sx={{ 
                bgcolor: 'rgba(255,255,255,0.2)', 
                px: 1.5, 
                py: 0.5, 
                borderRadius: 4,
                display: 'flex',
                alignItems: 'center'
              }}>
                <TimeIcon sx={{ fontSize: 16, mr: 0.5 }} />
                <Typography variant="caption">45 min</Typography>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ p: 2 }}>
            {workoutPlan.exercises.map((exercise, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 1.5,
                borderBottom: index !== workoutPlan.exercises.length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none'
              }}>
                <Typography>{exercise.name}</Typography>
                <Typography variant="body2" color="text.secondary">{exercise.time}</Typography>
              </Box>
            ))}
            
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Activities
                </Typography>
                {activities.map((activity) => (
                  <ActivityItem
                    key={activity.id}
                    title={activity.title}
                    time={activity.time}
                    value={activity.value}
                    color={activity.color}
                  />
                ))}
              </Box>
            )}
          </Box>
        </Card>
      </Box>
    </PageLayout>
  );
};

export default Dashboard;
