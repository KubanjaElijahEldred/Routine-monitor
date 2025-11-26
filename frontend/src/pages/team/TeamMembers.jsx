import React, { useState } from 'react';
import { 
  Box, 
  Typography, 
  Paper, 
  Grid, 
  Avatar, 
  Table, 
  TableBody, 
  TableCell, 
  TableContainer, 
  TableHead, 
  TableRow, 
  IconButton, 
  Button,
  TextField,
  InputAdornment,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import { 
  PersonAdd as PersonAddIcon, 
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Close as CloseIcon
} from '@mui/icons-material';

const TeamMembers = () => {
  console.log('TeamMembers component is rendering');
  
  const [teamMembers, setTeamMembers] = useState([
    {
      id: 1,
      name: 'John Smith',
      email: 'john.smith@company.com',
      phone: '+1 (555) 123-4567',
      role: 'Team Lead',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
      joinDate: '2023-01-15'
    },
    {
      id: 2,
      name: 'Sarah Johnson',
      email: 'sarah.j@company.com',
      phone: '+1 (555) 234-5678',
      role: 'Senior Developer',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
      joinDate: '2023-02-20'
    },
    {
      id: 3,
      name: 'Mike Davis',
      email: 'mike.davis@company.com',
      phone: '+1 (555) 345-6789',
      role: 'UX Designer',
      status: 'Active',
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      joinDate: '2023-03-10'
    }
  ]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMode, setDialogMode] = useState('create'); // 'create', 'edit'
  const [selectedMember, setSelectedMember] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    role: '',
    status: 'Active'
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  console.log('TeamMembers state:', { teamMembers: teamMembers.length, loading, error });

  React.useEffect(() => {
    const fetchTeamMembers = async () => {
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/team/members');
        // const data = await response.json();
        // setTeamMembers(data);
        
        // Sample data for demonstration
        setTeamMembers([
          {
            id: 1,
            name: 'John Smith',
            email: 'john.smith@company.com',
            phone: '+1 (555) 123-4567',
            role: 'Team Lead',
            status: 'Active',
            avatar: 'https://randomuser.me/api/portraits/men/1.jpg',
            joinDate: '2023-01-15'
          },
          {
            id: 2,
            name: 'Sarah Johnson',
            email: 'sarah.j@company.com',
            phone: '+1 (555) 234-5678',
            role: 'Senior Developer',
            status: 'Active',
            avatar: 'https://randomuser.me/api/portraits/women/1.jpg',
            joinDate: '2023-02-20'
          },
          {
            id: 3,
            name: 'Mike Davis',
            email: 'mike.davis@company.com',
            phone: '+1 (555) 345-6789',
            role: 'UX Designer',
            status: 'Active',
            avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
            joinDate: '2023-03-10'
          },
          {
            id: 4,
            name: 'Emily Chen',
            email: 'emily.chen@company.com',
            phone: '+1 (555) 456-7890',
            role: 'Product Manager',
            status: 'Away',
            avatar: 'https://randomuser.me/api/portraits/women/2.jpg',
            joinDate: '2023-04-05'
          },
          {
            id: 5,
            name: 'Alex Wilson',
            email: 'alex.w@company.com',
            phone: '+1 (555) 567-8901',
            role: 'Junior Developer',
            status: 'Active',
            avatar: 'https://randomuser.me/api/portraits/men/3.jpg',
            joinDate: '2023-05-12'
          }
        ]);
      } catch (err) {
        setError('Failed to load team members');
        console.error('Error fetching team members:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTeamMembers();
  }, []);

  // CRUD Functions
  const handleCreateMember = () => {
    setDialogMode('create');
    setSelectedMember(null);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      status: 'Active'
    });
    setOpenDialog(true);
  };

  const handleEditMember = (member) => {
    setDialogMode('edit');
    setSelectedMember(member);
    setFormData({
      name: member.name,
      email: member.email,
      phone: member.phone,
      role: member.role,
      status: member.status
    });
    setOpenDialog(true);
  };

  const handleDeleteMember = (member) => {
    if (window.confirm(`Are you sure you want to delete ${member.name}?`)) {
      setTeamMembers(teamMembers.filter(m => m.id !== member.id));
      setSnackbar({
        open: true,
        message: `${member.name} has been removed from the team`,
        severity: 'success'
      });
    }
  };

  const handleSaveMember = () => {
    if (!formData.name || !formData.email || !formData.role) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    if (dialogMode === 'create') {
      const newMember = {
        id: Math.max(...teamMembers.map(m => m.id), 0) + 1,
        ...formData,
        avatar: `https://randomuser.me/api/portraits/${Math.random() > 0.5 ? 'men' : 'women'}/${Math.floor(Math.random() * 100)}.jpg`,
        joinDate: new Date().toISOString().split('T')[0]
      };
      setTeamMembers([...teamMembers, newMember]);
      setSnackbar({
        open: true,
        message: `${newMember.name} has been added to the team`,
        severity: 'success'
      });
    } else {
      const updatedMembers = teamMembers.map(m => 
        m.id === selectedMember.id ? { ...m, ...formData } : m
      );
      setTeamMembers(updatedMembers);
      setSnackbar({
        open: true,
        message: `${formData.name}'s information has been updated`,
        severity: 'success'
      });
    }

    setOpenDialog(false);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setFormData({
      name: '',
      email: '',
      phone: '',
      role: '',
      status: 'Active'
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const filteredMembers = teamMembers.filter(member =>
    member.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    member.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>Team Members Test</Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h6" fontWeight="bold">Team Members</Typography>
        <Button 
          variant="contained" 
          color="primary"
          startIcon={<PersonAddIcon />}
          onClick={handleCreateMember}
        >
          Add Member
        </Button>
      </Box>

      {loading && (
        <Box display="flex" justifyContent="center" p={4}>
          <CircularProgress />
        </Box>
      )}

      {error && (
        <Box sx={{ p: 2, bgcolor: 'error.light', color: 'error.contrastText', borderRadius: 1, mb: 2 }}>
          <Typography>{error}</Typography>
        </Box>
      )}

      {!loading && teamMembers.length === 0 && (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <PersonAddIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h6" gutterBottom>No Team Members</Typography>
          <Typography color="text.secondary" paragraph>
            Get started by adding your first team member
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            startIcon={<PersonAddIcon />}
            onClick={handleCreateMember}
          >
            Add Team Member
          </Button>
        </Paper>
      )}

      {teamMembers.length > 0 && (
        <Paper sx={{ mb: 3, p: 2 }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography variant="subtitle1" fontWeight="medium">
              {filteredMembers.length} {filteredMembers.length === 1 ? 'Member' : 'Members'} shown
            </Typography>
          <TextField
            size="small"
            placeholder="Search members..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon color="action" />
                </InputAdornment>
              ),
            }}
          />
        </Box>

        {filteredMembers.length > 0 ? (

        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Member</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Status</TableCell>
                <TableCell>Join Date</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredMembers.map((member) => (
                <TableRow key={member.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        src={member.avatar} 
                        alt={member.name}
                        sx={{ width: 40, height: 40, mr: 2 }}
                      />
                      <Box>
                        <Typography variant="subtitle2" fontWeight="medium">
                          {member.name}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {member.email}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">{member.role}</Typography>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <EmailIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {member.email}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <PhoneIcon fontSize="small" sx={{ mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {member.phone}
                      </Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box 
                      sx={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        px: 1.5,
                        py: 0.5,
                        borderRadius: 1,
                        bgcolor: member.status === 'Active' ? 'success.light' : 'grey.200',
                        color: member.status === 'Active' ? 'success.dark' : 'text.primary',
                      }}
                    >
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: member.status === 'Active' ? 'success.main' : 'grey.500',
                          mr: 1,
                        }}
                      />
                      {member.status}
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(member.joinDate).toLocaleDateString()}
                    </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small" onClick={() => handleEditMember(member)}>
                      <EditIcon fontSize="small" />
                    </IconButton>
                    <IconButton size="small" color="error" onClick={() => handleDeleteMember(member)}>
                      <DeleteIcon fontSize="small" />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        ) : (
          <Box sx={{ textAlign: 'center', py: 4 }}>
            <Typography color="text.secondary">
              No team members found matching "{searchQuery}"
            </Typography>
            <Button onClick={() => setSearchQuery('')} sx={{ mt: 1 }}>
              Clear Search
            </Button>
          </Box>
        )}
      </Paper>
      )}

      {/* CRUD Dialog */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>
          {dialogMode === 'create' ? 'Add Team Member' : 'Edit Team Member'}
        </DialogTitle>
        <DialogContent>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, pt: 1 }}>
            <TextField
              label="Name"
              fullWidth
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
            />
            
            <TextField
              label="Email"
              type="email"
              fullWidth
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
            
            <TextField
              label="Phone"
              fullWidth
              value={formData.phone}
              onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            />
            
            <FormControl fullWidth required>
              <InputLabel>Role</InputLabel>
              <Select
                value={formData.role}
                label="Role"
                onChange={(e) => setFormData({ ...formData, role: e.target.value })}
              >
                <MenuItem value="Team Lead">Team Lead</MenuItem>
                <MenuItem value="Senior Developer">Senior Developer</MenuItem>
                <MenuItem value="Developer">Developer</MenuItem>
                <MenuItem value="Junior Developer">Junior Developer</MenuItem>
                <MenuItem value="UX Designer">UX Designer</MenuItem>
                <MenuItem value="Product Manager">Product Manager</MenuItem>
                <MenuItem value="QA Engineer">QA Engineer</MenuItem>
                <MenuItem value="DevOps Engineer">DevOps Engineer</MenuItem>
              </Select>
            </FormControl>
            
            <FormControl fullWidth>
              <InputLabel>Status</InputLabel>
              <Select
                value={formData.status}
                label="Status"
                onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              >
                <MenuItem value="Active">Active</MenuItem>
                <MenuItem value="Away">Away</MenuItem>
                <MenuItem value="On Leave">On Leave</MenuItem>
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleSaveMember} variant="contained">
            {dialogMode === 'create' ? 'Add Member' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
          severity={snackbar.severity}
          sx={{ width: '100%' }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default TeamMembers;
