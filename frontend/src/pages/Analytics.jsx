import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  CircularProgress,
  useTheme,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  TrendingUp as TrendingUpIcon,
  TrendingDown as TrendingDownIcon,
  Assessment as AnalyticsIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
} from '@mui/icons-material';
import PageLayout from '../components/layout/PageLayout';
import PageHeader from '../components/common/PageHeader';

const Analytics = () => {
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const [timeRange, setTimeRange] = useState('week');
  const [analyticsData, setAnalyticsData] = useState({
    totalTasks: 156,
    completedTasks: 134,
    completionRate: 85.9,
    averageCompletionTime: '2.4 days',
    productivityScore: 92,
    weeklyProgress: [
      { day: 'Mon', tasks: 8, completed: 7 },
      { day: 'Tue', tasks: 12, completed: 11 },
      { day: 'Wed', tasks: 6, completed: 6 },
      { day: 'Thu', tasks: 10, completed: 9 },
      { day: 'Fri', tasks: 15, completed: 14 },
      { day: 'Sat', tasks: 4, completed: 4 },
      { day: 'Sun', tasks: 3, completed: 2 },
    ],
    categoryBreakdown: [
      { category: 'Work', count: 89, color: '#FF6B6B' },
      { category: 'Personal', count: 34, color: '#4ECDC4' },
      { category: 'Health', count: 23, color: '#FF9E80' },
      { category: 'Learning', count: 10, color: '#6C63FF' },
    ],
  });

  const handleRefresh = () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  const StatCard = ({ title, value, subtitle, trend, icon: Icon, color }) => (
    <Card sx={{ 
      p: 3, 
      height: '100%',
      background: `linear-gradient(135deg, ${color}15 0%, ${color}05 100%)`,
      borderLeft: `4px solid ${color}`,
      '&:hover': {
        boxShadow: 3,
      }
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <Icon sx={{ color, mr: 1 }} />
        <Typography variant="h6" color="text.secondary">
          {title}
        </Typography>
      </Box>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
        {value}
      </Typography>
      <Box sx={{ display: 'flex', alignItems: 'center' }}>
        {trend === 'up' ? (
          <TrendingUpIcon sx={{ color: 'success.main', mr: 1, fontSize: 20 }} />
        ) : (
          <TrendingDownIcon sx={{ color: 'error.main', mr: 1, fontSize: 20 }} />
        )}
        <Typography variant="body2" color="text.secondary">
          {subtitle}
        </Typography>
      </Box>
    </Card>
  );

  const ProgressCard = ({ data }) => (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Weekly Progress
      </Typography>
      <Box sx={{ mt: 2 }}>
        {data.map((item, index) => (
          <Box key={item.day} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{item.day}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.completed}/{item.tasks}
              </Typography>
            </Box>
            <Box
              sx={{
                height: 8,
                backgroundColor: 'grey.200',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${(item.completed / item.tasks) * 100}%`,
                  backgroundColor: theme.palette.primary.main,
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );

  const CategoryCard = ({ data }) => (
    <Card sx={{ p: 3, height: '100%' }}>
      <Typography variant="h6" gutterBottom>
        Task Categories
      </Typography>
      <Box sx={{ mt: 2 }}>
        {data.map((item, index) => (
          <Box key={item.category} sx={{ mb: 2 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
              <Typography variant="body2">{item.category}</Typography>
              <Typography variant="body2" color="text.secondary">
                {item.count} tasks
              </Typography>
            </Box>
            <Box
              sx={{
                height: 8,
                backgroundColor: 'grey.200',
                borderRadius: 4,
                overflow: 'hidden',
              }}
            >
              <Box
                sx={{
                  height: '100%',
                  width: `${(item.count / analyticsData.totalTasks) * 100}%`,
                  backgroundColor: item.color,
                  transition: 'width 0.3s ease',
                }}
              />
            </Box>
          </Box>
        ))}
      </Box>
    </Card>
  );

  return (
    <PageLayout>
      <PageHeader
        title="Analytics Dashboard"
        subtitle="Track your productivity and task performance"
        actions={
          <>
            <FormControl size="small" sx={{ mr: 2, minWidth: 120 }}>
              <InputLabel>Time Range</InputLabel>
              <Select
                value={timeRange}
                label="Time Range"
                onChange={(e) => setTimeRange(e.target.value)}
              >
                <MenuItem value="day">Today</MenuItem>
                <MenuItem value="week">This Week</MenuItem>
                <MenuItem value="month">This Month</MenuItem>
                <MenuItem value="year">This Year</MenuItem>
              </Select>
            </FormControl>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={loading}
              sx={{ mr: 1 }}
            >
              Refresh
            </Button>
            <Button
              variant="contained"
              startIcon={<DownloadIcon />}
            >
              Export Report
            </Button>
          </>
        }
      />

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : (
        <Box sx={{ flexGrow: 1 }}>
          {/* Stats Overview */}
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid>
              <StatCard
                title="Total Tasks"
                value={analyticsData.totalTasks}
                subtitle="+12% from last week"
                trend="up"
                icon={AnalyticsIcon}
                color="#FF6B6B"
              />
            </Grid>
            <Grid>
              <StatCard
                title="Completion Rate"
                value={`${analyticsData.completionRate}%`}
                subtitle="+5.2% from last week"
                trend="up"
                icon={TrendingUpIcon}
                color="#4ECDC4"
              />
            </Grid>
            <Grid>
              <StatCard
                title="Avg. Completion Time"
                value={analyticsData.averageCompletionTime}
                subtitle="-0.3 days from last week"
                trend="up"
                icon={TrendingUpIcon}
                color="#FF9E80"
              />
            </Grid>
            <Grid>
              <StatCard
                title="Productivity Score"
                value={analyticsData.productivityScore}
                subtitle="+8 points from last week"
                trend="up"
                icon={TrendingUpIcon}
                color="#6C63FF"
              />
            </Grid>
          </Grid>

          {/* Charts and Progress */}
          <Grid container spacing={3}>
            <Grid>
              <ProgressCard data={analyticsData.weeklyProgress} />
            </Grid>
            <Grid>
              <CategoryCard data={analyticsData.categoryBreakdown} />
            </Grid>
          </Grid>
        </Box>
      )}
    </PageLayout>
  );
};

export default Analytics;
