import { Box, Typography } from '@mui/material';

const PageHeader = ({ title, subtitle, actions }) => (
  <Box sx={{ 
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    mb: 4,
    pb: 2,
    borderBottom: '2px solid',
    borderColor: 'divider',
    flexWrap: 'wrap',
    gap: 2
  }}>
    <Box>
      <Typography 
        variant="h4" 
        sx={{ 
          color: 'primary.main',
          fontWeight: 'bold',
          mb: subtitle ? 0.5 : 0
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography variant="body1" color="text.secondary">
          {subtitle}
        </Typography>
      )}
    </Box>
    {actions && (
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
        {actions}
      </Box>
    )}
  </Box>
);

export default PageHeader;
