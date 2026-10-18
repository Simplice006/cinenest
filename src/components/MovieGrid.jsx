import { Box } from '@mui/material';
import MovieCard from './MovieCard.jsx';

// Responsive grid: 2 columns on phones up to 6+ on wide screens.
export default function MovieGrid({ items }) {
  return (
    <Box sx={{ display: 'grid', gap: { xs: 1.5, sm: 2 }, gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(3, 1fr)', md: 'repeat(4, 1fr)', lg: 'repeat(5, 1fr)', xl: 'repeat(7, 1fr)' } }}>
      {items.map((it) => <MovieCard key={`${it.type}-${it.id}`} item={it} />)}
    </Box>
  );
}
