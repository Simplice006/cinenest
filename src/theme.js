import { createTheme } from '@mui/material/styles';

export default createTheme({
  palette: {
    mode: 'dark',
    primary: { main: '#e50914' },
    background: { default: '#0b0d12', paper: '#141720' },
    text: { primary: '#f2f4f8', secondary: '#a4abbb' },
  },
  shape: { borderRadius: 12 },
  typography: {
    fontFamily: '"Inter","Segoe UI",Roboto,Helvetica,Arial,sans-serif',
    h5: { fontWeight: 700 },
    h4: { fontWeight: 800 },
  },
  components: {
    MuiCssBaseline: { styleOverrides: { body: { overflowX: 'hidden' } } },
    MuiButton: { styleOverrides: { root: { textTransform: 'none', fontWeight: 600 } } },
  },
});
