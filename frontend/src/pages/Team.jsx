import React from 'react';
import { Box, Typography, Paper, Grid, useTheme } from '@mui/material';
import { Group as GroupIcon } from '@mui/icons-material';

const Team = () => {
  const theme = useTheme();

  return (
    <Box sx={{ p: 3, pt: 8 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
        <GroupIcon sx={{ fontSize: 32, mr: 2, color: theme.palette.primary.main }} />
        <Typography variant="h4" component="h1" fontWeight="bold">
          Team Management
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        <Grid>
          <Paper sx={{ p: 3, borderRadius: 2 }}>
            <Typography variant="h6" gutterBottom>Team Members</Typography>
            <Typography color="textSecondary">
              This is where you can manage your team members and their roles.
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Team;
