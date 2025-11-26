import React, { useState } from 'react';
import {
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Grid,
  Card,
  CardContent,
  CardActions,
  IconButton,
  TextField,
  Chip,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  Tooltip,
  Menu,
  MenuItem,
  Badge,
} from '@mui/material';
import {
  Add as AddIcon,
  Dashboard as TemplateIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  ContentCopy as ContentCopyIcon,
  MoreVert as MoreVertIcon,
  CheckCircle as CheckCircleIcon,
  RadioButtonUnchecked as RadioButtonUncheckedIcon,
} from '@mui/icons-material';

const TaskTemplates = ({ templates, onCreateTemplate, onUseTemplate, onEditTemplate, onDeleteTemplate }) => {
  const [open, setOpen] = useState(false);
  const [templateForm, setTemplateForm] = useState({
    name: '',
    description: '',
    category: 'personal',
    priority: 'medium',
    subtasks: [],
    tags: []
  });
  const [newSubtask, setNewSubtask] = useState('');
  const [editingTemplate, setEditingTemplate] = useState(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setTemplateForm({
      name: '',
      description: '',
      category: 'personal',
      priority: 'medium',
      subtasks: [],
      tags: []
    });
    setEditingTemplate(null);
  };

  const handleSubmit = () => {
    if (!templateForm.name.trim()) return;

    const templateData = {
      ...templateForm,
      id: editingTemplate ? editingTemplate.id : Date.now(),
      name: templateForm.name.trim(),
      description: templateForm.description.trim(),
      createdAt: editingTemplate ? editingTemplate.createdAt : new Date().toISOString(),
      updatedAt: new Date().toISOString()
    };

    if (editingTemplate) {
      onEditTemplate(templateData);
    } else {
      onCreateTemplate(templateData);
    }

    handleClose();
  };

  const handleEditTemplate = (template) => {
    setEditingTemplate(template);
    setTemplateForm({
      name: template.name,
      description: template.description,
      category: template.category,
      priority: template.priority,
      subtasks: template.subtasks || [],
      tags: template.tags || []
    });
    setOpen(true);
  };

  const handleAddSubtask = () => {
    if (newSubtask.trim()) {
      setTemplateForm({
        ...templateForm,
        subtasks: [
          ...templateForm.subtasks,
          {
            id: Date.now(),
            title: newSubtask.trim(),
            completed: false
          }
        ]
      });
      setNewSubtask('');
    }
  };

  const handleRemoveSubtask = (subtaskId) => {
    setTemplateForm({
      ...templateForm,
      subtasks: templateForm.subtasks.filter(st => st.id !== subtaskId)
    });
  };

  const handleMenuClick = (event, template) => {
    setAnchorEl(event.currentTarget);
    setSelectedTemplate(template);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedTemplate(null);
  };

  const categories = [
    { id: 'work', name: 'Work', color: '#1976d2' },
    { id: 'personal', name: 'Personal', color: '#388e3c' },
    { id: 'development', name: 'Development', color: '#7b1fa2' },
    { id: 'documentation', name: 'Documentation', color: '#f57c00' },
    { id: 'shopping', name: 'Shopping', color: '#d32f2f' },
  ];

  const priorities = ['low', 'medium', 'high', 'urgent'];

  return (
    <Box>
      <Button
        variant="outlined"
        startIcon={<TemplateIcon />}
        onClick={handleOpen}
        sx={{ mb: 2 }}
      >
        Use Template
      </Button>

      {/* Template Dialog */}
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          <Typography variant="h6">
            {editingTemplate ? 'Edit Template' : 'Task Templates'}
          </Typography>
        </DialogTitle>
        <DialogContent>
          {!editingTemplate && templates.length === 0 ? (
            <Box textAlign="center" py={4}>
              <TemplateIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
              <Typography variant="h6" color="text.secondary" gutterBottom>
                No Templates Yet
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                Create templates to quickly add common tasks with predefined subtasks and settings.
              </Typography>
              <Button
                variant="contained"
                startIcon={<AddIcon />}
                onClick={() => setEditingTemplate({})}
              >
                Create First Template
              </Button>
            </Box>
          ) : editingTemplate !== null ? (
            // Template Form
            <Box>
              <Grid container spacing={2}>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Template Name"
                    value={templateForm.name}
                    onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                    margin="normal"
                    required
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Description"
                    value={templateForm.description}
                    onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                    margin="normal"
                  />
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Category"
                    value={templateForm.category}
                    onChange={(e) => setTemplateForm({ ...templateForm, category: e.target.value })}
                    margin="normal"
                  >
                    {categories.map((category) => (
                      <MenuItem key={category.id} value={category.id}>
                        {category.name}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid xs={12} sm={6}>
                  <TextField
                    select
                    fullWidth
                    label="Priority"
                    value={templateForm.priority}
                    onChange={(e) => setTemplateForm({ ...templateForm, priority: e.target.value })}
                    margin="normal"
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority.charAt(0).toUpperCase() + priority.slice(1)}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
              </Grid>

              {/* Subtasks */}
              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Default Subtasks
                </Typography>
                <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                  <TextField
                    size="small"
                    placeholder="Add subtask..."
                    value={newSubtask}
                    onChange={(e) => setNewSubtask(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddSubtask()}
                  />
                  <Button onClick={handleAddSubtask} disabled={!newSubtask.trim()}>
                    Add
                  </Button>
                </Box>
                <List dense>
                  {templateForm.subtasks.map((subtask) => (
                    <ListItem
                      key={subtask.id}
                      secondaryAction={
                        <IconButton
                          edge="end"
                          size="small"
                          onClick={() => handleRemoveSubtask(subtask.id)}
                        >
                          <DeleteIcon fontSize="small" />
                        </IconButton>
                      }
                    >
                      <ListItemIcon>
                        <RadioButtonUncheckedIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary={subtask.title} />
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          ) : (
            // Templates List
            <Grid container spacing={2}>
              {templates.map((template) => (
                <Grid xs={12} sm={6} md={4}>
                  <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box display="flex" justifyContent="space-between" alignItems="flex-start" mb={1}>
                        <Typography variant="h6" component="h3">
                          {template.name}
                        </Typography>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuClick(e, template)}
                        >
                          <MoreVertIcon fontSize="small" />
                        </IconButton>
                      </Box>
                      {template.description && (
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                          {template.description}
                        </Typography>
                      )}
                      <Box display="flex" gap={1} mb={2} flexWrap="wrap">
                        <Chip
                          label={template.category}
                          size="small"
                          variant="outlined"
                        />
                        <Chip
                          label={template.priority}
                          size="small"
                          variant="outlined"
                          color={
                            template.priority === 'urgent' || template.priority === 'high' 
                              ? 'error' 
                              : template.priority === 'medium' 
                              ? 'warning' 
                              : 'primary'
                          }
                        />
                      </Box>
                      {template.subtasks && template.subtasks.length > 0 && (
                        <Box>
                          <Typography variant="caption" color="text.secondary">
                            {template.subtasks.length} subtask{template.subtasks.length > 1 ? 's' : ''}
                          </Typography>
                          <List dense sx={{ mt: 1 }}>
                            {template.subtasks.slice(0, 3).map((subtask) => (
                              <ListItem key={subtask.id} sx={{ py: 0, px: 0 }}>
                                <ListItemIcon sx={{ minWidth: 24 }}>
                                  <RadioButtonUncheckedIcon fontSize="small" />
                                </ListItemIcon>
                                <ListItemText 
                                  primary={subtask.title}
                                  primaryTypographyProps={{ variant: 'caption' }}
                                />
                              </ListItem>
                            ))}
                            {template.subtasks.length > 3 && (
                              <Typography variant="caption" color="text.secondary">
                                +{template.subtasks.length - 3} more
                              </Typography>
                            )}
                          </List>
                        </Box>
                      )}
                    </CardContent>
                    <CardActions>
                      <Button
                        size="small"
                        startIcon={<ContentCopyIcon />}
                        onClick={() => onUseTemplate(template)}
                      >
                        Use Template
                      </Button>
                    </CardActions>
                  </Card>
                </Grid>
              ))}
              <Grid xs={12} sm={6} md={4}>
                <Card
                  sx={{
                    height: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    border: '2px dashed',
                    borderColor: 'divider',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: 'action.hover'
                    }
                  }}
                  onClick={() => setEditingTemplate({})}
                >
                  <CardContent sx={{ textAlign: 'center' }}>
                    <AddIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 1 }} />
                    <Typography variant="h6" color="text.secondary">
                      Create Template
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          )}
        </DialogContent>
        <DialogActions>
          {editingTemplate !== null && (
            <>
              <Button onClick={handleClose}>Cancel</Button>
              <Button onClick={handleSubmit} variant="contained" disabled={!templateForm.name.trim()}>
                {editingTemplate.id ? 'Update Template' : 'Create Template'}
              </Button>
            </>
          )}
        </DialogActions>
      </Dialog>

      {/* Template Menu */}
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
          handleEditTemplate(selectedTemplate);
          handleMenuClose();
        }}>
          <EditIcon fontSize="small" sx={{ mr: 1 }} />
          Edit
        </MenuItem>
        <MenuItem onClick={() => {
          onUseTemplate(selectedTemplate);
          handleMenuClose();
        }}>
          <ContentCopyIcon fontSize="small" sx={{ mr: 1 }} />
          Use Template
        </MenuItem>
        <MenuItem 
          onClick={() => {
            onDeleteTemplate(selectedTemplate.id);
            handleMenuClose();
          }}
          sx={{ color: 'error.main' }}
        >
          <DeleteIcon fontSize="small" sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default TaskTemplates;
