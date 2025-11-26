import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  TextField,
  Grid,
  Divider,
  useTheme,
  IconButton,
  InputAdornment,
  FormControl,
  InputLabel,
  OutlinedInput,
  FormHelperText
} from '@mui/material';
import {
  Person as PersonIcon,
  Edit as EditIcon,
  Visibility,
  VisibilityOff,
  Save as SaveIcon,
  Cancel as CancelIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  Work as WorkIcon
} from '@mui/icons-material';

const Profile = () => {
  const theme = useTheme();
  const [editMode, setEditMode] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profile, setProfile] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    phone: '+1 (555) 123-4567',
    position: 'Senior Developer',
    department: 'Engineering',
    location: 'San Francisco, CA',
    bio: 'Experienced developer with a passion for creating efficient and user-friendly applications.'
  });

  const [formData, setFormData] = useState({ ...profile });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors({
        ...errors,
        [name]: null
      });
    }
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }
    
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSave = () => {
    if (validateForm()) {
      setProfile({ ...formData });
      setEditMode(false);
    }
  };

  const handleCancel = () => {
    setFormData({ ...profile });
    setErrors({});
    setEditMode(false);
  };

  const renderField = (label, name, value, icon, type = 'text', required = false) => (
    <Grid>
      {editMode ? (
        <TextField
          fullWidth
          label={label}
          name={name}
          value={value}
          onChange={handleChange}
          variant="outlined"
          margin="normal"
          error={!!errors[name]}
          helperText={errors[name]}
          required={required}
          type={name === 'password' ? (showPassword ? 'text' : 'password') : type}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                {React.cloneElement(icon, { color: 'action' })}
              </InputAdornment>
            ),
            endAdornment: name === 'password' && (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            )
          }}
        />
      ) : (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Box sx={{ color: 'text.secondary', mr: 2, minWidth: 40, display: 'flex', justifyContent: 'center' }}>
            {icon}
          </Box>
          <Box>
            <Typography variant="caption" color="textSecondary" display="block">
              {label}
            </Typography>
            <Typography variant="body1">
              {value || 'Not specified'}
            </Typography>
          </Box>
        </Box>
      )}
    </Grid>
  );

  return (
    <Box sx={{ p: 3, pt: 8, maxWidth: 1200, mx: 'auto' }}>
      <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, alignItems: 'center', mb: 4 }}>
          <Box sx={{ position: 'relative', mr: { md: 4 }, mb: { xs: 2, md: 0 } }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                fontSize: 48,
                bgcolor: theme.palette.primary.main,
                color: theme.palette.primary.contrastText
              }}
            >
              {profile.name.split(' ').map(n => n[0]).join('')}
            </Avatar>
            {editMode && (
              <IconButton
                color="primary"
                sx={{
                  position: 'absolute',
                  bottom: -8,
                  right: -8,
                  bgcolor: 'background.paper',
                  boxShadow: 1,
                  '&:hover': {
                    bgcolor: 'background.paper'
                  }
                }}
              >
                <EditIcon />
              </IconButton>
            )}
          </Box>
          
          <Box sx={{ flex: 1, textAlign: { xs: 'center', md: 'left' }, mt: { xs: 2, md: 0 } }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {editMode ? (
                <TextField
                  fullWidth
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  variant="standard"
                  error={!!errors.name}
                  helperText={errors.name}
                  required
                  sx={{
                    '& .MuiInputBase-input': {
                      fontSize: '2rem',
                      fontWeight: 'bold',
                      color: 'text.primary',
                      py: 0.5
                    },
                    '& .MuiInput-underline:before': {
                      borderBottom: 'none'
                    },
                    '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                      borderBottom: 'none'
                    },
                    '& .MuiInput-underline:after': {
                      borderBottom: `2px solid ${theme.palette.primary.main}`
                    },
                    '& .MuiFormHelperText-root': {
                      position: 'absolute',
                      bottom: -24
                    }
                  }}
                />
              ) : (
                <Typography variant="h4" component="h1" gutterBottom>
                  {profile.name}
                </Typography>
              )}
            </Box>
            
            <Typography variant="subtitle1" color="textSecondary" gutterBottom>
              {profile.position} • {profile.department}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, justifyContent: { xs: 'center', md: 'flex-start' } }}>
              {!editMode ? (
                <Button
                  variant="outlined"
                  startIcon={<EditIcon />}
                  onClick={() => setEditMode(true)}
                  sx={{ mt: 1 }}
                >
                  Edit Profile
                </Button>
              ) : (
                <>
                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<SaveIcon />}
                    onClick={handleSave}
                    sx={{ mt: 1, mr: 1 }}
                  >
                    Save Changes
                  </Button>
                  <Button
                    variant="outlined"
                    color="inherit"
                    startIcon={<CancelIcon />}
                    onClick={handleCancel}
                    sx={{ mt: 1 }}
                  >
                    Cancel
                  </Button>
                </>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>

      <Grid container spacing={4}>
        <Grid>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
              <Typography variant="h6" component="h2" fontWeight="bold">
                Personal Information
              </Typography>
            </Box>
            
            <Divider sx={{ mb: 3 }} />
            
            <Grid container spacing={3}>
              {renderField('Full Name', 'name', formData.name, <PersonIcon />, 'text', true)}
              {renderField('Email', 'email', formData.email, <EmailIcon />, 'email', true)}
              {renderField('Phone', 'phone', formData.phone, <PhoneIcon />, 'tel')}
              {renderField('Location', 'location', formData.location, <LocationIcon />)}
              {renderField('Position', 'position', formData.position, <WorkIcon />)}
              {renderField('Department', 'department', formData.department, <WorkIcon />)}
              
              <Grid>
                <FormControl fullWidth margin="normal">
                  <InputLabel htmlFor="bio" shrink>
                    Bio
                  </InputLabel>
                  {editMode ? (
                    <TextField
                      id="bio"
                      name="bio"
                      value={formData.bio}
                      onChange={handleChange}
                      multiline
                      rows={4}
                      variant="outlined"
                      placeholder="Tell us about yourself..."
                    />
                  ) : (
                    <Box sx={{ display: 'flex', mt: 2 }}>
                      <Box sx={{ color: 'text.secondary', mr: 2, minWidth: 40, display: 'flex', justifyContent: 'center' }}>
                        <PersonIcon />
                      </Box>
                      <Typography variant="body1" sx={{ whiteSpace: 'pre-line' }}>
                        {formData.bio || 'No bio provided'}
                      </Typography>
                    </Box>
                  )}
                </FormControl>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
        
        <Grid>
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2, mb: 4 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              Account Security
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 3 }}>
              <Typography variant="subtitle2" gutterBottom>Email Verification</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Box sx={{ flex: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    {profile.email}
                  </Typography>
                  <Typography variant="caption" color="success.main">
                    Verified
                  </Typography>
                </Box>
                <Button size="small" color="primary">
                  Change
                </Button>
              </Box>
            </Box>
            
            <Box>
              <Typography variant="subtitle2" gutterBottom>Password</Typography>
              <Button 
                variant="outlined" 
                fullWidth 
                onClick={() => {/* Handle password change */}}
                sx={{ mt: 1 }}
              >
                Change Password
              </Button>
            </Box>
          </Paper>
          
          <Paper elevation={2} sx={{ p: 4, borderRadius: 2 }}>
            <Typography variant="h6" component="h2" fontWeight="bold" gutterBottom>
              Connected Accounts
            </Typography>
            <Divider sx={{ mb: 3 }} />
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar src="https://cdn-icons-png.flaticon.com/512/124/124010.png" sx={{ width: 24, height: 24, mr: 2 }} />
                <Typography variant="body2">Connected with Facebook</Typography>
                <Button size="small" color="error" sx={{ ml: 'auto' }}>Remove</Button>
              </Box>
              <Typography variant="caption" color="textSecondary">Last login: 2 days ago</Typography>
            </Box>
            
            <Box sx={{ mb: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar src="https://cdn-icons-png.flaticon.com/512/300/300221.png" sx={{ width: 24, height: 24, mr: 2 }} />
                <Typography variant="body2">Not connected to Google</Typography>
                <Button size="small" color="primary" sx={{ ml: 'auto' }}>Connect</Button>
              </Box>
            </Box>
            
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                <Avatar src="https://cdn-icons-png.flaticon.com/512/25/25231.png" sx={{ width: 24, height: 24, mr: 2 }} />
                <Typography variant="body2">Not connected to GitHub</Typography>
                <Button size="small" color="primary" sx={{ ml: 'auto' }}>Connect</Button>
              </Box>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Profile;
