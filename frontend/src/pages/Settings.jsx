import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Divider,
  Switch,
  FormControlLabel,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  FormHelperText,
  useTheme,
  Tabs,
  Tab,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemSecondaryAction,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Snackbar,
  Alert,
  FormGroup,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  Chip,
  LinearProgress,
  Avatar,
  Badge,
  Tooltip,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Slider,
  InputAdornment,
  OutlinedInput
} from '@mui/material';
import {
  Settings as SettingsIcon,
  Notifications as NotificationsIcon,
  Security as SecurityIcon,
  Language as LanguageIcon,
  Delete as DeleteIcon,
  Save as SaveIcon,
  Close as CloseIcon,
  Check as CheckIcon,
  Email as EmailIcon,
  Lock as LockIcon,
  Palette as PaletteIcon,
  Info as InfoIcon,
  Person as PersonIcon,
  CloudUpload as CloudUploadIcon,
  CloudDownload as CloudDownloadIcon,
  Key as KeyIcon,
  Link as LinkIcon,
  Storage as StorageIcon,
  Speed as SpeedIcon,
  PrivacyTip as PrivacyTipIcon,
  History as HistoryIcon,
  Sync as SyncIcon,
  Backup as BackupIcon,
  Restore as RestoreIcon,
  Code as CodeIcon,
  Extension as ExtensionIcon,
  Schedule as ScheduleIcon,
  NotificationsActive as NotificationsActiveIcon,
  SecurityUpdateGood as SecurityUpdateGoodIcon,
  TextFields as TypographyIcon,
  AccountTree as AccountTreeIcon,
  DataUsage as DataUsageIcon,
  FilterList as FilterListIcon,
  Tune as TuneIcon,
  DeveloperMode as DeveloperModeIcon,
  ExpandMore as ExpandMoreIcon
} from '@mui/icons-material';

// Tab panel component
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`settings-tabpanel-${index}`}
      aria-labelledby={`settings-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `settings-tab-${index}`,
    'aria-controls': `settings-tabpanel-${index}`,
  };
}

const Settings = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [openDialog, setOpenDialog] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  
  // Notification settings
  const [notificationSettings, setNotificationSettings] = useState({
    email: true,
    push: true,
    sound: true,
    marketing: false,
    reminders: true,
    mentions: true,
    desktop: true,
    mobile: true,
    weeklyDigest: true,
    criticalAlerts: true,
  });
  
  // Theme settings
  const [themeSettings, setThemeSettings] = useState({
    mode: 'light',
    primaryColor: theme.palette.primary.main,
    fontSize: 'medium',
    dense: false,
    customCSS: '',
    animations: true,
    reducedMotion: false,
    highContrast: false,
  });
  
  // Security settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    loginAlerts: true,
    showRecentActivity: true,
    autoLogout: 30, // minutes
    sessionTimeout: 60,
    passwordStrength: 'medium',
    biometricAuth: false,
    ipWhitelist: [],
    auditLog: true,
  });
  
  // Account settings
  const [accountSettings, setAccountSettings] = useState({
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    timeFormat: '12h',
    currency: 'USD',
    numberFormat: '1,234.56',
    defaultView: 'dashboard',
  });

  // Advanced settings
  const [advancedSettings, setAdvancedSettings] = useState({
    apiKeys: [],
    webhooks: [],
    integrations: [],
    backupSettings: {
      autoBackup: true,
      backupFrequency: 'daily',
      retentionDays: 30,
      cloudStorage: true,
    },
    performanceSettings: {
      cacheSize: 100,
      compression: true,
      lazyLoading: true,
      prefetchData: false,
    },
    developerSettings: {
      debugMode: false,
      showLogs: false,
      apiEndpoints: true,
      experimentalFeatures: false,
    }
  });

  const [activeSessions, setActiveSessions] = useState([
    { id: 1, device: 'Chrome on Windows', location: 'New York, USA', lastActive: '2 minutes ago', current: true },
    { id: 2, device: 'Mobile App on iPhone', location: 'London, UK', lastActive: '1 hour ago', current: false },
  ]);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleNotificationChange = (setting) => (event) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]: event.target.checked,
    });
  };

  const handleThemeChange = (setting) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setThemeSettings({
      ...themeSettings,
      [setting]: value,
    });
  };

  const handleSecurityChange = (setting) => (event) => {
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    setSecuritySettings({
      ...securitySettings,
      [setting]: value,
    });
  };

  const handleAccountChange = (setting) => (event) => {
    setAccountSettings({
      ...accountSettings,
      [setting]: event.target.value,
    });
  };

  const handleSaveSettings = () => {
    // In a real app, you would save these settings to your backend
    setSnackbar({
      open: true,
      message: 'Settings saved successfully!',
      severity: 'success'
    });
  };

  const handleResetSettings = () => {
    setOpenDialog(true);
  };

  const confirmResetSettings = () => {
    // Reset to default settings
    setNotificationSettings({
      email: true,
      push: true,
      sound: true,
      marketing: false,
      reminders: true,
      mentions: true,
    });
    
    setThemeSettings({
      mode: 'light',
      primaryColor: '#1976d2',
      fontSize: 'medium',
      dense: false,
    });
    
    setSecuritySettings({
      twoFactorAuth: false,
      loginAlerts: true,
      showRecentActivity: true,
      autoLogout: 30,
    });
    
    setAccountSettings({
      language: 'en',
      timezone: 'UTC',
      dateFormat: 'MM/DD/YYYY',
      timeFormat: '12h',
    });
    
    setOpenDialog(false);
    setSnackbar({
      open: true,
      message: 'Settings have been reset to default values.',
      severity: 'info'
    });
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const terminateSession = (id) => {
    setActiveSessions(activeSessions.filter(session => session.id !== id));
    setSnackbar({
      open: true,
      message: 'Session terminated successfully',
      severity: 'success'
    });
  };

  return (
    <Box sx={{ p: 3, pt: 8, maxWidth: 1200, mx: 'auto' }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <SettingsIcon sx={{ fontSize: 32, mr: 2, color: theme.palette.primary.main }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Settings
        </Typography>
      </Box>

      <Paper elevation={2} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        <Tabs
          value={tabValue}
          onChange={handleTabChange}
          aria-label="settings tabs"
          variant="scrollable"
          scrollButtons="auto"
          sx={{
            borderBottom: 1,
            borderColor: 'divider',
            '& .MuiTabs-indicator': {
              height: 4,
              borderRadius: '4px 4px 0 0',
            },
          }}
        >
          <Tab label="General" icon={<SettingsIcon />} iconPosition="start" {...a11yProps(0)} />
          <Tab label="Notifications" icon={<NotificationsIcon />} iconPosition="start" {...a11yProps(1)} />
          <Tab label="Security" icon={<SecurityIcon />} iconPosition="start" {...a11yProps(2)} />
          <Tab label="Appearance" icon={<PaletteIcon />} iconPosition="start" {...a11yProps(3)} />
          <Tab label="Account" icon={<PersonIcon />} iconPosition="start" {...a11yProps(4)} />
          <Tab label="Advanced" icon={<DeveloperModeIcon />} iconPosition="start" {...a11yProps(5)} />
          <Tab label="Integrations" icon={<ExtensionIcon />} iconPosition="start" {...a11yProps(6)} />
        </Tabs>

        <TabPanel value={tabValue} index={0}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Profile Information
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid>
                <TextField
                  fullWidth
                  label="Display Name"
                  defaultValue="John Doe"
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue="john.doe@example.com"
                  variant="outlined"
                  margin="normal"
                  type="email"
                />
              </Grid>
              <Grid>
                <TextField
                  fullWidth
                  label="Bio"
                  multiline
                  rows={4}
                  defaultValue="I'm a passionate developer who loves creating amazing web applications."
                  variant="outlined"
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h6" gutterBottom fontWeight="bold">
              Preferences
            </Typography>
            <Divider sx={{ mb: 3 }} />
            <Grid container spacing={3}>
              <Grid>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="language-label">Language</InputLabel>
                  <Select
                    labelId="language-label"
                    value={accountSettings.language}
                    label="Language"
                    onChange={(e) => handleAccountChange('language')(e)}
                  >
                    <MenuItem value="en">English</MenuItem>
                    <MenuItem value="es">Español</MenuItem>
                    <MenuItem value="fr">Français</MenuItem>
                    <MenuItem value="de">Deutsch</MenuItem>
                    <MenuItem value="zh">中文</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="timezone-label">Time Zone</InputLabel>
                  <Select
                    labelId="timezone-label"
                    value={accountSettings.timezone}
                    label="Time Zone"
                    onChange={(e) => handleAccountChange('timezone')(e)}
                  >
                    <MenuItem value="UTC">UTC (Coordinated Universal Time)</MenuItem>
                    <MenuItem value="PST">PST (Pacific Standard Time)</MenuItem>
                    <MenuItem value="EST">EST (Eastern Standard Time)</MenuItem>
                    <MenuItem value="CET">CET (Central European Time)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="date-format-label">Date Format</InputLabel>
                  <Select
                    labelId="date-format-label"
                    value={accountSettings.dateFormat}
                    label="Date Format"
                    onChange={(e) => handleAccountChange('dateFormat')(e)}
                  >
                    <MenuItem value="MM/DD/YYYY">MM/DD/YYYY</MenuItem>
                    <MenuItem value="DD/MM/YYYY">DD/MM/YYYY</MenuItem>
                    <MenuItem value="YYYY-MM-DD">YYYY-MM-DD</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid>
                <FormControl fullWidth margin="normal">
                  <InputLabel id="time-format-label">Time Format</InputLabel>
                  <Select
                    labelId="time-format-label"
                    value={accountSettings.timeFormat}
                    label="Time Format"
                    onChange={(e) => handleAccountChange('timeFormat')(e)}
                  >
                    <MenuItem value="12h">12-hour format (3:45 PM)</MenuItem>
                    <MenuItem value="24h">24-hour format (15:45)</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleResetSettings}
              sx={{ mr: 2 }}
            >
              Reset to Defaults
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Changes
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Notification Preferences
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Configure how you receive notifications
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid>
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Email Notifications</Typography>
                </Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.email}
                        onChange={handleNotificationChange('email')}
                        color="primary"
                      />
                    }
                    label="Enable email notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.marketing}
                        onChange={handleNotificationChange('marketing')}
                        color="primary"
                        disabled={!notificationSettings.email}
                      />
                    }
                    label="Marketing emails"
                    sx={{ ml: 4 }}
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.reminders}
                        onChange={handleNotificationChange('reminders')}
                        color="primary"
                        disabled={!notificationSettings.email}
                      />
                    }
                    label="Reminders"
                    sx={{ ml: 4 }}
                  />
                </FormGroup>
              </Paper>
              
              <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <NotificationsIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Push Notifications</Typography>
                </Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.push}
                        onChange={handleNotificationChange('push')}
                        color="primary"
                      />
                    }
                    label="Enable push notifications"
                  />
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.sound}
                        onChange={handleNotificationChange('sound')}
                        color="primary"
                        disabled={!notificationSettings.push}
                      />
                    }
                    label="Play sound"
                    sx={{ ml: 4 }}
                  />
                </FormGroup>
              </Paper>
            </Grid>
            
            <Grid>
              <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2, height: '100%' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <InfoIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Activity Notifications</Typography>
                </Box>
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={notificationSettings.mentions}
                        onChange={handleNotificationChange('mentions')}
                        color="primary"
                      />
                    }
                    label="Mentions"
                  />
                  <FormHelperText sx={{ ml: 4, mt: 0 }}>
                    Notify me when someone mentions me
                  </FormHelperText>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.loginAlerts}
                        onChange={handleSecurityChange('loginAlerts')}
                        color="primary"
                      />
                    }
                    label="Login alerts"
                    sx={{ mt: 2 }}
                  />
                  <FormHelperText sx={{ ml: 4, mt: 0 }}>
                    Get notified about new sign-ins to your account
                  </FormHelperText>
                </FormGroup>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Tip:</strong> You can also manage notification preferences for individual projects in their respective settings.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Notification Settings
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Security Settings
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Manage your account security and privacy settings
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid>
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <LockIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Two-Factor Authentication</Typography>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Box>
                    <Typography>Two-factor authentication (2FA)</Typography>
                    <Typography variant="body2" color="textSecondary">
                      {securitySettings.twoFactorAuth 
                        ? 'Two-factor authentication is currently enabled.' 
                        : 'Add an extra layer of security to your account.'}
                    </Typography>
                  </Box>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.twoFactorAuth}
                        onChange={handleSecurityChange('twoFactorAuth')}
                        color="primary"
                      />
                    }
                    label={securitySettings.twoFactorAuth ? 'Enabled' : 'Disabled'}
                  />
                </Box>
                
                {securitySettings.twoFactorAuth && (
                  <Box sx={{ mt: 2, p: 2, bgcolor: 'success.light', borderRadius: 1, display: 'flex', alignItems: 'center' }}>
                    <CheckIcon sx={{ color: 'success.main', mr: 1 }} />
                    <Typography variant="body2" color="success.dark">
                      Two-factor authentication is now active on your account.
                    </Typography>
                  </Box>
                )}
              </Paper>
              
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Security</Typography>
                </Box>
                
                <FormGroup>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.loginAlerts}
                        onChange={handleSecurityChange('loginAlerts')}
                        color="primary"
                      />
                    }
                    label="Login alerts"
                  />
                  <FormHelperText sx={{ ml: 4, mt: 0 }}>
                    Get notified about new sign-ins to your account
                  </FormHelperText>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={securitySettings.showRecentActivity}
                        onChange={handleSecurityChange('showRecentActivity')}
                        color="primary"
                      />
                    }
                    label="Show recent activity"
                    sx={{ mt: 2 }}
                  />
                  <FormHelperText sx={{ ml: 4, mt: 0 }}>
                    Display your recent account activity in the security section
                  </FormHelperText>
                </FormGroup>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Auto-logout</Typography>
                  <FormControl fullWidth margin="normal">
                    <InputLabel id="auto-logout-label">Auto-logout after inactivity</InputLabel>
                    <Select
                      labelId="auto-logout-label"
                      value={securitySettings.autoLogout}
                      label="Auto-logout after inactivity"
                      onChange={(e) => handleSecurityChange('autoLogout')(e)}
                    >
                      <MenuItem value={5}>5 minutes</MenuItem>
                      <MenuItem value={15}>15 minutes</MenuItem>
                      <MenuItem value={30}>30 minutes</MenuItem>
                      <MenuItem value={60}>1 hour</MenuItem>
                      <MenuItem value={0}>Never (not recommended)</MenuItem>
                    </Select>
                    <FormHelperText>
                      Automatically log out after a period of inactivity
                    </FormHelperText>
                  </FormControl>
                </Box>
              </Paper>
              
              <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Active Sessions</Typography>
                </Box>
                
                <List 
                  dense
                  subheader={
                    <ListSubheader component="div" sx={{ bgcolor: 'transparent', px: 0 }}>
                      {activeSessions.length} active sessions
                    </ListSubheader>
                  }
                >
                  {activeSessions.map((session) => (
                    <React.Fragment key={session.id}>
                      <ListItem 
                        secondaryAction={
                          !session.current && (
                            <IconButton 
                              edge="end" 
                              aria-label="terminate"
                              onClick={() => terminateSession(session.id)}
                              color="error"
                              size="small"
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          )
                        }
                      >
                        <ListItemText
                          primary={session.device}
                          secondary={
                            <>
                              <span>{session.location}</span>
                              {session.current && (
                                <Box component="span" sx={{
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  ml: 1,
                                  color: 'success.main',
                                  fontWeight: 'medium'
                                }}>
                                  <CheckIcon fontSize="inherit" sx={{ mr: 0.5 }} /> Current
                                </Box>
                              )}
                              <Box component="div" sx={{ display: 'block' }}>
                                Last active: {session.lastActive}
                              </Box>
                            </>
                          }
                        />
                      </ListItem>
                      <Divider component="li" />
                    </React.Fragment>
                  ))}
                </List>
                
                <Button 
                  variant="outlined" 
                  color="error" 
                  startIcon={<DeleteIcon />}
                  onClick={() => {
                    // Terminate all other sessions
                    setActiveSessions(activeSessions.filter(session => session.current));
                    setSnackbar({
                      open: true,
                      message: 'All other sessions have been terminated',
                      severity: 'success'
                    });
                  }}
                  sx={{ mt: 2 }}
                  disabled={activeSessions.length <= 1}
                >
                  Terminate all other sessions
                </Button>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Security Settings
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={3}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Appearance
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Customize the look and feel of the application
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid>
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <PaletteIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Theme</Typography>
                </Box>
                
                <FormControl component="fieldset" sx={{ width: '100%' }}>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={themeSettings.mode === 'light'}
                          onChange={() => setThemeSettings({...themeSettings, mode: 'light'})}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.primary'
                          }}>
                            Aa
                          </Box>
                          <Box>
                            <Typography>Light</Typography>
                            <Typography variant="caption" color="textSecondary">Light background with dark text</Typography>
                          </Box>
                        </Box>
                      }
                    />
                    
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={themeSettings.mode === 'dark'}
                          onChange={() => setThemeSettings({...themeSettings, mode: 'dark'})}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{
                            width: 40,
                            height: 40,
                            bgcolor: '#1e1e1e',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'white'
                          }}>
                            Aa
                          </Box>
                          <Box>
                            <Typography>Dark</Typography>
                            <Typography variant="caption" color="textSecondary">Dark background with light text</Typography>
                          </Box>
                        </Box>
                      }
                    />
                    
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={themeSettings.mode === 'system'}
                          onChange={() => setThemeSettings({...themeSettings, mode: 'system'})}
                          color="primary"
                        />
                      }
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <Box sx={{
                            width: 40,
                            height: 40,
                            bgcolor: 'background.paper',
                            border: '1px solid',
                            borderColor: 'divider',
                            borderRadius: 1,
                            mr: 2,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'text.primary',
                            position: 'relative',
                            overflow: 'hidden'
                          }}>
                            <Box sx={{
                              width: '50%',
                              height: '100%',
                              bgcolor: 'background.paper',
                              position: 'absolute',
                              left: 0,
                              top: 0
                            }} />
                            <Box sx={{
                              width: '50%',
                              height: '100%',
                              bgcolor: '#1e1e1e',
                              position: 'absolute',
                              right: 0,
                              top: 0
                            }} />
                            <Box sx={{
                              position: 'relative',
                              zIndex: 1,
                              color: 'white',
                              textShadow: '0 0 2px black',
                              fontWeight: 'bold'
                            }}>
                              Aa
                            </Box>
                          </Box>
                          <Box>
                            <Typography>System</Typography>
                            <Typography variant="caption" color="textSecondary">Use system theme settings</Typography>
                          </Box>
                        </Box>
                      }
                    />
                  </FormGroup>
                </FormControl>
                
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2" gutterBottom>Primary Color</Typography>
                  <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                    {['#1976d2', '#9c27b0', '#2e7d32', '#d32f2f', '#ed6c02', '#0288d1'].map((color) => (
                      <Box
                        key={color}
                        onClick={() => setThemeSettings({...themeSettings, primaryColor: color})}
                        sx={{
                          width: 40,
                          height: 40,
                          borderRadius: '50%',
                          bgcolor: color,
                          cursor: 'pointer',
                          border: `2px solid ${themeSettings.primaryColor === color ? theme.palette.primary.main : 'transparent'}`,
                          '&:hover': {
                            opacity: 0.8
                          }
                        }}
                      />
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
            
            <Grid>
              <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <TypographyIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Typography</Typography>
                </Box>
                
                <FormControl fullWidth margin="normal">
                  <InputLabel id="font-size-label">Font Size</InputLabel>
                  <Select
                    labelId="font-size-label"
                    value={themeSettings.fontSize}
                    label="Font Size"
                    onChange={(e) => setThemeSettings({...themeSettings, fontSize: e.target.value})}
                  >
                    <MenuItem value="small">Small</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="large">Large</MenuItem>
                  </Select>
                </FormControl>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={themeSettings.dense}
                      onChange={(e) => setThemeSettings({...themeSettings, dense: e.target.checked})}
                      color="primary"
                    />
                  }
                  label="Compact mode"
                  sx={{ mt: 2 }}
                />
                <FormHelperText>
                  Reduce padding and spacing for a more compact interface
                </FormHelperText>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Typography variant="subtitle2" gutterBottom>Preview</Typography>
                  <Paper 
                    elevation={0} 
                    sx={{ 
                      p: 2, 
                      border: '1px solid', 
                      borderColor: 'divider', 
                      borderRadius: 1,
                      bgcolor: 'background.paper'
                    }}
                  >
                    <Typography variant="h6" gutterBottom>Card Title</Typography>
                    <Typography variant="body1" paragraph>
                      This is a preview of how text and UI elements will appear with your selected settings.
                    </Typography>
                    <Button variant="contained" color="primary" size="small">Action</Button>
                  </Paper>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Appearance Settings
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={4}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Account Settings
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Manage your account information and preferences
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid>
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Account Information
                </Typography>
                
                <TextField
                  fullWidth
                  label="Email"
                  defaultValue="john.doe@example.com"
                  variant="outlined"
                  margin="normal"
                  type="email"
                  InputProps={{
                    endAdornment: (
                      <Button color="primary" size="small">
                        Change
                      </Button>
                    )
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Password"
                  defaultValue="••••••••"
                  variant="outlined"
                  margin="normal"
                  type="password"
                  InputProps={{
                    endAdornment: (
                      <Button color="primary" size="small">
                        Change
                      </Button>
                    )
                  }}
                />
                
                <TextField
                  fullWidth
                  label="Phone Number"
                  defaultValue="+1 (555) 123-4567"
                  variant="outlined"
                  margin="normal"
                  InputProps={{
                    endAdornment: (
                      <Button color="primary" size="small">
                        Verify
                      </Button>
                    )
                  }}
                />
              </Paper>
              
              <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Connected Accounts
                </Typography>
                
                <List dense>
                  <ListItem 
                    secondaryAction={
                      <Button color="primary" size="small">
                        Connect
                      </Button>
                    }
                  >
                    <ListItemText
                      primary="Google"
                      secondary="Not connected"
                    />
                  </ListItem>
                  <Divider component="li" />
                  
                  <ListItem 
                    secondaryAction={
                      <Button color="primary" size="small">
                        Connect
                      </Button>
                    }
                  >
                    <ListItemText
                      primary="GitHub"
                      secondary="Not connected"
                    />
                  </ListItem>
                  <Divider component="li" />
                  
                  <ListItem 
                    secondaryAction={
                      <Button color="error" size="small">
                        Remove
                      </Button>
                    }
                  >
                    <ListItemText
                      primary="Facebook"
                      secondary="Connected"
                    />
                  </ListItem>
                </List>
              </Paper>
            </Grid>
            
            <Grid>
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Danger Zone
                </Typography>
                
                <Box sx={{ mb: 3 }}>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Deactivating your account will disable your profile and remove your name and photo from most things you've shared.
                  </Typography>
                  <Button variant="outlined" color="error">
                    Deactivate Account
                  </Button>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Box>
                  <Typography variant="body2" color="textSecondary" paragraph>
                    Permanently delete your account and all of your content. This action is not reversible, so please continue with caution.
                  </Typography>
                  <Button 
                    variant="outlined" 
                    color="error"
                    startIcon={<DeleteIcon />}
                    onClick={() => {
                      setSnackbar({
                        open: true,
                        message: 'Account deletion request received. Please check your email to confirm.',
                        severity: 'warning'
                      });
                    }}
                  >
                    Delete Account
                  </Button>
                </Box>
              </Paper>
              
              <Paper elevation={0} sx={{ p: 2, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                  Data & Privacy
                </Typography>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  You can request a copy of your personal data or delete it from our servers.
                </Typography>
                
                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                  <Button variant="outlined" color="primary">
                    Download My Data
                  </Button>
                  <Button variant="outlined" color="error">
                    Delete My Data
                  </Button>
                </Box>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'action.hover', borderRadius: 1 }}>
                  <Typography variant="body2" color="textSecondary">
                    <strong>Note:</strong> Some data may be retained for legal or security purposes, or if it's been shared with others.
                  </Typography>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="outlined"
              color="error"
              onClick={handleResetSettings}
              sx={{ mr: 2 }}
            >
              Reset All Settings
            </Button>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={handleSaveSettings}
            >
              Save Account Settings
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={5}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Advanced Settings
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Advanced configuration options for developers and power users
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid>
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <CodeIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">API Keys</Typography>
                </Box>
                
                <Typography variant="body2" color="textSecondary" paragraph>
                  Manage API keys for external integrations
                </Typography>
                
                <Button variant="outlined" startIcon={<KeyIcon />} sx={{ mb: 2 }}>
                  Generate New API Key
                </Button>
                
                <List dense>
                  {advancedSettings.apiKeys.map((key, index) => (
                    <ListItem key={index}>
                      <ListItemText 
                        primary={`API Key ${index + 1}`}
                        secondary={`Created: ${key.created || 'N/A'}`}
                      />
                      <ListItemSecondaryAction>
                        <IconButton size="small" color="error">
                          <DeleteIcon />
                        </IconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
            
            <Grid>
              <Paper elevation={0} sx={{ p: 2, mb: 3, border: '1px solid', borderColor: 'divider', borderRadius: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <BackupIcon color="primary" sx={{ mr: 1 }} />
                  <Typography variant="subtitle1" fontWeight="bold">Backup Settings</Typography>
                </Box>
                
                <FormControlLabel
                  control={
                    <Switch
                      checked={advancedSettings.backupSettings.autoBackup}
                      onChange={(e) => setAdvancedSettings({
                        ...advancedSettings,
                        backupSettings: {
                          ...advancedSettings.backupSettings,
                          autoBackup: e.target.checked
                        }
                      })}
                    />
                  }
                  label="Automatic Backup"
                />
                
                <FormControl fullWidth sx={{ mt: 2 }}>
                  <InputLabel>Backup Frequency</InputLabel>
                  <Select
                    value={advancedSettings.backupSettings.backupFrequency}
                    label="Backup Frequency"
                    onChange={(e) => setAdvancedSettings({
                      ...advancedSettings,
                      backupSettings: {
                        ...advancedSettings.backupSettings,
                        backupFrequency: e.target.value
                      }
                    })}
                  >
                    <MenuItem value="hourly">Hourly</MenuItem>
                    <MenuItem value="daily">Daily</MenuItem>
                    <MenuItem value="weekly">Weekly</MenuItem>
                    <MenuItem value="monthly">Monthly</MenuItem>
                  </Select>
                </FormControl>
                
                <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                  <Button variant="outlined" startIcon={<CloudUploadIcon />}>
                    Backup Now
                  </Button>
                  <Button variant="outlined" startIcon={<CloudDownloadIcon />}>
                    Restore
                  </Button>
                </Box>
              </Paper>
            </Grid>
          </Grid>
          
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <Button
              variant="contained"
              color="primary"
              startIcon={<SaveIcon />}
              onClick={() => setSnackbar({ open: true, message: 'Advanced settings saved successfully!', severity: 'success' })}
            >
              Save Advanced Settings
            </Button>
          </Box>
        </TabPanel>

        <TabPanel value={tabValue} index={6}>
          <Typography variant="h6" gutterBottom fontWeight="bold">
            Integrations
          </Typography>
          <Typography variant="body2" color="textSecondary" paragraph>
            Connect with third-party services and applications
          </Typography>
          <Divider sx={{ mb: 3 }} />
          
          <Grid container spacing={3}>
            <Grid>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'primary.main', mr: 2 }}>
                      <LinkIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Slack Integration</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Get notifications in your Slack workspace
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    Connect
                  </Button>
                  <Button variant="text" size="small">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid>
              <Card sx={{ mb: 2 }}>
                <CardContent>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                    <Avatar sx={{ bgcolor: 'success.main', mr: 2 }}>
                      <EmailIcon />
                    </Avatar>
                    <Box>
                      <Typography variant="h6">Google Workspace</Typography>
                      <Typography variant="body2" color="textSecondary">
                        Sync with Google Calendar and Drive
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Button variant="outlined" size="small" sx={{ mr: 1 }}>
                    Connect
                  </Button>
                  <Button variant="text" size="small">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </TabPanel>
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          Reset all settings to default?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            This will reset all your settings to their default values. This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={confirmResetSettings} color="error" autoFocus>
            Reset
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
        <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default Settings;
