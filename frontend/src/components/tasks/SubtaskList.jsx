import React, { useState } from 'react';
import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  IconButton,
  TextField,
  Button,
  Typography,
  Chip,
  Collapse,
  Tooltip,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  ExpandMore as ExpandMoreIcon,
  ExpandLess as ExpandLessIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
  Delete as DeleteIcon,
  Edit as EditIcon,
} from '@mui/icons-material';

const SubtaskList = ({ subtasks, onAddSubtask, onUpdateSubtask, onDeleteSubtask, taskId }) => {
  const [expanded, setExpanded] = useState(true);
  const [newSubtaskTitle, setNewSubtaskTitle] = useState('');
  const [addingSubtask, setAddingSubtask] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedSubtask, setSelectedSubtask] = useState(null);

  const handleAddSubtask = () => {
    if (newSubtaskTitle.trim()) {
      onAddSubtask(taskId, {
        id: Date.now(),
        title: newSubtaskTitle.trim(),
        completed: false,
        createdAt: new Date().toISOString()
      });
      setNewSubtaskTitle('');
      setAddingSubtask(false);
    }
  };

  const toggleSubtask = (subtaskId) => {
    const subtask = subtasks.find(st => st.id === subtaskId);
    if (subtask) {
      onUpdateSubtask(taskId, subtaskId, { ...subtask, completed: !subtask.completed });
    }
  };

  const handleMenuClick = (event, subtask) => {
    setAnchorEl(event.currentTarget);
    setSelectedSubtask(subtask);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedSubtask(null);
  };

  const completedSubtasks = subtasks.filter(st => st.completed).length;
  const totalSubtasks = subtasks.length;
  const progress = totalSubtasks > 0 ? (completedSubtasks / totalSubtasks) * 100 : 0;

  return (
    <Box sx={{ ml: 3, mt: 1, mb: 1 }}>
      {/* Subtask Header */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'space-between',
          cursor: 'pointer',
          py: 0.5
        }}
        onClick={() => setExpanded(!expanded)}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          {expanded ? <ExpandLessIcon fontSize="small" /> : <ExpandMoreIcon fontSize="small" />}
          <Typography variant="caption" color="text.secondary">
            Subtasks ({completedSubtasks}/{totalSubtasks})
          </Typography>
          {totalSubtasks > 0 && (
            <Box sx={{ width: 60, height: 4, backgroundColor: 'grey.300', borderRadius: 2, overflow: 'hidden' }}>
              <Box 
                sx={{ 
                  width: `${progress}%`, 
                  height: '100%', 
                  backgroundColor: 'primary.main',
                  transition: 'width 0.3s ease'
                }} 
              />
            </Box>
          )}
        </Box>
        <IconButton 
          size="small" 
          onClick={(e) => {
            e.stopPropagation();
            setAddingSubtask(true);
          }}
        >
          <AddIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* Add Subtask Form */}
      <Collapse in={addingSubtask}>
        <Box sx={{ display: 'flex', gap: 1, mb: 1 }}>
          <TextField
            size="small"
            fullWidth
            placeholder="Add subtask..."
            value={newSubtaskTitle}
            onChange={(e) => setNewSubtaskTitle(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
            autoFocus
          />
          <Button size="small" onClick={handleAddSubtask} disabled={!newSubtaskTitle.trim()}>
            Add
          </Button>
          <Button size="small" onClick={() => {
            setAddingSubtask(false);
            setNewSubtaskTitle('');
          }}>
            Cancel
          </Button>
        </Box>
      </Collapse>

      {/* Subtasks List */}
      <Collapse in={expanded}>
        <List dense sx={{ py: 0 }}>
          {subtasks.length === 0 ? (
            <Box sx={{ p: 1, textAlign: 'center' }}>
              <Typography variant="caption" color="text.secondary">
                No subtasks yet. Click + to add one.
              </Typography>
            </Box>
          ) : (
            subtasks.map((subtask) => (
              <ListItem
                key={subtask.id}
                sx={{ 
                  py: 0.5,
                  pl: 1,
                  backgroundColor: 'background.paper',
                  borderRadius: 1,
                  mb: 0.5,
                  border: '1px solid',
                  borderColor: 'divider',
                  '&:hover': {
                    backgroundColor: 'action.hover'
                  }
                }}
                secondaryAction={
                  <IconButton
                    edge="end"
                    size="small"
                    onClick={(e) => handleMenuClick(e, subtask)}
                  >
                    <MoreVertIcon fontSize="small" />
                  </IconButton>
                }
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <IconButton
                    size="small"
                    onClick={() => toggleSubtask(subtask.id)}
                    sx={{ p: 0.5 }}
                  >
                    {subtask.completed ? (
                      <CheckCircleIcon 
                        fontSize="small" 
                        color="primary" 
                        sx={{ fontSize: 16 }}
                      />
                    ) : (
                      <RadioButtonUncheckedIcon 
                        fontSize="small" 
                        sx={{ fontSize: 16 }}
                      />
                    )}
                  </IconButton>
                </ListItemIcon>
                <ListItemText
                  primary={
                    <Typography
                      variant="body2"
                      sx={{
                        textDecoration: subtask.completed ? 'line-through' : 'none',
                        color: subtask.completed ? 'text.secondary' : 'text.primary',
                      }}
                    >
                      {subtask.title}
                    </Typography>
                  }
                />
                {subtask.completed && (
                  <Chip
                    label="Done"
                    size="small"
                    color="success"
                    variant="outlined"
                    sx={{ ml: 1, height: 20, fontSize: '0.6rem' }}
                  />
                )}
              </ListItem>
            ))
          )}
        </List>
      </Collapse>

      {/* Subtask Menu */}
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
          if (selectedSubtask) {
            toggleSubtask(selectedSubtask.id);
          }
          handleMenuClose();
        }}>
          {selectedSubtask?.completed ? 'Mark as Incomplete' : 'Mark as Complete'}
        </MenuItem>
        <MenuItem onClick={() => {
          if (selectedSubtask) {
            onDeleteSubtask(taskId, selectedSubtask.id);
          }
          handleMenuClose();
        }} sx={{ color: 'error.main' }}>
          Delete Subtask
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default SubtaskList;
