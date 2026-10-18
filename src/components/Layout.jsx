import { useState } from 'react';
import { Link as RouterLink, Outlet } from 'react-router-dom';
import { AppBar, Box, Drawer, IconButton, Toolbar, Typography, Link, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import MenuIcon from '@mui/icons-material/Menu';
import PlayCircleFilledIcon from '@mui/icons-material/PlayCircleFilled';
import SearchBar from './SearchBar.jsx';
import NavMenu from './NavMenu.jsx';

const WIDTH = 230;

export default function Layout() {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  const [open, setOpen] = useState(false);

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" color="default" elevation={0}
        sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'rgba(11,13,18,.92)', backdropFilter: 'blur(8px)', borderBottom: 1, borderColor: 'divider' }}>
        <Toolbar sx={{ gap: { xs: 1, sm: 2 } }}>
          {!isDesktop && (
            <IconButton edge="start" aria-label="Open menu" onClick={() => setOpen(true)}>
              <MenuIcon />
            </IconButton>
          )}
          <Box component={RouterLink} to="/" sx={{ display: 'flex', alignItems: 'center', gap: 0.75, color: 'inherit', textDecoration: 'none', mr: { md: 4 } }}>
            <PlayCircleFilledIcon color="primary" />
            <Typography variant="h6" fontWeight={800} noWrap sx={{ display: { xs: 'none', sm: 'block' } }}>
              Cine<span style={{ color: theme.palette.primary.main }}>Nest</span>
            </Typography>
          </Box>
          <SearchBar />
        </Toolbar>
      </AppBar>

      <Drawer
        variant={isDesktop ? 'permanent' : 'temporary'}
        open={isDesktop || open}
        onClose={() => setOpen(false)}
        ModalProps={{ keepMounted: true }}
        sx={{ width: isDesktop ? WIDTH : 0, flexShrink: 0, '& .MuiDrawer-paper': { width: WIDTH, boxSizing: 'border-box', bgcolor: 'background.default', borderRight: 1, borderColor: 'divider' } }}
      >
        <Toolbar />
        <NavMenu onNavigate={() => setOpen(false)} />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: { xs: 2, sm: 3 } }}>
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, textAlign: 'center', color: 'text.secondary', fontSize: 13, borderTop: 1, borderColor: 'divider' }}>
          This product uses the <Link href="https://www.themoviedb.org" target="_blank" rel="noopener" color="inherit">TMDB API</Link> but is not endorsed or certified by TMDB.
        </Box>
      </Box>
    </Box>
  );
}
