import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx';
import Browse from './pages/Browse.jsx';
import SearchPage from './pages/SearchPage.jsx';
import Details from './pages/Details.jsx';
import Watchlist from './pages/Watchlist.jsx';
import NotFound from './pages/NotFound.jsx';

export default function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="movies" element={<Browse type="movie" />} />
        <Route path="tv" element={<Browse type="tv" />} />
        <Route path="search" element={<SearchPage />} />
        <Route path="watchlist" element={<Watchlist />} />
        <Route path=":type/:id" element={<Details />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}
