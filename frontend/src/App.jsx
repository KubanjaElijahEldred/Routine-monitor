import React, { createContext, useMemo } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { ThemeProvider, createTheme, useTheme, useMediaQuery, IconButton, CssBaseline, Box, Button, Typography } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

// Import components
import Sidebar from './components/layout/Sidebar';
import Topbar from './components/layout/Topbar';
import AuthGuard from './components/auth/AuthGuard';
import LogoutButton from './components/auth/LogoutButton';
import Dashboard from './pages/Dashboard';
import Tasks from './pages/Tasks';
import TeamMembers from './pages/team/TeamMembers'; // Fixed import path
import Reports from './pages/Reports';
import Notifications from './pages/Notifications';
import Help from './pages/Help';
import Profile from './pages/Profile';
import Analytics from './pages/Analytics';
import Calendar from './pages/Calendar';
import Settings from './pages/Settings';
import HabitTracker from './pages/HabitTracker';
import Goals from './pages/Goals';

// Import auth pages
import Login from './pages/auth/Login';
import Signup from './pages/auth/Signup';

// Create a context for the color mode
export const ColorModeContext = createContext({ toggleColorMode: () => {} });

// Create a theme instance with purple gradient as primary color
const getDesignTokens = (mode) => ({
  palette: {
    mode,
    ...(mode === 'light'
      ? {
          // Light mode - Modern Purple Theme
          primary: {
            main: '#6366f1', // Modern purple
            light: '#818cf8',
            dark: '#4f46e5',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#a855f7', // Vibrant purple
            light: '#c084fc',
            dark: '#9333ea',
          },
          tertiary: {
            main: '#06b6d4', // Cyan accent
            light: '#22d3ee',
            dark: '#0891b2',
          },
          success: {
            main: '#10b981', // Emerald green
            light: '#34d399',
            dark: '#059669',
          },
          warning: {
            main: '#2563eb', // Blue
            light: '#3b82f6',
            dark: '#1d4ed8',
          },
          error: {
            main: '#ef4444', // Red
            light: '#f87171',
            dark: '#dc2626',
          },
          background: {
            default: '#fafafa',
            paper: '#ffffff',
          },
          text: {
            primary: 'rgba(17, 24, 39, 0.9)',
            secondary: 'rgba(107, 114, 128, 0.8)',
          },
        }
      : {
          // Dark mode - Modern Purple Theme
          primary: {
            main: '#818cf8', // Lighter purple for dark mode
            light: '#a5b4fc',
            dark: '#6366f1',
            contrastText: '#ffffff',
          },
          secondary: {
            main: '#c084fc', // Lighter vibrant purple
            light: '#e879f9',
            dark: '#a855f7',
          },
          tertiary: {
            main: '#22d3ee', // Lighter cyan
            light: '#67e8f9',
            dark: '#06b6d4',
          },
          success: {
            main: '#34d399', // Lighter emerald
            light: '#6ee7b7',
            dark: '#10b981',
          },
          warning: {
            main: '#3b82f6', // Lighter blue
            light: '#60a5fa',
            dark: '#2563eb',
          },
          error: {
            main: '#f87171', // Lighter red
            light: '#fca5a5',
            dark: '#ef4444',
          },
          background: {
            default: '#0f0f0f',
            paper: '#1a1a1a',
          },
          text: {
            primary: '#f9fafb',
            secondary: '#d1d5db',
          },
        }),
  },
});

// Create theme instance with mode
const getTheme = (mode) =>
  createTheme({
    ...getDesignTokens(mode),
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    button: {
      textTransform: 'none',
      fontWeight: 500,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          padding: '10px 20px',
          fontWeight: 600,
          textTransform: 'none',
          transition: 'all 0.3s ease',
          background: 'linear-gradient(135deg, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))',
        },
        contained: {
          boxShadow: '0 4px 14px rgba(99, 102, 241, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(99, 102, 241, 0.4)',
            transform: 'translateY(-2px)',
          },
        },
        outlined: {
          borderWidth: 2,
          '&:hover': {
            borderWidth: 2,
            boxShadow: '0 4px 14px rgba(99, 102, 241, 0.2)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 4px 20px 0 rgba(0,0,0,0.08)',
          transition: 'all 0.3s ease',
          background: 'linear-gradient(145deg, #ffffff, #f8fafc)',
          '&:hover': {
            transform: 'translateY(-4px)',
            boxShadow: '0 8px 30px rgba(99, 102, 241, 0.15)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
        elevation1: {
          boxShadow: '0 2px 8px rgba(99, 102, 241, 0.1)',
        },
        elevation2: {
          boxShadow: '0 4px 16px rgba(99, 102, 241, 0.12)',
        },
        elevation3: {
          boxShadow: '0 6px 24px rgba(99, 102, 241, 0.15)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(90deg, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))',
          boxShadow: '0 2px 12px rgba(99, 102, 241, 0.2)',
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderRight: 'none',
          boxShadow: '4px 0 20px rgba(0,0,0,0.1)',
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontWeight: 600,
          borderRadius: 8,
        },
        colorPrimary: {
          background: 'linear-gradient(135deg, var(--mui-palette-primary-main), var(--mui-palette-primary-dark))',
        },
        colorSecondary: {
          background: 'linear-gradient(135deg, var(--mui-palette-secondary-main), var(--mui-palette-secondary-dark))',
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          height: 3,
          borderRadius: '3px 3px 0 0',
          background: 'linear-gradient(90deg, var(--mui-palette-primary-main), var(--mui-palette-secondary-main))',
        },
      },
    },
  },
});

// Main layout component
const Layout = ({ children }) => {
  const [open, setOpen] = React.useState(true);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  React.useEffect(() => {
    // Close sidebar on mobile by default
    if (isMobile) {
      setOpen(false);
    }
  }, [isMobile]);

  const handleDrawerToggle = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <Sidebar open={open} onToggle={handleDrawerToggle} />
      <Box 
        component="main" 
        sx={{ 
          flexGrow: 1, 
          px: 0, // Remove all horizontal padding
          py: 1, // Minimal vertical padding
          minWidth: 0, // Prevents overflow issues
          transition: theme.transitions.create(['margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
        }}
      >
        <Topbar onMenuClick={handleDrawerToggle} />
        <Box sx={{ mt: 8 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
};

function App() {
  const [mode, setMode] = React.useState('light');
  const theme = React.useMemo(() => getTheme(mode), [mode]);

  const colorMode = React.useMemo(
    () => ({
      toggleColorMode: () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
      },
    }),
    [],
  );

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Routes>
            {/* Public routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            
            {/* Protected routes */}
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route
              path="/dashboard"
              element={
                <AuthGuard>
                  <Layout>
                    <Dashboard />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/tasks"
              element={
                <AuthGuard>
                  <Layout>
                    <Tasks />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/analytics"
              element={
                <AuthGuard>
                  <Layout>
                    <Analytics />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/calendar"
              element={
                <AuthGuard>
                  <Layout>
                    <Calendar />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/team"
              element={
                <AuthGuard>
                  <Layout>
                    <TeamMembers /> {/* Direct import of TeamMembers component */}
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/reports"
              element={
                <AuthGuard>
                  <Layout>
                    <Reports />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/notifications"
              element={
                <AuthGuard>
                  <Layout>
                    <Notifications />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/help"
              element={
                <AuthGuard>
                  <Layout>
                    <Help />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/profile"
              element={
                <AuthGuard>
                  <Layout>
                    <Profile />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/settings"
              element={
                <AuthGuard>
                  <Layout>
                    <Settings />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/habits"
              element={
                <AuthGuard>
                  <Layout>
                    <HabitTracker />
                  </Layout>
                </AuthGuard>
              }
            />
            <Route
              path="/goals"
              element={
                <AuthGuard>
                  <Layout>
                    <Goals />
                  </Layout>
                </AuthGuard>
              }
            />
            
            {/* Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to="/login" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
