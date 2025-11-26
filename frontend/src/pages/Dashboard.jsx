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
  Tooltip,
  Chip
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
  Refresh as RefreshIcon,
  TrendingUp,
  SportsBasketball as BasketballIcon,
  SportsSoccer as SoccerIcon,
  SportsTennis as TennisIcon,
  SportsVolleyball as VolleyballIcon,
  Pool as SwimmingIcon,
  DirectionsBike as CyclingIcon,
  SelfImprovement as YogaIcon,
  SportsMartialArts as MartialArtsIcon,
  SportsHandball as HandballIcon,
  SportsHockey as HockeyIcon,
  Star as StarIcon,
  MilitaryTech as MedalIcon,
  Speed as SpeedIcon,
  Timer as TimerIcon
} from '@mui/icons-material';
import { useAppContext } from '../contexts/AppContext';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/common/PageHeader';
import TaskSearchFilter from '../components/tasks/TaskSearchFilter';

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
                <TrendingUp sx={{ fontSize: 16, color: trend > 0 ? 'success.light' : 'error.light' }} />
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

const ActivityItem = ({ title, time, value, color, sport, duration, calories, icon, pace, shots, speed, rallies }) => (
  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, p: 2, borderRadius: 2, '&:hover': { bgcolor: 'action.hover' } }}>
    <Box sx={{
      width: 48,
      height: 48,
      borderRadius: '12px',
      bgcolor: `${color}20`,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      mr: 2,
      color: color
    }}>
      {icon ? React.createElement(icon, { sx: { fontSize: 24 } }) : 
        <Typography variant="h6" fontWeight="bold">
          {title.charAt(0)}
        </Typography>
      }
    </Box>
    <Box sx={{ flex: 1 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
        <Typography variant="subtitle2" fontWeight="medium" sx={{ mr: 1 }}>
          {title}
        </Typography>
        <Chip 
          label={sport} 
          size="small" 
          sx={{ 
            bgcolor: `${color}20`, 
            color: color,
            fontSize: '0.7rem',
            height: 20
          }} 
        />
      </Box>
      <Typography variant="caption" color="text.secondary">
        {time}
      </Typography>
      <Box sx={{ display: 'flex', gap: 1, mt: 0.5 }}>
        {duration && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <TimerIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{duration}</Typography>
          </Box>
        )}
        {calories && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <FireIcon sx={{ fontSize: 14, mr: 0.5, color: 'text.secondary' }} />
            <Typography variant="caption" color="text.secondary">{calories} kcal</Typography>
          </Box>
        )}
        {pace && (
          <Typography variant="caption" color="text.secondary">Pace: {pace}</Typography>
        )}
        {shots && (
          <Typography variant="caption" color="text.secondary">Shots: {shots}</Typography>
        )}
        {speed && (
          <Typography variant="caption" color="text.secondary">Speed: {speed}</Typography>
        )}
        {rallies && (
          <Typography variant="caption" color="text.secondary">Rallies: {rallies}</Typography>
        )}
      </Box>
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
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all',
    labels: [],
    dateRange: 'all',
    hasSubtasks: 'all',
    timeTracked: 'all'
  });

  const stats = {
    calories: { value: '2,450', unit: 'kcal', trend: 12, icon: FireIcon },
    distance: { value: '32.5', unit: 'km', trend: 8, icon: RunIcon },
    heartRate: { value: '128', unit: 'bpm', trend: -2, icon: HeartIcon },
    workouts: { value: '6', unit: 'sessions', trend: 15, icon: TrophyIcon },
  };

  const activities = [
    { 
      id: 1, 
      title: 'Morning Run', 
      time: 'Today, 07:30 AM', 
      value: '5.2 km', 
      icon: RunIcon, 
      color: '#2563eb',
      sport: 'Running',
      duration: '32 min',
      calories: 320,
      pace: '6:10 /km'
    },
    { 
      id: 2, 
      title: 'Basketball Training', 
      time: 'Today, 06:15 AM', 
      value: '45 min', 
      icon: BasketballIcon, 
      color: '#ff6b35',
      sport: 'Basketball',
      duration: '45 min',
      calories: 380,
      shots: '85% accuracy'
    },
    { 
      id: 3, 
      title: 'Swimming Session', 
      time: 'Today, 03:45 PM', 
      value: '1.2 km', 
      icon: SwimmingIcon, 
      color: '#00bcd4',
      sport: 'Swimming',
      duration: '28 min',
      calories: 250,
      strokes: 'Freestyle'
    },
    { 
      id: 4, 
      title: 'Cycling', 
      time: 'Yesterday, 05:00 PM', 
      value: '15.8 km', 
      icon: CyclingIcon, 
      color: '#4caf50',
      sport: 'Cycling',
      duration: '42 min',
      calories: 420,
      speed: '22.5 km/h'
    },
    { 
      id: 5, 
      title: 'Tennis Practice', 
      time: 'Yesterday, 10:00 AM', 
      value: '1.5 hrs', 
      icon: TennisIcon, 
      color: '#9c27b0',
      sport: 'Tennis',
      duration: '90 min',
      calories: 520,
      rallies: '245 total'
    }
  ];

  const workoutPlan = {
    title: 'Athletic Performance Training',
    time: '60 min',
    calories: '450',
    sport: 'Cross-Training',
    exercises: [
      { name: 'Dynamic Warm-up', time: '10 min', type: 'Preparation' },
      { name: 'Plyometric Jumps', time: '3 x 15', type: 'Power' },
      { name: 'Agility Ladder', time: '5 min', type: 'Speed' },
      { name: 'Core Circuit', time: '3 x 20', type: 'Strength' },
      { name: 'Sprint Intervals', time: '8 x 100m', type: 'Speed' },
      { name: 'Cool Down & Stretch', time: '10 min', type: 'Recovery' },
    ],
  };

  // Filter activities based on search query
  const filteredActivities = activities.filter(activity =>
    activity.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    activity.time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter tasks based on search query
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.status.toLowerCase().includes(searchQuery.toLowerCase()) ||
    task.priority?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter stats based on search query
  const filteredStats = Object.entries(stats).filter(([key, stat]) =>
    key.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stat.value.toLowerCase().includes(searchQuery.toLowerCase()) ||
    stat.unit.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Filter workout exercises based on search query
  const filteredExercises = workoutPlan.exercises.filter(exercise =>
    exercise.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    exercise.time.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Calculate total search results
  const totalResults = filteredActivities.length + filteredTasks.length + filteredStats.length + filteredExercises.length;

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
        {/* Sports-Themed Hero Section */}
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          mb: 4,
          p: 3,
          borderRadius: 3,
          background: 'linear-gradient(135deg, #1e3c72 0%, #2a5298 50%, #7e8ba3 100%)',
          color: 'white',
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.05"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")',
            opacity: 0.1
          }
        }}>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrophyIcon sx={{ fontSize: 32, mr: 2, color: '#ffd700' }} />
              <Typography variant="h4" fontWeight="bold" sx={{ 
                fontSize: { xs: '1.8rem', sm: '2.2rem' },
                fontFamily: '"Poppins", sans-serif',
                textShadow: '2px 2px 4px rgba(0,0,0,0.3)'
              }}>
                Athlete Performance Hub
              </Typography>
            </Box>
            <Typography variant="h6" sx={{ mb: 1, opacity: 0.9 }}>
              Elite Athlete Training Dashboard
            </Typography>
            <Typography variant="body1" sx={{ opacity: 0.8 }}>
              Welcome back, Champion! 🏆 Ready to crush your goals today?
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
              <Chip 
                icon={<StarIcon />}
                label="Level: Elite Athlete" 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)'
                }} 
              />
              <Chip 
                icon={<MedalIcon />}
                label="5 Gold Medals" 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255,215,0,0.3)', 
                  color: '#ffd700',
                  border: '1px solid rgba(255,215,0,0.5)'
                }} 
              />
              <Chip 
                icon={<SpeedIcon />}
                label="PR: 45s 100m" 
                size="small" 
                sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  color: 'white',
                  border: '1px solid rgba(255,255,255,0.3)'
                }} 
              />
            </Box>
          </Box>
          <Box sx={{ position: 'relative', zIndex: 1 }}>
            <Avatar sx={{ 
              bgcolor: 'rgba(255,255,255,0.2)', 
              width: 64, 
              height: 64,
              border: '3px solid rgba(255,255,255,0.3)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
            }}>
              <PersonIcon sx={{ fontSize: 36 }} />
            </Avatar>
          </Box>
        </Box>

        {/* Global Search Bar */}
        <Box sx={{ mb: 4 }}>
          {searchQuery && (
            <Box sx={{ mb: 2, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                Found {totalResults} results for "{searchQuery}"
              </Typography>
            </Box>
          )}
          <TaskSearchFilter
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filters={filters}
            onFiltersChange={setFilters}
            availableLabels={[]}
            availableCategories={[]}
          />
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
          {searchQuery ? (
            // Show filtered stats when searching
            filteredStats.map(([key, stat]) => (
              <Grid size={{ xs: 12, sm: 6, md: 3 }} key={key}>
                <StatCard 
                  title={key.charAt(0).toUpperCase() + key.slice(1)} 
                  value={stat.value} 
                  color="#2563eb" 
                  unit={stat.unit}
                  trend={stat.trend}
                />
              </Grid>
            ))
          ) : (
            // Show all stats when not searching
            <>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard 
                  title="Calories Burned" 
                  value={stats.calories.value} 
                  color="#ff6b35" 
                  unit={stats.calories.unit}
                  trend={stats.calories.trend}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard 
                  title="Distance" 
                  value={stats.distance.value} 
                  color="#00bcd4" 
                  unit={stats.distance.unit}
                  trend={stats.distance.trend}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard 
                  title="Avg Heart Rate" 
                  value={stats.heartRate.value} 
                  color="#e91e63" 
                  unit={stats.heartRate.unit}
                  trend={stats.heartRate.trend}
                />
              </Grid>
              <Grid size={{ xs: 12, sm: 6, md: 3 }}>
                <StatCard 
                  title="Workouts" 
                  value={stats.workouts.value} 
                  color="#4caf50" 
                  unit={stats.workouts.unit}
                  trend={stats.workouts.trend}
                />
              </Grid>
            </>
          )}
        </Grid>

        {/* Workout Plan */}
        <Card sx={{ 
          mb: 3, 
          borderRadius: 3,
          boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
          background: 'white',
          overflow: 'hidden'
        }}>
          <Box sx={{ p: 3, bgcolor: 'linear-gradient(90deg, #1e3c72 0%, #2a5298 100%)', color: 'white' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <TrophyIcon sx={{ fontSize: 24, mr: 1, color: '#ffd700' }} />
                  <Typography variant="h6" fontWeight="bold">{workoutPlan.title}</Typography>
                </Box>
                <Typography variant="body2" sx={{ opacity: 0.9 }}>{workoutPlan.sport} • Elite Level Training</Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <Box sx={{ 
                  bgcolor: 'rgba(255,255,255,0.2)', 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <TimerIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption">{workoutPlan.time}</Typography>
                </Box>
                <Box sx={{ 
                  bgcolor: 'rgba(255,87,34,0.3)', 
                  px: 1.5, 
                  py: 0.5, 
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center'
                }}>
                  <FireIcon sx={{ fontSize: 16, mr: 0.5 }} />
                  <Typography variant="caption">{workoutPlan.calories} kcal</Typography>
                </Box>
              </Box>
            </Box>
          </Box>
          
          <Box sx={{ p: 2 }}>
            {(searchQuery ? filteredExercises : workoutPlan.exercises).map((exercise, index) => (
              <Box key={index} sx={{ 
                display: 'flex', 
                justifyContent: 'space-between', 
                alignItems: 'center',
                py: 2,
                borderBottom: index !== (searchQuery ? filteredExercises : workoutPlan.exercises).length - 1 ? '1px solid rgba(0,0,0,0.05)' : 'none',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.02)' }
              }}>
                <Box>
                  <Typography variant="subtitle2" fontWeight="medium">
                    {exercise.name}
                  </Typography>
                  <Chip 
                    label={exercise.type} 
                    size="small" 
                    sx={{ 
                      mt: 0.5,
                      bgcolor: exercise.type === 'Power' ? '#ff6b3520' : 
                               exercise.type === 'Speed' ? '#00bcd420' :
                               exercise.type === 'Strength' ? '#4caf5020' :
                               exercise.type === 'Preparation' ? '#9e9e9e20' :
                               'rgba(33, 150, 243, 0.2)',
                      color: exercise.type === 'Power' ? '#ff6b35' : 
                             exercise.type === 'Speed' ? '#00bcd4' :
                             exercise.type === 'Strength' ? '#4caf50' :
                             exercise.type === 'Preparation' ? '#9e9e9e' :
                             '#2196f3',
                      fontSize: '0.7rem',
                      height: 20
                    }} 
                  />
                </Box>
                <Box sx={{ textAlign: 'right' }}>
                  <Typography variant="body2" fontWeight="medium" color="text.secondary">
                    {exercise.time}
                  </Typography>
                </Box>
              </Box>
            ))}
            
            {searchQuery && filteredExercises.length === 0 && (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body2" color="text.secondary">
                  No exercises found matching "{searchQuery}"
                </Typography>
              </Box>
            )}
            
            {loading ? (
              <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
              </Box>
            ) : (
              <Box sx={{ mt: 2 }}>
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                  Recent Activities
                </Typography>
                {filteredActivities.length === 0 ? (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <Typography variant="body1" color="text.secondary">
                      No activities found matching "{searchQuery}"
                    </Typography>
                  </Box>
                ) : (
                  filteredActivities.map((activity) => (
                    <ActivityItem
                      key={activity.id}
                      title={activity.title}
                      time={activity.time}
                      value={activity.value}
                      color={activity.color}
                      sport={activity.sport}
                      duration={activity.duration}
                      calories={activity.calories}
                      icon={activity.icon}
                      pace={activity.pace}
                      shots={activity.shots}
                      speed={activity.speed}
                      rallies={activity.rallies}
                    />
                  ))
                )}
              </Box>
            )}
          </Box>
        </Card>

        {/* Tasks Section */}
        <Card sx={{ 
          mb: 3, 
          borderRadius: 3,
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
          border: '1px solid rgba(0,0,0,0.06)'
        }}>
          <CardContent sx={{ p: 3 }}>
            <Typography variant="h6" fontWeight="bold" gutterBottom>
              Recent Tasks
            </Typography>
            {filteredTasks.length === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" color="text.secondary">
                  {searchQuery ? `No tasks found matching "${searchQuery}"` : 'No tasks available'}
                </Typography>
              </Box>
            ) : (
              filteredTasks.slice(0, 5).map((task) => (
                <Box key={task.id} sx={{ 
                  py: 2, 
                  borderBottom: '1px solid rgba(0,0,0,0.08)',
                  '&:last-child': { borderBottom: 'none' }
                }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="medium">
                        {task.title}
                      </Typography>
                      {task.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                          {task.description}
                        </Typography>
                      )}
                    </Box>
                    <Chip 
                      label={task.status} 
                      size="small" 
                      color={task.status === 'Completed' ? 'success' : 'primary'}
                      variant="outlined"
                    />
                  </Box>
                </Box>
              ))
            )}
          </CardContent>
        </Card>
      </Box>
    </PageLayout>
  );
};

export default Dashboard;
