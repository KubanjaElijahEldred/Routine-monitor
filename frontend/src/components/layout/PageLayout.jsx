import { Box, Container, Paper, styled } from '@mui/material';

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

const PageLayout = ({ children, maxWidth = false, noPadding = false }) => {
  return (
    <Box sx={{ 
      height: 'calc(100vh - 64px)',
      px: 0, // Remove all horizontal padding
      py: 1, // Minimal vertical padding
      backgroundColor: (theme) => theme.palette.background.default,
      width: '100%',
    }}>
      <Container maxWidth={maxWidth} sx={{ height: '100%', p: 0, width: '100%' }}>
        <StyledPaper>
          <Box sx={!noPadding ? { px: 1, py: 2 } : {}}>
            {children}
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default PageLayout;
