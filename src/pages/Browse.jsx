import { useEffect, useState } from 'react';
import { Box, Chip, FormControl, InputLabel, MenuItem, Pagination, Select, Typography } from '@mui/material';
import MovieGrid from '../components/MovieGrid.jsx';
import StateView from '../components/StateView.jsx';
import useFetch from '../hooks/useFetch.js';
import { normalize, tmdb } from '../api/tmdb.js';

const SORTS = {
  movie: [
    ['popularity.desc', 'Most popular'],
    ['vote_average.desc', 'Highest rated'],
    ['primary_release_date.desc', 'Newest'],
  ],
  tv: [
    ['popularity.desc', 'Most popular'],
    ['vote_average.desc', 'Highest rated'],
    ['first_air_date.desc', 'Newest'],
  ],
};

// Shared page for "Movies" and "TV Shows": genre filter + sorting + pagination.
export default function Browse({ type }) {
  const isMovie = type === 'movie';
  const [genre, setGenre] = useState('');
  const [sort, setSort] = useState('popularity.desc');
  const [page, setPage] = useState(1);

  // Reset filters when switching between Movies and TV Shows.
  useEffect(() => { setGenre(''); setSort('popularity.desc'); setPage(1); }, [type]);

  const genres = useFetch((signal) => tmdb(`/genre/${type}/list`, {}, signal).then((d) => d.genres), [type]);

  const list = useFetch(async (signal) => {
    const params = { sort_by: sort, page, 'vote_count.gte': sort.startsWith('vote_average') ? 300 : 0 };
    if (genre) params.with_genres = genre;
    // Do not list unreleased titles when sorting by newest.
    if (sort.includes('date')) params[isMovie ? 'primary_release_date.lte' : 'first_air_date.lte'] = new Date().toISOString().slice(0, 10);
    const d = await tmdb(`/discover/${type}`, params, signal);
    return { items: d.results.map((x) => normalize(x, type)), totalPages: Math.min(d.total_pages || 1, 500) };
  }, [type, genre, sort, page]);

  const pick = (setter) => (v) => { setter(v); setPage(1); };

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>{isMovie ? 'Movies' : 'TV Shows'}</Typography>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, alignItems: 'center', mb: 2 }}>
        <FormControl size="small" sx={{ minWidth: 170 }}>
          <InputLabel id="sort-label">Sort by</InputLabel>
          <Select labelId="sort-label" label="Sort by" value={sort} onChange={(e) => pick(setSort)(e.target.value)}>
            {SORTS[type].map(([v, l]) => <MenuItem key={v} value={v}>{l}</MenuItem>)}
          </Select>
        </FormControl>
      </Box>

      <Box sx={{ display: 'flex', gap: 1, overflowX: 'auto', pb: 1, mb: 2 }} aria-label="Genres">
        <Chip label="All" color={genre === '' ? 'primary' : 'default'} onClick={() => pick(setGenre)('')} />
        {genres.data?.map((g) => (
          <Chip key={g.id} label={g.name} color={String(genre) === String(g.id) ? 'primary' : 'default'} onClick={() => pick(setGenre)(g.id)} sx={{ flexShrink: 0 }} />
        ))}
      </Box>

      <StateView loading={list.loading} error={list.error} empty={list.data?.items.length === 0} emptyMessage="No titles match this filter." onRetry={list.retry} skeletonCount={8}>
        {list.data && (
          <>
            <MovieGrid items={list.data.items} />
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination count={list.data.totalPages} page={page} onChange={(_, p) => { setPage(p); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
                color="primary" siblingCount={0} boundaryCount={1} />
            </Box>
          </>
        )}
      </StateView>
    </>
  );
}
