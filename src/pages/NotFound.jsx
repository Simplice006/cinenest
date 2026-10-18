import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';

export default function NotFound() {
  return (
    <Box sx={{ textAlign: 'center', py: 8 }}>
      <Typography variant="h4" component="h1" sx={{ mb: 1 }}>Page not found</Typography>
      <Button variant="contained" component={RouterLink} to="/">Back to home</Button>
    </Box>
  );
}
