import { Box, Typography } from '@mui/material';
import ContentRow from '../components/ContentRow.jsx';

export default function Home() {
  return (
    <>
      <Box sx={{ mb: 4, p: { xs: 3, md: 5 }, borderRadius: 3, background: 'linear-gradient(120deg, #3a0a0f 0%, #141720 60%, #0b0d12 100%)', border: 1, borderColor: 'divider' }}>
        <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 26, md: 38 } }}>Discover your next favourite watch</Typography>
        <Typography color="text.secondary" sx={{ mt: 1, maxWidth: 560 }}>
          Browse trending movies and TV shows, search any title and keep a personal watchlist.
        </Typography>
      </Box>

      <ContentRow title="Trending This Week" path="/trending/all/week" seeAll="/movies" />
      <ContentRow title="Popular Movies" path="/movie/popular" type="movie" seeAll="/movies" />
      <ContentRow title="Popular TV Shows" path="/tv/popular" type="tv" seeAll="/tv" />
      <ContentRow title="Action Movies" path="/discover/movie" params={{ with_genres: 28, sort_by: 'popularity.desc' }} type="movie" seeAll="/movies" />
      <ContentRow title="Top Rated Movies" path="/movie/top_rated" type="movie" seeAll="/movies" />
    </>
  );
}
