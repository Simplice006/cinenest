import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import MovieGrid from '../components/MovieGrid.jsx';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function Watchlist() {
  const { items } = useWatchlist();
  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>My Watchlist</Typography>
      {items.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Typography color="text.secondary" sx={{ mb: 2 }}>Your watchlist is empty. Use the bookmark icon on any title to save it here.</Typography>
          <Button variant="contained" component={RouterLink} to="/">Discover titles</Button>
        </Box>
      ) : (
        <MovieGrid items={items} />
      )}
    </>
  );
}
