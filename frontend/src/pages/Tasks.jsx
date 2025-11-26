import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  Checkbox,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Paper,
  Tabs,
  Tab,
  Chip,
  Divider,
  Menu,
  MenuItem,
  CircularProgress,
  Grid,
  InputAdornment,
  Tooltip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Select,
  FormControl,
  InputLabel,
  Badge,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Today as TodayIcon,
  StarBorder as StarBorderIcon,
  Star as StarIcon,
  Search as SearchIcon,
  ViewList as ViewListIcon,
  ViewModule as ViewModuleIcon,
  Refresh as RefreshIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  FilterList as FilterListIcon,
  Sort as SortIcon,
  Label as LabelIcon,
  Close as CloseIcon,
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/common/PageHeader';
import TaskReminder from '../components/notifications/TaskReminder';
import SubtaskList from '../components/tasks/SubtaskList';
import TaskTemplates from '../components/tasks/TaskTemplates';
import TimeTracker from '../components/tasks/TimeTracker';
import TaskLabels from '../components/tasks/TaskLabels';
import TaskSearchFilter from '../components/tasks/TaskSearchFilter';
import TaskStatistics from '../components/tasks/TaskStatistics';
import TaskExportImport from '../components/tasks/TaskExportImport';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: 12,
  boxShadow: '0 4px 20px 0 rgba(0,0,0,0.05)',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
}));

const PriorityChip = ({ priority }) => {
  const priorityMap = {
    urgent: { label: 'Urgent', color: 'error' },
    high: { label: 'High', color: 'error' },
    medium: { label: 'Medium', color: 'warning' },
    low: { label: 'Low', color: 'primary' },
  };

  const { label, color } = priorityMap[priority] || { label: 'Low', color: 'default' };
  return <Chip label={label} color={color} size="small" variant="outlined" component="span" />;
};

const Tasks = () => {
  // State for UI
  const [viewMode, setViewMode] = useState('list');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [showCategoryDialog, setShowCategoryDialog] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [showStats, setShowStats] = useState(false);
  
  // Templates state
  const [templates, setTemplates] = useState([
    {
      id: 1,
      name: 'Weekly Planning',
      description: 'Plan your week with this template',
      category: 'personal',
      priority: 'medium',
      subtasks: [
        { id: 101, title: 'Review last week accomplishments', completed: false },
        { id: 102, title: 'Set weekly goals', completed: false },
        { id: 103, title: 'Schedule important meetings', completed: false }
      ],
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      name: 'Code Review',
      description: 'Standard code review process',
      category: 'development',
      priority: 'high',
      subtasks: [
        { id: 201, title: 'Check code style and formatting', completed: false },
        { id: 202, title: 'Review logic and algorithms', completed: false },
        { id: 203, title: 'Run tests', completed: false },
        { id: 204, title: 'Check for security issues', completed: false }
      ],
      createdAt: new Date().toISOString()
    }
  ]);
  
  // Define labels as constant first
  const initialLabels = [
    { id: 1, name: 'Bug', color: '#d32f2f', createdAt: new Date().toISOString() },
    { id: 2, name: 'Feature', color: '#1976d2', createdAt: new Date().toISOString() },
    { id: 3, name: 'Enhancement', color: '#388e3c', createdAt: new Date().toISOString() },
    { id: 4, name: 'Documentation', color: '#2563eb', createdAt: new Date().toISOString() },
  ];
  
  // Labels state
  const [availableLabels, setAvailableLabels] = useState(initialLabels);
  
  // Task state
  const [tasks, setTasks] = useState([
    { 
      id: 1, 
      title: 'Complete project proposal', 
      completed: false, 
      important: true, 
      priority: 'high',
      dueDate: '2023-11-25',
      category: 'work',
      description: 'Finish the Q4 project proposal and send to team',
      labels: [initialLabels[0], initialLabels[1]], // Bug, Feature
      subtasks: [
        { id: 101, title: 'Research market trends', completed: true },
        { id: 102, title: 'Write executive summary', completed: false },
        { id: 103, title: 'Create budget section', completed: false }
      ]
    },
    { 
      id: 2, 
      title: 'Review pull requests', 
      completed: true, 
      important: false, 
      priority: 'medium',
      dueDate: '2023-11-20',
      category: 'development',
      description: 'Review and merge pending PRs',
      labels: [initialLabels[2]], // Enhancement
      subtasks: [
        { id: 201, title: 'Check functionality', completed: true },
        { id: 202, title: 'Run tests', completed: true }
      ]
    },
    { 
      id: 3, 
      title: 'Update documentation', 
      completed: false, 
      important: true, 
      priority: 'low',
      dueDate: '2023-11-30',
      category: 'documentation',
      description: 'Update API documentation for new endpoints',
      labels: [initialLabels[3]], // Documentation
      subtasks: []
    },
  ]);
  
  // Categories state
  const [categories] = useState([
    { id: 'work', name: 'Work', color: '#1976d2' },
    { id: 'personal', name: 'Personal', color: '#388e3c' },
    { id: 'development', name: 'Development', color: '#7b1fa2' },
    { id: 'documentation', name: 'Documentation', color: '#2563eb' },
    { id: 'shopping', name: 'Shopping', color: '#d32f2f' },
  ]);
  
  // Time tracking state
  const [timeEntries, setTimeEntries] = useState([
    {
      id: 1,
      taskId: 1,
      startTime: new Date(Date.now() - 3600000).toISOString(),
      endTime: new Date(Date.now() - 1800000).toISOString(),
      duration: 1800000, // 30 minutes
      isActive: false
    },
    {
      id: 2,
      taskId: 2,
      startTime: new Date(Date.now() - 900000).toISOString(),
      endTime: null,
      duration: 900000, // 15 minutes so far
      isActive: true
    }
  ]);
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [newTask, setNewTask] = useState('');
  
  // Search and filter state
  const [filters, setFilters] = useState({
    priority: 'all',
    category: 'all',
    labels: [],
    dateRange: 'all',
    hasSubtasks: 'all',
    timeTracked: 'all'
  });

  // Filter tasks based on active tab, category, and advanced filters
  const filteredTasks = tasks.filter(task => {
    // Tab filter
    if (activeTab === 'active') return !task.completed;
    if (activeTab === 'completed') return task.completed;
    if (activeTab === 'important') return task.important;
    
    // Advanced filters
    // Priority filter
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false;
    
    // Category filter
    if (filters.category !== 'all' && task.category !== filters.category) return false;
    
    // Labels filter
    if (filters.labels.length > 0) {
      const taskLabelIds = (task.labels || []).map(l => l.id);
      const filterLabelIds = filters.labels.map(l => l.id);
      const hasRequiredLabel = filterLabelIds.some(id => taskLabelIds.includes(id));
      if (!hasRequiredLabel) return false;
    }
    
    // Date range filter
    if (filters.dateRange !== 'all' && task.dueDate) {
      const taskDate = new Date(task.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const tomorrow = new Date(today);
      tomorrow.setDate(tomorrow.getDate() + 1);
      const thisWeekEnd = new Date(today);
      thisWeekEnd.setDate(today.getDate() + 7);
      const nextWeekEnd = new Date(today);
      nextWeekEnd.setDate(today.getDate() + 14);
      
      switch (filters.dateRange) {
        case 'today':
          if (taskDate < today || taskDate >= tomorrow) return false;
          break;
        case 'tomorrow':
          if (taskDate < tomorrow || taskDate >= new Date(tomorrow.getTime() + 86400000)) return false;
          break;
        case 'thisWeek':
          if (taskDate < today || taskDate >= thisWeekEnd) return false;
          break;
        case 'nextWeek':
          if (taskDate < thisWeekEnd || taskDate >= nextWeekEnd) return false;
          break;
        case 'overdue':
          if (taskDate >= today) return false;
          break;
      }
    }
    
    // Subtasks filter
    if (filters.hasSubtasks !== 'all') {
      const hasSubtasks = task.subtasks && task.subtasks.length > 0;
      if (filters.hasSubtasks === 'with' && !hasSubtasks) return false;
      if (filters.hasSubtasks === 'without' && hasSubtasks) return false;
    }
    
    // Time tracked filter
    if (filters.timeTracked !== 'all') {
      // This would need timeEntries data, for now using placeholder logic
      const hasTimeTracked = false; // TODO: Implement actual time tracking check
      if (filters.timeTracked === 'with' && !hasTimeTracked) return false;
      if (filters.timeTracked === 'without' && hasTimeTracked) return false;
    }
    
    return true; // 'all' tab or passed all filters
  }).filter(task => {
    if (categoryFilter === 'all') return true;
    return task.category === categoryFilter;
  });
  
  // Filter by search query
  const searchedTasks = filteredTasks.filter(task =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Handle adding a new task
  const handleAddTask = (e) => {
    e.preventDefault();
    if (!newTask.trim()) return;
    
    const newTaskItem = {
      id: Date.now(),
      title: newTask.trim(),
      completed: false,
      important: false,
      priority: 'medium',
      dueDate: null,
      category: 'personal',
      description: '',
      subtasks: [],
      createdAt: new Date().toISOString()
    };
    
    setTasks([newTaskItem, ...tasks]);
    setNewTask('');
  };

  // Subtask handlers
  const handleAddSubtask = (taskId, subtask) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: [...(task.subtasks || []), subtask]
        };
      }
      return task;
    }));
  };

  const handleUpdateSubtask = (taskId, subtaskId, updatedSubtask) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.map(st => 
            st.id === subtaskId ? updatedSubtask : st
          )
        };
      }
      return task;
    }));
  };

  const handleDeleteSubtask = (taskId, subtaskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return {
          ...task,
          subtasks: task.subtasks.filter(st => st.id !== subtaskId)
        };
      }
      return task;
    }));
  };

  // Update task category
  const updateTaskCategory = (taskId, category) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, category } : task
    ));
    setShowCategoryDialog(false);
    setEditingTask(null);
  };

  // Get category by id
  const getCategoryById = (categoryId) => {
    return categories.find(cat => cat.id === categoryId) || { name: 'Uncategorized', color: '#666' };
  };

  // Template handlers
  const handleCreateTemplate = (template) => {
    setTemplates([...templates, template]);
  };

  const handleEditTemplate = (updatedTemplate) => {
    setTemplates(templates.map(template => 
      template.id === updatedTemplate.id ? updatedTemplate : template
    ));
  };

  const handleDeleteTemplate = (templateId) => {
    setTemplates(templates.filter(template => template.id !== templateId));
  };

  const handleUseTemplate = (template) => {
    const newTask = {
      id: Date.now(),
      title: template.name,
      description: template.description,
      category: template.category,
      priority: template.priority,
      completed: false,
      important: false,
      dueDate: null,
      subtasks: template.subtasks.map(st => ({
        ...st,
        id: Date.now() + Math.random(),
        completed: false
      })),
      createdAt: new Date().toISOString()
    };
    setTasks([newTask, ...tasks]);
  };

  // Label handlers
  const handleAddLabel = (taskId, label) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        const existingLabels = task.labels || [];
        const isLabelAlreadyAdded = existingLabels.some(l => l.id === label.id);
        if (!isLabelAlreadyAdded) {
          return {
            ...task,
            labels: [...existingLabels, label]
          };
        }
      }
      return task;
    }));
  };

  const handleRemoveLabel = (taskId, labelId, deleteGlobally = false) => {
    if (deleteGlobally) {
      // Remove label from available labels and all tasks
      setAvailableLabels(availableLabels.filter(label => label.id !== labelId));
      setTasks(tasks.map(task => ({
        ...task,
        labels: (task.labels || []).filter(label => label.id !== labelId)
      })));
    } else {
      // Remove label only from specific task
      setTasks(tasks.map(task => {
        if (task.id === taskId) {
          return {
            ...task,
            labels: (task.labels || []).filter(label => label.id !== labelId)
          };
        }
        return task;
      }));
    }
  };

  const handleCreateLabel = (newLabel) => {
    setAvailableLabels([...availableLabels, newLabel]);
  };

  // Time tracking handlers
  const handleStartTimer = (taskId) => {
    const newEntry = {
      id: Date.now(),
      taskId,
      startTime: new Date().toISOString(),
      endTime: null,
      duration: 0,
      isActive: true
    };
    setTimeEntries([...timeEntries, newEntry]);
  };

  const handleStopTimer = (taskId, entryId) => {
    const entry = timeEntries.find(e => e.id === entryId);
    if (entry) {
      const endTime = new Date().toISOString();
      const duration = new Date(endTime) - new Date(entry.startTime);
      
      setTimeEntries(timeEntries.map(e => 
        e.id === entryId 
          ? { ...e, endTime, duration, isActive: false }
          : e
      ));
    }
  };

  const handleUpdateTimeEntry = (entryId, updates) => {
    setTimeEntries(timeEntries.map(entry => 
      entry.id === entryId ? { ...entry, ...updates } : entry
    ));
  };

  const handleDeleteTimeEntry = (entryId) => {
    setTimeEntries(timeEntries.filter(entry => entry.id !== entryId));
  };

  // Import/Export handlers
  const handleImportTasks = (importedTasks, options) => {
    if (options.mergeWithExisting) {
      // Merge with existing tasks
      setTasks([...tasks, ...importedTasks]);
    } else {
      // Replace all tasks
      setTasks(importedTasks);
    }
  };

  // Toggle task completion
  const toggleTask = (taskId) => {
    setTasks(tasks.map(task =>
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ));
  };
  
  // Toggle task importance and priority
  const toggleImportant = (taskId) => {
    setTasks(tasks.map(task => {
      if (task.id === taskId) {
        return { 
          ...task, 
          important: !task.important,
          priority: task.priority === 'high' ? 'medium' : 'high'
        };
      }
      return task;
    }));
  };
  
  // Handle menu actions
  const handleMenuClick = (event, task) => {
    setAnchorEl(event.currentTarget);
    setSelectedTask(task);
  };
  
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTask(null);
  };
  
  // Handle refresh
  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  // Delete task
  const deleteTask = (taskId) => {
    setTasks(tasks.filter(task => task.id !== taskId));
    handleMenuClose();
  };
  
  // Count tasks by status
  const taskCounts = {
    all: tasks.length,
    active: tasks.filter(t => !t.completed).length,
    completed: tasks.filter(t => t.completed).length,
    important: tasks.filter(t => t.important).length
  };

  return (
    <PageLayout>
      <PageHeader 
        title="My Tasks" 
        subtitle={taskCounts.active > 0 ? `${taskCounts.active} tasks remaining` : 'All caught up!'}
        actions={
          <>
            <Tooltip title="Refresh">
              <IconButton onClick={handleRefresh} sx={{ mr: 1 }}>
                <RefreshIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title={viewMode === 'list' ? 'Grid View' : 'List View'}>
              <IconButton 
                onClick={() => setViewMode(viewMode === 'list' ? 'grid' : 'list')}
                sx={{ mr: 1 }}
              >
                {viewMode === 'list' ? <ViewModuleIcon /> : <ViewListIcon />}
              </IconButton>
            </Tooltip>
            <Button 
              variant="contained" 
              startIcon={<AddIcon />}
              onClick={() => document.getElementById('new-task-input')?.focus()}
            >
              Add Task
            </Button>
            <Button
              variant="outlined"
              startIcon={<TrendingUpIcon />}
              onClick={() => setShowStats(!showStats)}
            >
              {showStats ? 'Hide Stats' : 'Show Stats'}
            </Button>
          </>
        }
      />

      <Box sx={{ mb: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <TaskExportImport
          tasks={tasks}
          categories={categories}
          labels={availableLabels}
          onImportTasks={handleImportTasks}
        />
      </Box>

      {/* Task Statistics Dashboard */}
      {showStats && (
        <TaskStatistics
          tasks={tasks}
          timeEntries={timeEntries}
          categories={categories}
          labels={availableLabels}
        />
      )}

      {/* Task Templates */}
      <TaskTemplates
        templates={templates}
        onCreateTemplate={handleCreateTemplate}
        onEditTemplate={handleEditTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onUseTemplate={handleUseTemplate}
      />

      {/* Task Search and Filter */}
      <TaskSearchFilter
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        filters={filters}
        onFiltersChange={setFilters}
        availableLabels={availableLabels}
        availableCategories={categories}
      />
      <Box sx={{ mb: 3 }}>
        <form onSubmit={handleAddTask}>
          <TextField
            id="new-task-input"
            fullWidth
            variant="outlined"
            placeholder="Add a new task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            InputProps={{
              startAdornment: <AddIcon sx={{ color: 'text.secondary', mr: 1 }} />,
            }}
            sx={{ mb: 3 }}
          />
        </form>
      </Box>

        <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
          <Tabs 
            value={activeTab} 
            onChange={(e, newValue) => setActiveTab(newValue)}
            aria-label="task filters"
            variant="scrollable"
            scrollButtons="auto"
            sx={{
              '& .MuiTab-root': {
                minWidth: 100,
                textTransform: 'none',
                fontWeight: 500,
              },
              '& .Mui-selected': {
                color: 'primary.main',
                fontWeight: 600,
              },
            }}
          >
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>All</span>
                  {taskCounts.all > 0 && (
                    <Chip 
                      label={taskCounts.all} 
                      size="small" 
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="all" 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Active</span>
                  {taskCounts.active > 0 && (
                    <Chip 
                      label={taskCounts.active} 
                      size="small" 
                      color="primary"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="active" 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <span>Completed</span>
                  {taskCounts.completed > 0 && (
                    <Chip 
                      label={taskCounts.completed} 
                      size="small" 
                      color="success"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="completed" 
            />
            <Tab 
              label={
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <StarIcon fontSize="small" sx={{ mr: 0.5, color: 'warning.main' }} />
                  <span>Important</span>
                  {taskCounts.important > 0 && (
                    <Chip 
                      label={taskCounts.important} 
                      size="small" 
                      color="warning"
                      sx={{ ml: 1, height: 20, fontSize: '0.7rem' }} 
                    />
                  )}
                </Box>
              } 
              value="important" 
            />
          </Tabs>
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
          <Typography variant="body2" color="text.secondary">
            {searchedTasks.length} {searchedTasks.length === 1 ? 'task' : 'tasks'} found
          </Typography>
          <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
            <FormControl size="small" sx={{ minWidth: 120 }}>
              <InputLabel>Category</InputLabel>
              <Select
                value={categoryFilter}
                label="Category"
                onChange={(e) => setCategoryFilter(e.target.value)}
                startAdornment={<LabelIcon fontSize="small" sx={{ mr: 1 }} />}
              >
                <MenuItem value="all">All Categories</MenuItem>
                {categories.map((category) => (
                  <MenuItem key={category.id} value={category.id}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Box
                        sx={{
                          width: 12,
                          height: 12,
                          borderRadius: '50%',
                          backgroundColor: category.color,
                          mr: 1,
                        }}
                      />
                      {category.name}
                    </Box>
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button 
              size="small" 
              startIcon={<FilterListIcon />}
              sx={{ textTransform: 'none' }}
              disabled={loading}
            >
              Filter
            </Button>
            <Button 
              size="small" 
              startIcon={<SortIcon />}
              sx={{ textTransform: 'none' }}
              disabled={loading}
            >
              Sort
            </Button>
          </Box>
        </Box>

        {viewMode === 'list' ? (
          <List sx={{ width: '100%', bgcolor: 'background.paper', borderRadius: 1, overflow: 'hidden' }}>
          {loading ? (
            <Box display="flex" justifyContent="center" p={4}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ p: 2, color: 'error.main', textAlign: 'center' }}>
              <Typography>{error}</Typography>
            </Box>
          ) : searchedTasks.length === 0 ? (
            <Box textAlign="center" p={4}>
              <Typography variant="subtitle1" color="textSecondary">
                No tasks found. {activeTab !== 'all' && 'Try changing the filter.'}
              </Typography>
            </Box>
          ) : (
            searchedTasks.map((task) => (
              <React.Fragment key={task.id}>
                <ListItem
                  secondaryAction={
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <TimeTracker
                        taskId={task.id}
                        taskTitle={task.title}
                        timeEntries={timeEntries}
                        onStartTimer={handleStartTimer}
                        onStopTimer={handleStopTimer}
                        onUpdateTimeEntry={handleUpdateTimeEntry}
                        onDeleteTimeEntry={handleDeleteTimeEntry}
                      />
                      <IconButton
                        edge="end"
                        aria-label="more"
                        onClick={(e) => handleMenuClick(e, task)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                  }
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                    },
                  }}
                >
                  <ListItemIcon>
                    <Checkbox
                      edge="start"
                      checked={task.completed}
                      tabIndex={-1}
                      disableRipple
                    />
                  </ListItemIcon>
                  <ListItemText
                    primary={
                      <Typography
                        variant="subtitle1"
                        sx={{
                          textDecoration: task.completed ? 'line-through' : 'none',
                          fontWeight: task.completed ? 'normal' : 'bold',
                        }}
                      >
                        {task.title}
                      </Typography>
                    }
                    secondary={
                      <Box component="span">
                        <Typography variant="body2" color="textSecondary" component="span">
                          {task.description}
                        </Typography>
                        <Box component="span" sx={{ ml: 1, display: 'flex', alignItems: 'center', gap: 1, flexWrap: 'wrap' }}>
                          <PriorityChip priority={task.priority} />
                          {task.category && (
                            <Chip
                              icon={<LabelIcon fontSize="small" />}
                              label={getCategoryById(task.category).name}
                              size="small"
                              variant="outlined"
                              sx={{
                                borderColor: getCategoryById(task.category).color,
                                color: getCategoryById(task.category).color,
                                '& .MuiChip-icon': {
                                  color: getCategoryById(task.category).color,
                                },
                              }}
                              onClick={() => {
                                setEditingTask(task);
                                setShowCategoryDialog(true);
                              }}
                            />
                          )}
                        </Box>
                        <TaskLabels
                          taskId={task.id}
                          taskLabels={task.labels || []}
                          availableLabels={availableLabels}
                          onAddLabel={handleAddLabel}
                          onRemoveLabel={handleRemoveLabel}
                          onCreateLabel={handleCreateLabel}
                        />
                      </Box>
                    }
                  />
                </ListItem>
                <Divider component="li" />
                <SubtaskList
                  subtasks={task.subtasks || []}
                  onAddSubtask={handleAddSubtask}
                  onUpdateSubtask={handleUpdateSubtask}
                  onDeleteSubtask={handleDeleteSubtask}
                  taskId={task.id}
                />
              </React.Fragment>
            ))
          )}
        </List>
      ) : (
        <Grid container spacing={2}>
          {searchedTasks.map((task) => (
            <Grid key={task.id}>
              <StyledPaper>
                <Box display="flex" justifyContent="space-between" alignItems="flex-start">
                  <Box sx={{ flex: 1 }}>
                    <Typography 
                      variant="subtitle1" 
                      sx={{
                        textDecoration: task.completed ? 'line-through' : 'none',
                        color: task.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {task.title}
                    </Typography>
                    <Box display="flex" alignItems="center" mt={1} gap={1} flexWrap="wrap">
                      {task.dueDate && (
                        <Chip
                          icon={<TodayIcon fontSize="small" />}
                          label={new Date(task.dueDate).toLocaleDateString()}
                          size="small"
                          variant="outlined"
                        />
                      )}
                      <PriorityChip priority={task.priority} />
                      {task.category && (
                        <Chip
                          icon={<LabelIcon fontSize="small" />}
                          label={getCategoryById(task.category).name}
                          size="small"
                          variant="outlined"
                          sx={{
                            borderColor: getCategoryById(task.category).color,
                            color: getCategoryById(task.category).color,
                            '& .MuiChip-icon': {
                              color: getCategoryById(task.category).color,
                            },
                          }}
                          onClick={() => {
                            setEditingTask(task);
                            setShowCategoryDialog(true);
                          }}
                        />
                      )}
                    </Box>
                    <TaskLabels
                      taskId={task.id}
                      taskLabels={task.labels || []}
                      availableLabels={availableLabels}
                      onAddLabel={handleAddLabel}
                      onRemoveLabel={handleRemoveLabel}
                      onCreateLabel={handleCreateLabel}
                    />
                  </Box>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 1 }}>
                    <TimeTracker
                      taskId={task.id}
                      taskTitle={task.title}
                      timeEntries={timeEntries}
                      onStartTimer={handleStartTimer}
                      onStopTimer={handleStopTimer}
                      onUpdateTimeEntry={handleUpdateTimeEntry}
                      onDeleteTimeEntry={handleDeleteTimeEntry}
                    />
                    <IconButton 
                      size="small"
                      onClick={(e) => handleMenuClick(e, task)}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </Box>
                </Box>
                <Box mt={2} display="flex" justifyContent="space-between" alignItems="center">
                  <Checkbox
                    checked={task.completed}
                    onChange={() => toggleTask(task.id)}
                    icon={<RadioButtonUncheckedIcon />}
                    checkedIcon={<CheckCircleIcon color="primary" />}
                  />
                  <Box>
                    <IconButton 
                      size="small" 
                      onClick={() => toggleImportant(task.id)}
                      color={task.important ? 'warning' : 'default'}
                    >
                      {task.important ? <StarIcon /> : <StarBorderIcon />}
                    </IconButton>
                  </Box>
                </Box>
                <SubtaskList
                  subtasks={task.subtasks || []}
                  onAddSubtask={handleAddSubtask}
                  onUpdateSubtask={handleUpdateSubtask}
                  onDeleteSubtask={handleDeleteSubtask}
                  taskId={task.id}
                />
              </StyledPaper>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Task menu */}
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
          if (selectedTask) {
            setEditingTask(selectedTask);
            setShowCategoryDialog(true);
          }
          handleMenuClose();
        }}>
          Change Category
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedTask) toggleImportant(selectedTask.id);
          handleMenuClose();
        }}>
          {selectedTask?.priority === 'high' ? 'Mark as Normal' : 'Mark as Important'}
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedTask) toggleTask(selectedTask.id);
          handleMenuClose();
        }}>
          {selectedTask?.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedTask) deleteTask(selectedTask.id);
        }} sx={{ color: 'error.main' }}>
          Delete Task
        </MenuItem>
      </Menu>

        {/* Category Selection Dialog */}
      <Dialog open={showCategoryDialog} onClose={() => setShowCategoryDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Select Category</Typography>
            <IconButton onClick={() => setShowCategoryDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
            Choose a category for: <strong>{editingTask?.title}</strong>
          </Typography>
          <Grid container spacing={2}>
            {categories.map((category) => (
              <Grid key={category.id} xs={6} sm={4}>
                <Paper
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: editingTask?.category === category.id ? 2 : 1,
                    borderColor: editingTask?.category === category.id ? category.color : 'divider',
                    backgroundColor: editingTask?.category === category.id ? `${category.color}08` : 'background.paper',
                    '&:hover': {
                      backgroundColor: `${category.color}12`,
                    },
                  }}
                  onClick={() => updateTaskCategory(editingTask?.id, category.id)}
                >
                  <Box display="flex" alignItems="center" flexDirection="column" gap={1}>
                    <Box
                      sx={{
                        width: 24,
                        height: 24,
                        borderRadius: '50%',
                        backgroundColor: category.color,
                      }}
                    />
                    <Typography variant="body2" align="center">
                      {category.name}
                    </Typography>
                  </Box>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowCategoryDialog(false)}>Cancel</Button>
        </DialogActions>
      </Dialog>

      {/* Task Reminders */}
      <TaskReminder tasks={tasks} />
    </PageLayout>
  );
};

export default Tasks;
