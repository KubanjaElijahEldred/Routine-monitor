import React from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Grid,
  LinearProgress,
  Chip,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Schedule as ScheduleIcon,
  Flag as FlagIcon,
  Label as LabelIcon,
  Timer as TimerIcon,
  Assignment as AssignmentIcon,
  Star as StarIcon,
} from '@mui/icons-material';

const TaskStatistics = ({ tasks, timeEntries, categories, labels }) => {
  // Calculate basic statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(task => task.completed).length;
  const activeTasks = totalTasks - completedTasks;
  const importantTasks = tasks.filter(task => task.important).length;
  const overdueTasks = tasks.filter(task => {
    if (!task.dueDate || task.completed) return false;
    return new Date(task.dueDate) < new Date();
  }).length;

  // Calculate completion rate
  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Priority breakdown
  const priorityBreakdown = {
    urgent: tasks.filter(task => task.priority === 'urgent').length,
    high: tasks.filter(task => task.priority === 'high').length,
    medium: tasks.filter(task => task.priority === 'medium').length,
    low: tasks.filter(task => task.priority === 'low').length,
  };

  // Category breakdown
  const categoryBreakdown = categories.map(category => ({
    ...category,
    count: tasks.filter(task => task.category === category.id).length,
    completed: tasks.filter(task => task.category === category.id && task.completed).length,
  }));

  // Label usage
  const labelUsage = labels.map(label => ({
    ...label,
    count: tasks.filter(task => task.labels && task.labels.some(taskLabel => taskLabel.id === label.id)).length,
  })).filter(label => label.count > 0).sort((a, b) => b.count - a.count);

  // Tasks with subtasks
  const tasksWithSubtasks = tasks.filter(task => task.subtasks && task.subtasks.length > 0);
  const totalSubtasks = tasks.reduce((total, task) => total + (task.subtasks ? task.subtasks.length : 0), 0);
  const completedSubtasks = tasks.reduce((total, task) => {
    if (!task.subtasks) return total;
    return total + task.subtasks.filter(subtask => subtask.completed).length;
  }, 0);
  const subtaskCompletionRate = totalSubtasks > 0 ? Math.round((completedSubtasks / totalSubtasks) * 100) : 0;

  // Time tracking statistics
  const totalTime = timeEntries.reduce((total, entry) => total + entry.duration, 0);
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    if (hours > 0) {
      return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
  };

  // Recent activity (last 7 days)
  const recentTasks = tasks.filter(task => {
    const taskDate = new Date(task.createdAt);
    const weekAgo = new Date();
    weekAgo.setDate(weekAgo.getDate() - 7);
    return taskDate >= weekAgo;
  });

  const StatCard = ({ title, value, subtitle, icon, color, progress }) => (
    <Card sx={{ height: '100%' }}>
      <CardContent>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Avatar sx={{ bgcolor: color, mr: 2 }}>
            {icon}
          </Avatar>
          <Box sx={{ flex: 1 }}>
            <Typography variant="h4" component="div">
              {value}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {title}
            </Typography>
          </Box>
        </Box>
        {subtitle && (
          <Typography variant="caption" color="text.secondary">
            {subtitle}
          </Typography>
        )}
        {progress !== undefined && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{ mt: 1, height: 6, borderRadius: 3 }}
          />
        )}
      </CardContent>
    </Card>
  );

  return (
    <Box>
      {/* Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            subtitle={`${activeTasks} active, ${completedTasks} completed`}
            icon={<AssignmentIcon />}
            color="primary.main"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Completion Rate"
            value={`${completionRate}%`}
            subtitle={`${completedTasks} of ${totalTasks} completed`}
            icon={<CheckCircleIcon />}
            color="success.main"
            progress={completionRate}
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Important Tasks"
            value={importantTasks}
            subtitle={`${tasks.filter(task => task.important && !task.completed).length} pending`}
            icon={<StarIcon />}
            color="warning.main"
          />
        </Grid>
        <Grid xs={12} sm={6} md={3}>
          <StatCard
            title="Overdue Tasks"
            value={overdueTasks}
            subtitle="Need immediate attention"
            icon={<ScheduleIcon />}
            color="error.main"
          />
        </Grid>
      </Grid>

      {/* Detailed Statistics */}
      <Grid container spacing={3}>
        {/* Priority Breakdown */}
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Priority Breakdown
              </Typography>
              <List dense>
                {Object.entries(priorityBreakdown).map(([priority, count]) => {
                  const colors = {
                    urgent: '#d32f2f',
                    high: '#f57c00',
                    medium: '#1976d2',
                    low: '#388e3c',
                  };
                  return (
                    <ListItem key={priority}>
                      <ListItemIcon>
                        <FlagIcon sx={{ color: colors[priority] }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={priority.charAt(0).toUpperCase() + priority.slice(1)}
                        secondary={`${count} tasks`}
                      />
                      <Chip
                        label={count}
                        size="small"
                        sx={{
                          backgroundColor: colors[priority],
                          color: 'white',
                        }}
                      />
                    </ListItem>
                  );
                })}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Category Breakdown */}
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Category Breakdown
              </Typography>
              <List dense>
                {categoryBreakdown
                  .filter(cat => cat.count > 0)
                  .map((category) => (
                    <ListItem key={category.id}>
                      <ListItemIcon>
                        <LabelIcon sx={{ color: category.color }} />
                      </ListItemIcon>
                      <ListItemText
                        primary={category.name}
                        secondary={`${category.completed} of ${category.count} completed`}
                      />
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LinearProgress
                          variant="determinate"
                          value={category.count > 0 ? (category.completed / category.count) * 100 : 0}
                          sx={{ width: 60, height: 6, borderRadius: 3 }}
                        />
                        <Typography variant="caption" sx={{ minWidth: 35 }}>
                          {category.count > 0 ? Math.round((category.completed / category.count) * 100) : 0}%
                        </Typography>
                      </Box>
                    </ListItem>
                  ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Label Usage */}
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Most Used Labels
              </Typography>
              {labelUsage.length > 0 ? (
                <List dense>
                  {labelUsage.slice(0, 5).map((label) => (
                    <ListItem key={label.id}>
                      <ListItemIcon>
                        <LabelIcon sx={{ color: label.color }} />
                      </ListItemIcon>
                      <ListItemText primary={label.name} />
                      <Chip
                        label={label.count}
                        size="small"
                        sx={{
                          backgroundColor: label.color,
                          color: 'white',
                        }}
                      />
                    </ListItem>
                  ))}
                </List>
              ) : (
                <Typography variant="body2" color="text.secondary" sx={{ py: 2 }}>
                  No labels used yet
                </Typography>
              )}
            </CardContent>
          </Card>
        </Grid>

        {/* Subtasks & Time Tracking */}
        <Grid xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Subtasks & Time Tracking
              </Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" gutterBottom>
                  Subtasks Progress
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <Typography variant="h6">
                    {completedSubtasks}/{totalSubtasks}
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={subtaskCompletionRate}
                    sx={{ flex: 1, height: 8, borderRadius: 4 }}
                  />
                  <Typography variant="body2" color="text.secondary">
                    {subtaskCompletionRate}%
                  </Typography>
                </Box>
              </Box>
              <Divider sx={{ my: 2 }} />
              <Box>
                <Typography variant="body2" gutterBottom>
                  Total Time Tracked
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <TimerIcon color="action" />
                  <Typography variant="h6">
                    {formatTime(totalTime)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activity */}
        <Grid xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Recent Activity (Last 7 Days)
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {recentTasks.length} tasks created in the last week
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default TaskStatistics;
