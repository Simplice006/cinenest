import { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom';
import { InputAdornment, TextField, IconButton } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import CloseIcon from '@mui/icons-material/Close';

// Top-bar search field. Typing (debounced) navigates to /search?q=..., where results are fetched from TMDB.
export default function SearchBar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [params] = useSearchParams();
  const [value, setValue] = useState(params.get('q') || '');
  const first = useRef(true);

  useEffect(() => {
    if (first.current) { first.current = false; return; }
    const q = value.trim();
    const t = setTimeout(() => {
      if (q) navigate(`/search?q=${encodeURIComponent(q)}`, { replace: pathname === '/search' });
      else if (pathname === '/search') navigate('/');
    }, 400);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  // Keep the field in sync when leaving the search page.
  useEffect(() => { if (pathname !== '/search') setValue(''); }, [pathname]);

  return (
    <TextField
      size="small" fullWidth placeholder="Search movies & TV shows"
      value={value} onChange={(e) => setValue(e.target.value)}
      onKeyDown={(e) => e.key === 'Enter' && value.trim() && navigate(`/search?q=${encodeURIComponent(value.trim())}`)}
      inputProps={{ 'aria-label': 'Search' }}
      sx={{ maxWidth: 520, '& .MuiOutlinedInput-root': { borderRadius: 99, bgcolor: 'background.paper' } }}
      InputProps={{
        startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment>,
        endAdornment: value && (
          <InputAdornment position="end">
            <IconButton size="small" aria-label="Clear search" onClick={() => setValue('')}><CloseIcon fontSize="small" /></IconButton>
          </InputAdornment>
        ),
      }}
    />
  );
}
