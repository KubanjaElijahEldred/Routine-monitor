import React, { useState } from 'react';
import {
  Box,
  Chip,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
  Menu,
  MenuItem,
  Tooltip,
} from '@mui/material';
import {
  Label as LabelIcon,
  Add as AddIcon,
  Close as CloseIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
} from '@mui/icons-material';

const TaskLabels = ({ taskId, taskLabels, availableLabels, onAddLabel, onRemoveLabel, onCreateLabel }) => {
  const [showLabelDialog, setShowLabelDialog] = useState(false);
  const [newLabelName, setNewLabelName] = useState('');
  const [newLabelColor, setNewLabelColor] = useState('#1976d2');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedLabel, setSelectedLabel] = useState(null);

  const predefinedColors = [
    '#1976d2', '#388e3c', '#d32f2f', '#7b1fa2', '#2563eb',
    '#00796b', '#c2185b', '#455a64', '#5e35b1', '#689f38'
  ];

  const handleAddNewLabel = () => {
    if (newLabelName.trim()) {
      onCreateLabel({
        id: Date.now(),
        name: newLabelName.trim(),
        color: newLabelColor,
        createdAt: new Date().toISOString()
      });
      setNewLabelName('');
      setNewLabelColor('#1976d2');
    }
  };

  const handleLabelClick = (label) => {
    const isLabelApplied = taskLabels.some(taskLabel => taskLabel.id === label.id);
    if (isLabelApplied) {
      onRemoveLabel(taskId, label.id);
    } else {
      onAddLabel(taskId, label);
    }
  };

  const handleMenuClick = (event, label) => {
    setAnchorEl(event.currentTarget);
    setSelectedLabel(label);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedLabel(null);
  };

  const handleDeleteLabel = () => {
    if (selectedLabel) {
      // Remove label from all tasks that have it
      onRemoveLabel(taskId, selectedLabel.id, true); // true indicates delete label globally
    }
    handleMenuClose();
  };

  return (
    <Box>
      {/* Applied Labels */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mb: 1 }}>
        {taskLabels.map((label) => (
          <Chip
            key={label.id}
            icon={<LabelIcon fontSize="small" />}
            label={label.name}
            size="small"
            sx={{
              backgroundColor: label.color,
              color: 'white',
              '& .MuiChip-icon': {
                color: 'white',
              },
              '&:hover': {
                opacity: 0.8,
              },
            }}
            onDelete={() => onRemoveLabel(taskId, label.id)}
            deleteIcon={<CloseIcon fontSize="small" />}
          />
        ))}
        <Chip
          icon={<AddIcon fontSize="small" />}
          label="Add Label"
          size="small"
          variant="outlined"
          onClick={() => setShowLabelDialog(true)}
          sx={{ cursor: 'pointer' }}
        />
      </Box>

      {/* Label Management Dialog */}
      <Dialog open={showLabelDialog} onClose={() => setShowLabelDialog(false)} maxWidth="sm" fullWidth>
        <DialogTitle>
          <Box display="flex" alignItems="center" justifyContent="space-between">
            <Typography variant="h6">Manage Labels</Typography>
            <IconButton onClick={() => setShowLabelDialog(false)} size="small">
              <CloseIcon />
            </IconButton>
          </Box>
        </DialogTitle>
        <DialogContent>
          {/* Create New Label */}
          <Box sx={{ mb: 3, p: 2, backgroundColor: 'grey.50', borderRadius: 1 }}>
            <Typography variant="subtitle2" gutterBottom>
              Create New Label
            </Typography>
            <Box sx={{ display: 'flex', gap: 1, mb: 2, alignItems: 'center' }}>
              <TextField
                size="small"
                placeholder="Label name..."
                value={newLabelName}
                onChange={(e) => setNewLabelName(e.target.value)}
                sx={{ flex: 1 }}
              />
              <Box sx={{ display: 'flex', gap: 0.5 }}>
                {predefinedColors.slice(0, 5).map((color) => (
                  <Box
                    key={color}
                    sx={{
                      width: 24,
                      height: 24,
                      borderRadius: '50%',
                      backgroundColor: color,
                      cursor: 'pointer',
                      border: newLabelColor === color ? '2px solid #000' : '2px solid transparent',
                    }}
                    onClick={() => setNewLabelColor(color)}
                  />
                ))}
              </Box>
            </Box>
            <Button
              variant="contained"
              size="small"
              onClick={handleAddNewLabel}
              disabled={!newLabelName.trim()}
              startIcon={<AddIcon />}
            >
              Create Label
            </Button>
          </Box>

          {/* Available Labels */}
          <Box>
            <Typography variant="subtitle2" gutterBottom>
              Available Labels
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {availableLabels.map((label) => {
                const isApplied = taskLabels.some(taskLabel => taskLabel.id === label.id);
                return (
                  <Chip
                    key={label.id}
                    icon={<LabelIcon fontSize="small" />}
                    label={label.name}
                    size="small"
                    sx={{
                      backgroundColor: isApplied ? label.color : 'transparent',
                      color: isApplied ? 'white' : label.color,
                      border: isApplied ? 'none' : `1px solid ${label.color}`,
                      '& .MuiChip-icon': {
                        color: isApplied ? 'white' : label.color,
                      },
                      cursor: 'pointer',
                      '&:hover': {
                        opacity: 0.8,
                      },
                    }}
                    onClick={() => handleLabelClick(label)}
                    onDelete={(e) => {
                      e.stopPropagation();
                      handleMenuClick(e, label);
                    }}
                    deleteIcon={<MoreVertIcon fontSize="small" />}
                  />
                );
              })}
              {availableLabels.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No labels created yet. Create your first label above.
                </Typography>
              )}
            </Box>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowLabelDialog(false)}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Label Menu */}
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
          if (selectedLabel) {
            setNewLabelName(selectedLabel.name);
            setNewLabelColor(selectedLabel.color);
          }
          handleMenuClose();
        }}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit Label
        </MenuItem>
        <MenuItem 
          onClick={handleDeleteLabel}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete Label
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskLabels;
