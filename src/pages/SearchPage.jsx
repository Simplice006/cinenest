import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import MovieGrid from '../components/MovieGrid.jsx';
import StateView from '../components/StateView.jsx';
import useFetch from '../hooks/useFetch.js';
import { normalize, tmdb } from '../api/tmdb.js';

// Results come from TMDB's /search/multi endpoint (movies and TV shows only).
export default function SearchPage() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();

  const { data, loading, error, retry } = useFetch(async (signal) => {
    if (!q) return [];
    const d = await tmdb('/search/multi', { query: q, include_adult: false }, signal);
    return d.results.filter((x) => x.media_type === 'movie' || x.media_type === 'tv').map((x) => normalize(x));
  }, [q]);

  return (
    <>
      <Typography variant="h4" component="h1" sx={{ mb: 2 }}>{q ? `Results for "${q}"` : 'Search'}</Typography>
      <StateView loading={loading} error={error} empty={!loading && data?.length === 0}
        emptyMessage={q ? `No matches found for "${q}". Try another title.` : 'Type a title in the search bar.'} onRetry={retry} skeletonCount={8}>
        {data && <MovieGrid items={data} />}
      </StateView>
    </>
  );
}
