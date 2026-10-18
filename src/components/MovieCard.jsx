import { Link as RouterLink } from 'react-router-dom';
import { Box, Card, CardActionArea, CardContent, IconButton, Tooltip, Typography } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import PosterImage from './PosterImage.jsx';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function MovieCard({ item }) {
  const { has, toggle } = useWatchlist();
  const saved = has(item);

  return (
    <Card sx={{ position: 'relative', height: '100%', bgcolor: 'background.paper', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-6px) scale(1.02)', boxShadow: '0 12px 28px rgba(0,0,0,.6)' } }}>
      <CardActionArea component={RouterLink} to={`/${item.type}/${item.id}`}>
        <PosterImage path={item.poster} alt={item.title} />
        <CardContent sx={{ p: 1.25, '&:last-child': { pb: 1.25 } }}>
          <Typography variant="subtitle2" noWrap title={item.title}>{item.title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'text.secondary' }}>
            <Typography variant="caption">{item.year || 'N/A'}</Typography>
            <Typography variant="caption" sx={{ display: 'flex', alignItems: 'center', gap: 0.25 }}>
              <StarIcon sx={{ fontSize: 14, color: '#f5c518' }} />{item.rating ?? 'N/A'}
            </Typography>
          </Box>
        </CardContent>
      </CardActionArea>
      <Tooltip title={saved ? 'Remove from watchlist' : 'Add to watchlist'}>
        <IconButton size="small" aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'} onClick={() => toggle(item)}
          sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(0,0,0,.65)', color: saved ? 'primary.main' : '#fff', '&:hover': { bgcolor: 'rgba(0,0,0,.85)' } }}>
          {saved ? <BookmarkIcon fontSize="small" /> : <BookmarkBorderIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Card>
  );
}
