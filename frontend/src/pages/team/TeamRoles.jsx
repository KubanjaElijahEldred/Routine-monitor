import React from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Card, 
  CardContent, 
  Button, 
  Divider, 
  List, 
  ListItem, 
  ListItemText, 
  ListItemSecondaryAction, 
  Switch,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem
} from '@mui/material';
import { 
  Security as SecurityIcon,
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const TeamRoles = () => {
  const [roles, setRoles] = React.useState([
    { 
      id: 1, 
      name: 'Admin', 
      description: 'Full access to all features and settings',
      permissions: ['all'],
      memberCount: 2,
      isDefault: true
    },
    { 
      id: 2, 
      name: 'Manager', 
      description: 'Can manage team members and tasks',
      permissions: ['manage_team', 'manage_tasks', 'view_reports'],
      memberCount: 3,
      isDefault: false
    },
    { 
      id: 3, 
      name: 'Member', 
      description: 'Can view and update assigned tasks',
      permissions: ['view_tasks', 'update_tasks'],
      memberCount: 15,
      isDefault: true
    },
  ]);

  const [openDialog, setOpenDialog] = React.useState(false);
  const [editingRole, setEditingRole] = React.useState(null);
  const [roleForm, setRoleForm] = React.useState({
    name: '',
    description: '',
    permissions: []
  });

  const availablePermissions = [
    'view_dashboard',
    'manage_tasks',
    'view_tasks',
    'create_tasks',
    'edit_tasks',
    'delete_tasks',
    'manage_team',
    'invite_members',
    'remove_members',
    'edit_team_settings',
    'view_reports',
    'export_data',
    'manage_roles',
    'all'
  ];

  const handleOpenDialog = (role = null) => {
    if (role) {
      setEditingRole(role.id);
      setRoleForm({
        name: role.name,
        description: role.description,
        permissions: [...role.permissions]
      });
    } else {
      setEditingRole(null);
      setRoleForm({
        name: '',
        description: '',
        permissions: []
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingRole(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoleForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handlePermissionToggle = (permission) => {
    setRoleForm(prev => {
      const newPermissions = prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission];
      
      // If 'all' is selected, clear other permissions
      if (permission === 'all') {
        return {
          ...prev,
          permissions: newPermissions.includes('all') ? ['all'] : []
        };
      }
      
      // If any other permission is selected, remove 'all'
      if (newPermissions.includes('all') && permission !== 'all') {
        return {
          ...prev,
          permissions: newPermissions.filter(p => p !== 'all')
        };
      }
      
      return {
        ...prev,
        permissions: newPermissions
      };
    });
  };

  const handleSaveRole = () => {
    if (editingRole) {
      // Update existing role
      setRoles(roles.map(role => 
        role.id === editingRole 
          ? { ...role, ...roleForm }
          : role
      ));
    } else {
      // Add new role
      const newRole = {
        id: Math.max(...roles.map(r => r.id), 0) + 1,
        ...roleForm,
        memberCount: 0,
        isDefault: false
      };
      setRoles([...roles, newRole]);
    }
    handleCloseDialog();
  };

  const handleDeleteRole = (id) => {
    setRoles(roles.filter(role => role.id !== id));
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Box>
          <Typography variant="h6" fontWeight="bold">Roles & Permissions</Typography>
          <Typography variant="body2" color="text.secondary">
            Manage team roles and their permissions
          </Typography>
        </Box>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<AddIcon />}
          onClick={() => handleOpenDialog()}
        >
          Create Role
        </Button>
      </Box>

      <Grid container spacing={3}>
        {roles.map((role) => (
          <Grid key={role.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                  <Box>
                    <Typography variant="h6" component="div" gutterBottom>
                      {role.name}
                      {role.isDefault && (
                        <Box 
                          component="span" 
                          sx={{
                            ml: 1,
                            px: 1,
                            py: 0.5,
                            fontSize: '0.7rem',
                            bgcolor: 'primary.light',
                            color: 'primary.contrastText',
                            borderRadius: 1,
                            display: 'inline-block'
                          }}
                        >
                          Default
                        </Box>
                      )}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {role.description}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {role.memberCount} {role.memberCount === 1 ? 'member' : 'members'}
                    </Typography>
                  </Box>
                  {!role.isDefault && (
                    <Box>
                      <IconButton 
                        size="small" 
                        onClick={() => handleOpenDialog(role)}
                        sx={{ mr: 0.5 }}
                      >
                        <EditIcon fontSize="small" />
                      </IconButton>
                      <IconButton 
                        size="small" 
                        color="error"
                        onClick={() => handleDeleteRole(role.id)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  )}
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Permissions:
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {role.permissions.map(permission => (
                      <Box 
                        key={permission}
                        sx={{
                          px: 1,
                          py: 0.5,
                          bgcolor: 'action.selected',
                          borderRadius: 1,
                          fontSize: '0.7rem',
                          color: 'text.secondary'
                        }}
                      >
                        {permission.replace(/_/g, ' ')}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Role Edit/Create Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {editingRole ? 'Edit Role' : 'Create New Role'}
        </DialogTitle>
        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <TextField
              fullWidth
              label="Role Name"
              name="name"
              value={roleForm.name}
              onChange={handleInputChange}
              margin="normal"
              required
            />
            <TextField
              fullWidth
              label="Description"
              name="description"
              value={roleForm.description}
              onChange={handleInputChange}
              margin="normal"
              multiline
              rows={2}
            />
          </Box>
          
          <Typography variant="subtitle1" gutterBottom>
            Permissions
          </Typography>
          
          <Box sx={{ 
            border: '1px solid', 
            borderColor: 'divider', 
            borderRadius: 1,
            maxHeight: 300,
            overflow: 'auto',
            p: 1
          }}>
            <List dense>
              {availablePermissions.map((permission) => (
                <ListItem 
                  key={permission}
                  button
                  onClick={() => handlePermissionToggle(permission)}
                  sx={{ 
                    borderRadius: 1,
                    '&:hover': {
                      backgroundColor: 'action.hover',
                    },
                  }}
                >
                  <ListItemText 
                    primary={permission.replace(/_/g, ' ')} 
                    primaryTypographyProps={{ variant: 'body2' }}
                  />
                  <ListItemSecondaryAction>
                    <Switch
                      edge="end"
                      checked={roleForm.permissions.includes(permission)}
                      onChange={() => handlePermissionToggle(permission)}
                      color="primary"
                    />
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="inherit">
            Cancel
          </Button>
          <Button 
            onClick={handleSaveRole} 
            variant="contained" 
            color="primary"
            disabled={!roleForm.name}
          >
            {editingRole ? 'Update Role' : 'Create Role'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default TeamRoles;
