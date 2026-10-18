import { Link as RouterLink } from 'react-router-dom';
import { Box, Button, Typography } from '@mui/material';
import MovieCard from './MovieCard.jsx';
import StateView from './StateView.jsx';
import useFetch from '../hooks/useFetch.js';
import { normalize, tmdb } from '../api/tmdb.js';

// One horizontally scrollable section ("Trending", "Popular Movies", ...) that loads its own data.
export default function ContentRow({ title, path, params, type, seeAll }) {
  const { data, loading, error, retry } = useFetch(
    async (signal) => (await tmdb(path, params, signal)).results.map((x) => normalize(x, type)).filter((x) => x.poster).slice(0, 20),
    [path, JSON.stringify(params)]
  );

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1.5 }}>
        <Typography variant="h5" component="h2">{title}</Typography>
        {seeAll && <Button component={RouterLink} to={seeAll} size="small" color="inherit">See all</Button>}
      </Box>
      <StateView loading={loading} error={error} empty={data && data.length === 0} onRetry={retry} skeletonCount={6}>
        <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1.5, scrollSnapType: 'x proximity', '& > *': { flex: '0 0 auto', width: { xs: 130, sm: 160, md: 180 }, scrollSnapAlign: 'start' } }}>
          {data?.map((it) => <MovieCard key={`${it.type}-${it.id}`} item={it} />)}
        </Box>
      </StateView>
    </Box>
  );
}
