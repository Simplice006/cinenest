import { NavLink } from 'react-router-dom';
import { Badge, List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useWatchlist } from '../context/WatchlistContext.jsx';

export default function NavMenu({ onNavigate }) {
  const { items } = useWatchlist();
  const links = [
    { to: '/', label: 'Home', icon: <HomeIcon />, end: true },
    { to: '/movies', label: 'Movies', icon: <MovieIcon /> },
    { to: '/tv', label: 'TV Shows', icon: <TvIcon /> },
    { to: '/watchlist', label: 'My Watchlist', icon: <Badge badgeContent={items.length} color="primary"><BookmarkIcon /></Badge> },
  ];
  return (
    <List sx={{ p: 1.5 }}>
      {links.map((l) => (
        <ListItemButton key={l.to} component={NavLink} to={l.to} end={l.end} onClick={onNavigate}
          sx={{ borderRadius: 2, mb: 0.5, '&.active': { bgcolor: 'primary.main', color: '#fff', '& .MuiListItemIcon-root': { color: '#fff' } } }}>
          <ListItemIcon sx={{ minWidth: 40 }}>{l.icon}</ListItemIcon>
          <ListItemText primary={l.label} />
        </ListItemButton>
      ))}
    </List>
  );
}
