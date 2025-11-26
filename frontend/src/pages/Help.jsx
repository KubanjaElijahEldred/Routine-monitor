import React from 'react';
import { Box, Typography, Paper, Container, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  height: 'calc(100vh - 120px)',
  overflow: 'auto',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[3],
  display: 'flex',
  flexDirection: 'column',
  '&::-webkit-scrollbar': {
    width: '8px',
  },
  '&::-webkit-scrollbar-track': {
    background: theme.palette.grey[100],
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: theme.palette.primary.main,
    borderRadius: '4px',
  },
}));

const Section = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(4),
  '&:last-child': {
    marginBottom: 0,
  },
}));

const Help = () => {
  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      p: 3,
      backgroundColor: (theme) => theme.palette.background.default,
    }}>
      <Container maxWidth="xl" sx={{ height: '100%', p: 0 }}>
        <StyledPaper>
          <Box sx={{ p: 4 }}>
            <Typography variant="h4" gutterBottom sx={{ 
              color: 'primary.main',
              fontWeight: 'bold',
              mb: 4,
              borderBottom: '2px solid',
              borderColor: 'divider',
              pb: 2
            }}>
              Help & Support
            </Typography>
            
            <Grid container spacing={4}>
              <Grid>
                <Section>
                  <Typography variant="h5" sx={{ 
                    fontWeight: 'bold',
                    mb: 3,
                    color: 'primary.dark',
                    display: 'flex',
                    alignItems: 'center',
                    '&:before': {
                      content: '""',
                      display: 'inline-block',
                      width: '4px',
                      height: '24px',
                      bgcolor: 'primary.main',
                      mr: 2,
                      borderRadius: '2px'
                    }
                  }}>
                    Frequently Asked Questions
                  </Typography>
                  
                  <Box sx={{ pl: 2 }}>
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'text.primary', mb: 1 }}>
                        How do I create a new task?
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', pl: 2 }}>
                        To create a new task, click on the "+ New Task" button in the Tasks section and fill in the required details.
                      </Typography>
                    </Box>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'text.primary', mb: 1 }}>
                        How can I assign tasks to team members?
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', pl: 2 }}>
                        Navigate to the Team page to view and manage team members. You can assign tasks from the task creation or editing interface.
                      </Typography>
                    </Box>
                    
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: 'text.primary', mb: 1 }}>
                        Where can I find my completed tasks?
                      </Typography>
                      <Typography variant="body1" sx={{ color: 'text.secondary', pl: 2 }}>
                        All completed tasks can be found in the Reports section under the "Completed Tasks" tab.
                      </Typography>
                    </Box>
                  </Box>
                </Section>
              </Grid>
              
              <Grid>
                <Section>
                  <Paper elevation={0} sx={{ 
                    p: 3, 
                    bgcolor: 'background.paper',
                    borderRadius: 2,
                    height: '100%',
                    border: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Typography variant="h6" sx={{ 
                      fontWeight: 'bold',
                      mb: 3,
                      color: 'primary.dark',
                      display: 'flex',
                      alignItems: 'center',
                      '&:before': {
                        content: '""',
                        display: 'inline-block',
                        width: '4px',
                        height: '20px',
                        bgcolor: 'primary.main',
                        mr: 2,
                        borderRadius: '2px'
                      }
                    }}>
                      Contact Support
                    </Typography>
                    
                    <Box sx={{ pl: 2 }}>
                      <Typography variant="body1" sx={{ mb: 3, color: 'text.secondary' }}>
                        If you need further assistance, please contact our support team:
                      </Typography>
                      
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: 'primary.light', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          color: 'primary.dark'
                        }}>
                          ✉️
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Email</Typography>
                          <Typography variant="body1" sx={{ color: 'text.primary' }}>support@todolistapp.com</Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: 'primary.light', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          color: 'primary.dark'
                        }}>
                          📞
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Phone</Typography>
                          <Typography variant="body1" sx={{ color: 'text.primary' }}>+1 (555) 123-4567</Typography>
                        </Box>
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <Box sx={{ 
                          width: 36, 
                          height: 36, 
                          bgcolor: 'primary.light', 
                          borderRadius: '50%',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          mr: 2,
                          color: 'primary.dark',
                          flexShrink: 0
                        }}>
                          🕒
                        </Box>
                        <Box>
                          <Typography variant="subtitle2" sx={{ color: 'text.secondary', fontSize: '0.75rem' }}>Working Hours</Typography>
                          <Typography variant="body1" sx={{ color: 'text.primary' }}>Mon - Fri, 9:00 AM - 6:00 PM EST</Typography>
                        </Box>
                      </Box>
                    </Box>
                  </Paper>
                </Section>
              </Grid>
            </Grid>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default Help;
