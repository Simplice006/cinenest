import { useState } from 'react';
import { Box } from '@mui/material';
import MovieFilterIcon from '@mui/icons-material/MovieFilter';
import { IMG } from '../api/tmdb.js';

// Poster with a placeholder when the path is missing or the image fails to load.
export default function PosterImage({ path, alt, size = 'w342', sx }) {
  const [failed, setFailed] = useState(false);
  const base = { width: '100%', aspectRatio: '2 / 3', display: 'block', ...sx };

  if (!path || failed) {
    return (
      <Box sx={{ ...base, display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'action.hover', color: 'text.secondary' }} role="img" aria-label={`${alt} (no poster)`}>
        <MovieFilterIcon sx={{ fontSize: 48, opacity: 0.5 }} />
      </Box>
    );
  }
  return <Box component="img" src={`${IMG}/${size}${path}`} alt={alt} loading="lazy" onError={() => setFailed(true)} sx={{ ...base, objectFit: 'cover' }} />;
}
