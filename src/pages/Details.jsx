import { Link as RouterLink, useNavigate, useParams } from 'react-router-dom';
import { Avatar, Box, Button, Chip, Skeleton, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkAddIcon from '@mui/icons-material/BookmarkAdd';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PosterImage from '../components/PosterImage.jsx';
import StateView from '../components/StateView.jsx';
import useFetch from '../hooks/useFetch.js';
import { IMG, normalize, tmdb } from '../api/tmdb.js';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const { has, toggle } = useWatchlist();
  const valid = (type === 'movie' || type === 'tv') && /^\d+$/.test(id);

  const { data: d, loading, error, retry } = useFetch(
    (signal) => (valid ? tmdb(`/${type}/${id}`, { append_to_response: 'videos,credits' }, signal) : Promise.reject(new Error('Invalid title.'))),
    [type, id]
  );

  const back = <Button startIcon={<ArrowBackIcon />} color="inherit" onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>;

  if (loading) {
    return (
      <>
        {back}
        <Box role="status" aria-label="Loading" sx={{ display: 'flex', gap: 3, flexDirection: { xs: 'column', sm: 'row' } }}>
          <Skeleton variant="rounded" sx={{ width: { xs: '100%', sm: 280 }, aspectRatio: '2 / 3', height: 'auto' }} />
          <Box sx={{ flex: 1 }}><Skeleton width="60%" height={50} /><Skeleton /><Skeleton /><Skeleton width="80%" /></Box>
        </Box>
      </>
    );
  }
  if (error) return <>{back}<StateView error={error} onRetry={retry} /></>;

  const item = normalize(d, type);
  const saved = has(item);
  const trailer = d.videos?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer') || d.videos?.results?.find((v) => v.site === 'YouTube');
  const runtime = d.runtime || d.episode_run_time?.[0];
  const date = d.release_date || d.first_air_date;
  const cast = d.credits?.cast?.slice(0, 12) || [];

  return (
    <>
      {back}
      <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', p: { xs: 2, md: 4 },
        backgroundImage: d.backdrop_path ? `linear-gradient(90deg, rgba(11,13,18,.97) 30%, rgba(11,13,18,.75)), url(${IMG}/w1280${d.backdrop_path})` : 'none',
        backgroundSize: 'cover', backgroundPosition: 'center', bgcolor: 'background.paper' }}>
        <Box sx={{ display: 'flex', gap: { xs: 2, md: 4 }, flexDirection: { xs: 'column', sm: 'row' }, alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Box sx={{ width: { xs: 200, sm: 260, md: 300 }, flexShrink: 0, borderRadius: 2, overflow: 'hidden', boxShadow: 6 }}>
            <PosterImage path={d.poster_path} alt={item.title} size="w500" />
          </Box>

          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h4" component="h1" sx={{ fontSize: { xs: 26, md: 36 } }}>
              {item.title} {item.year && <Typography component="span" variant="h5" color="text.secondary">({item.year})</Typography>}
            </Typography>
            {d.tagline && <Typography color="text.secondary" fontStyle="italic" sx={{ mt: 0.5 }}>{d.tagline}</Typography>}

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, alignItems: 'center', my: 2 }}>
              <Chip icon={<StarIcon sx={{ color: '#f5c518 !important' }} />} label={d.vote_average ? `${d.vote_average.toFixed(1)} / 10` : 'No rating'} />
              <Chip label={type === 'movie' ? 'Movie' : 'TV Show'} variant="outlined" />
              {date && <Chip label={`Released ${date}`} variant="outlined" />}
              {runtime && <Chip label={`${runtime} min`} variant="outlined" />}
              {type === 'tv' && d.number_of_seasons && <Chip label={`${d.number_of_seasons} season${d.number_of_seasons > 1 ? 's' : ''}`} variant="outlined" />}
            </Box>

            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
              {d.genres?.length ? d.genres.map((g) => <Chip key={g.id} label={g.name} size="small" color="primary" variant="outlined" />) : <Typography variant="body2" color="text.secondary">Genre not available</Typography>}
            </Box>

            <Typography variant="h6" component="h2">Overview</Typography>
            <Typography color="text.secondary" sx={{ mb: 3, maxWidth: 720 }}>{d.overview || 'No overview available.'}</Typography>

            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
              <Button variant={saved ? 'outlined' : 'contained'} startIcon={saved ? <BookmarkIcon /> : <BookmarkAddIcon />} onClick={() => toggle(item)}>
                {saved ? 'In your watchlist' : 'Add to watchlist'}
              </Button>
              {trailer && (
                <Button variant="outlined" color="inherit" startIcon={<PlayArrowIcon />} href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener">
                  Watch trailer
                </Button>
              )}
              <Button component={RouterLink} to={type === 'movie' ? '/movies' : '/tv'} color="inherit">More {type === 'movie' ? 'movies' : 'TV shows'}</Button>
            </Box>
          </Box>
        </Box>
      </Box>

      {cast.length > 0 && (
        <Box component="section" sx={{ mt: 4 }}>
          <Typography variant="h5" component="h2" sx={{ mb: 2 }}>Cast</Typography>
          <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1 }}>
            {cast.map((c) => (
              <Box key={c.id} sx={{ width: 96, flexShrink: 0, textAlign: 'center' }}>
                <Avatar src={c.profile_path ? `${IMG}/w185${c.profile_path}` : undefined} alt={c.name} sx={{ width: 80, height: 80, mx: 'auto', mb: 0.5 }}>{c.name[0]}</Avatar>
                <Typography variant="caption" display="block" fontWeight={600} noWrap title={c.name}>{c.name}</Typography>
                <Typography variant="caption" display="block" color="text.secondary" noWrap title={c.character}>{c.character}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </>
  );
}
