import React from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { Assessment as ReportIcon } from '@mui/icons-material';

const Reports = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, pt: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <ReportIcon sx={{ fontSize: 32, mr: 2, color: theme.palette.primary.main }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Reports
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid>
          <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Task Completion</Typography>
            <Typography color="textSecondary" paragraph>
              View and analyze task completion rates and trends.
            </Typography>
          </Paper>
        </Grid>
        <Grid>
          <Paper sx={{ p: 3, height: '100%', borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Team Performance</Typography>
            <Typography color="textSecondary" paragraph>
              Track team performance metrics and productivity.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Reports;
