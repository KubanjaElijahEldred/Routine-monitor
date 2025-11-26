import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Chip,
  LinearProgress,
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
  Avatar,
  Divider,
  Paper,
  Tabs,
  Tab,
} from '@mui/material';
import {
  Add,
  Target,
  Timeline,
  Flag,
  TrendingUp,
  Star,
  Delete,
  Edit,
  CheckCircle,
  RadioButtonUnchecked,
  CalendarToday,
  AccessTime,
  LocalFireDepartment,
  EmojiEvents,
  Lightbulb,
  Business,
  FitnessCenter,
  School,
  AttachMoney,
  Favorite,
} from '@mui/icons-material';

const goalIcons = {
  'Personal': Favorite,
  'Career': Business,
  'Health': FitnessCenter,
  'Education': School,
  'Financial': AttachMoney,
  'Creative': Lightbulb,
};

const goalColors = {
  'Personal': '#ec4899',
  'Career': '#3b82f6',
  'Health': '#10b981',
  'Education': '#8b5cf6',
  'Financial': '#2563eb',
  'Creative': '#ef4444',
};

const Goals = () => {
  const [goals, setGoals] = useState([
    {
      id: 1,
      title: 'Run a Marathon',
      description: 'Complete a full marathon in under 4 hours',
      category: 'Health',
      targetDate: '2024-06-15',
      progress: 65,
      milestones: [
        { id: 1, title: 'Run 5K', completed: true, date: '2024-01-15' },
        { id: 2, title: 'Run 10K', completed: true, date: '2024-02-20' },
        { id: 3, title: 'Run Half Marathon', completed: true, date: '2024-04-10' },
        { id: 4, title: 'Run Full Marathon', completed: false, date: '2024-06-15' },
      ],
      priority: 'High',
      status: 'In Progress',
    },
    {
      id: 2,
      title: 'Learn TypeScript',
      description: 'Master TypeScript and build 3 projects',
      category: 'Education',
      targetDate: '2024-05-01',
      progress: 40,
      milestones: [
        { id: 1, title: 'Complete TypeScript Course', completed: true, date: '2024-02-01' },
        { id: 2, title: 'Build First Project', completed: true, date: '2024-03-15' },
        { id: 3, title: 'Build Second Project', completed: false, date: '2024-04-01' },
        { id: 4, title: 'Build Third Project', completed: false, date: '2024-05-01' },
      ],
      priority: 'Medium',
      status: 'In Progress',
    },
    {
      id: 3,
      title: 'Save $10,000',
      description: 'Build emergency fund of $10,000',
      category: 'Financial',
      targetDate: '2024-12-31',
      progress: 75,
      milestones: [
        { id: 1, title: 'Save $2,500', completed: true, date: '2024-03-31' },
        { id: 2, title: 'Save $5,000', completed: true, date: '2024-06-30' },
        { id: 3, title: 'Save $7,500', completed: true, date: '2024-09-30' },
        { id: 4, title: 'Save $10,000', completed: false, date: '2024-12-31' },
      ],
      priority: 'High',
      status: 'In Progress',
    },
  ]);

  const [openDialog, setOpenDialog] = useState(false);
  const [editingGoal, setEditingGoal] = useState(null);
  const [tabValue, setTabValue] = useState(0);
  const [newGoal, setNewGoal] = useState({
    title: '',
    description: '',
    category: 'Personal',
    targetDate: '',
    priority: 'Medium',
    milestones: [{ title: '', date: '' }],
  });

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const filteredGoals = goals.filter((goal) => {
    if (tabValue === 0) return true; // All goals
    if (tabValue === 1) return goal.status === 'In Progress';
    if (tabValue === 2) return goal.status === 'Completed';
    return true;
  });

  const handleAddGoal = () => {
    if (editingGoal) {
      setGoals(goals.map(goal => 
        goal.id === editingGoal.id 
          ? { ...goal, ...newGoal, status: 'In Progress' }
          : goal
      ));
    } else {
      const goal = {
        id: Date.now(),
        ...newGoal,
        progress: 0,
        status: 'In Progress',
        milestones: newGoal.milestones.map((m, index) => ({
          id: Date.now() + index,
          title: m.title,
          date: m.date,
          completed: false,
        })),
      };
      setGoals([...goals, goal]);
    }
    
    setNewGoal({
      title: '',
      description: '',
      category: 'Personal',
      targetDate: '',
      priority: 'Medium',
      milestones: [{ title: '', date: '' }],
    });
    setEditingGoal(null);
    setOpenDialog(false);
  };

  const handleEditGoal = (goal) => {
    setEditingGoal(goal);
    setNewGoal({
      title: goal.title,
      description: goal.description,
      category: goal.category,
      targetDate: goal.targetDate,
      priority: goal.priority,
      milestones: goal.milestones.map(m => ({ title: m.title, date: m.date })),
    });
    setOpenDialog(true);
  };

  const handleDeleteGoal = (goalId) => {
    setGoals(goals.filter(goal => goal.id !== goalId));
  };

  const handleCompleteMilestone = (goalId, milestoneId) => {
    setGoals(goals.map(goal => {
      if (goal.id === goalId) {
        const updatedMilestones = goal.milestones.map(milestone =>
          milestone.id === milestoneId
            ? { ...milestone, completed: !milestone.completed }
            : milestone
        );
        const completedCount = updatedMilestones.filter(m => m.completed).length;
        const progress = Math.round((completedCount / updatedMilestones.length) * 100);
        
        return {
          ...goal,
          milestones: updatedMilestones,
          progress,
          status: progress === 100 ? 'Completed' : 'In Progress',
        };
      }
      return goal;
    }));
  };

  const getDaysRemaining = (targetDate) => {
    const today = new Date();
    const target = new Date(targetDate);
    const diffTime = target - today;
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays > 0 ? diffDays : 0;
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return '#ef4444';
      case 'Medium': return '#2563eb';
      case 'Low': return '#10b981';
      default: return '#6b7280';
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Goals & Milestones
        </Typography>
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={() => setOpenDialog(true)}
          sx={{ borderRadius: 3 }}
        >
          Add Goal
        </Button>
      </Box>

      {/* Tabs */}
      <Paper sx={{ mb: 3 }}>
        <Tabs value={tabValue} onChange={handleTabChange}>
          <Tab label={`All Goals (${goals.length})`} />
          <Tab label={`In Progress (${goals.filter(g => g.status === 'In Progress').length})`} />
          <Tab label={`Completed (${goals.filter(g => g.status === 'Completed').length})`} />
        </Tabs>
      </Paper>

      {/* Goals Grid */}
      <Grid container spacing={3}>
        {filteredGoals.map((goal) => {
          const IconComponent = goalIcons[goal.category] || Target;
          const categoryColor = goalColors[goal.category] || '#6366f1';
          const daysRemaining = getDaysRemaining(goal.targetDate);
          
          return (
            <Grid item xs={12} md={6} lg={4} key={goal.id}>
              <Card sx={{ height: '100%', position: 'relative' }}>
                <CardContent>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ bgcolor: categoryColor, mr: 2 }}>
                        <IconComponent />
                      </Avatar>
                      <Box>
                        <Typography variant="h6" fontWeight="bold">
                          {goal.title}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
                          <Chip
                            label={goal.category}
                            size="small"
                            sx={{
                              bgcolor: categoryColor,
                              color: 'white',
                              fontWeight: 600,
                              mr: 1,
                            }}
                          />
                          <Chip
                            label={goal.priority}
                            size="small"
                            sx={{
                              bgcolor: getPriorityColor(goal.priority),
                              color: 'white',
                              fontWeight: 600,
                            }}
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box>
                      <IconButton size="small" onClick={() => handleEditGoal(goal)}>
                        <Edit />
                      </IconButton>
                      <IconButton size="small" onClick={() => handleDeleteGoal(goal.id)}>
                        <Delete />
                      </IconButton>
                    </Box>
                  </Box>

                  <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                    {goal.description}
                  </Typography>

                  <Box sx={{ mb: 2 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                      <Typography variant="body2" color="text.secondary">
                        Progress
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {goal.progress}%
                      </Typography>
                    </Box>
                    <LinearProgress
                      variant="determinate"
                      value={goal.progress}
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

                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <CalendarToday sx={{ fontSize: 16, mr: 0.5, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {daysRemaining} days left
                      </Typography>
                    </Box>
                    <Chip
                      label={goal.status}
                      size="small"
                      color={goal.status === 'Completed' ? 'success' : 'primary'}
                      variant="outlined"
                    />
                  </Box>

                  <Divider sx={{ my: 2 }} />

                  <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
                    Milestones
                  </Typography>
                  <List dense>
                    {goal.milestones.map((milestone) => (
                      <ListItem key={milestone.id} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 32 }}>
                          <IconButton
                            size="small"
                            onClick={() => handleCompleteMilestone(goal.id, milestone.id)}
                            sx={{
                              color: milestone.completed ? 'success.main' : 'grey.400',
                            }}
                          >
                            {milestone.completed ? <CheckCircle /> : <RadioButtonUnchecked />}
                          </IconButton>
                        </ListItemIcon>
                        <ListItemText
                          primary={milestone.title}
                          secondary={milestone.date}
                          sx={{
                            '& .MuiListItemText-primary': {
                              textDecoration: milestone.completed ? 'line-through' : 'none',
                              color: milestone.completed ? 'text.secondary' : 'text.primary',
                            },
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>
          );
        })}
      </Grid>

      {/* Add/Edit Goal Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)} maxWidth="md" fullWidth>
        <DialogTitle>{editingGoal ? 'Edit Goal' : 'Add New Goal'}</DialogTitle>
        <DialogContent>
          <Box sx={{ pt: 2 }}>
            <TextField
              fullWidth
              label="Goal Title"
              value={newGoal.title}
              onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
              sx={{ mb: 2 }}
            />
            <TextField
              fullWidth
              label="Description"
              multiline
              rows={3}
              value={newGoal.description}
              onChange={(e) => setNewGoal({ ...newGoal, description: e.target.value })}
              sx={{ mb: 2 }}
            />
            <Grid container spacing={2} sx={{ mb: 2 }}>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Category</InputLabel>
                  <Select
                    value={newGoal.category}
                    onChange={(e) => setNewGoal({ ...newGoal, category: e.target.value })}
                  >
                    {Object.keys(goalIcons).map((category) => (
                      <MenuItem key={category} value={category}>
                        {category}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} sm={6}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={newGoal.priority}
                    onChange={(e) => setNewGoal({ ...newGoal, priority: e.target.value })}
                  >
                    <MenuItem value="High">High</MenuItem>
                    <MenuItem value="Medium">Medium</MenuItem>
                    <MenuItem value="Low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
            <TextField
              fullWidth
              label="Target Date"
              type="date"
              value={newGoal.targetDate}
              onChange={(e) => setNewGoal({ ...newGoal, targetDate: e.target.value })}
              sx={{ mb: 2 }}
              InputLabelProps={{ shrink: true }}
            />
            
            <Typography variant="subtitle2" fontWeight="bold" sx={{ mb: 1 }}>
              Milestones
            </Typography>
            {newGoal.milestones.map((milestone, index) => (
              <Grid container spacing={2} key={index} sx={{ mb: 1 }}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Milestone Title"
                    value={milestone.title}
                    onChange={(e) => {
                      const updatedMilestones = [...newGoal.milestones];
                      updatedMilestones[index].title = e.target.value;
                      setNewGoal({ ...newGoal, milestones: updatedMilestones });
                    }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Target Date"
                    type="date"
                    value={milestone.date}
                    onChange={(e) => {
                      const updatedMilestones = [...newGoal.milestones];
                      updatedMilestones[index].date = e.target.value;
                      setNewGoal({ ...newGoal, milestones: updatedMilestones });
                    }}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
              </Grid>
            ))}
            <Button
              onClick={() => setNewGoal({ ...newGoal, milestones: [...newGoal.milestones, { title: '', date: '' }] })}
              sx={{ mt: 1 }}
            >
              Add Milestone
            </Button>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
          <Button onClick={handleAddGoal} variant="contained">
            {editingGoal ? 'Update' : 'Add'} Goal
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Goals;
