# CineNest - Movie & TV Discovery

A MovieBox-inspired movie and TV show discovery web app (frontend only), built for the *Web and Mobile Application Development* practical assignment.

**Live app:** _add your Vercel/Netlify link here_
**Screenshots:** see `screenshots/` (homepage and details view)

## Technologies

- React 18 (JavaScript / JSX) created with **Vite**
- **Material UI** (AppBar, Drawer, Card, Chip, Pagination, Skeleton...)
- **React Router** for navigation
- `useState`, `useEffect`, `useMemo`, a custom hook (`useFetch`) and React Context (watchlist)
- `fetch` for API calls
- **TMDB API** - https://www.themoviedb.org

## Features

- **Homepage**: top bar with logo and search, sidebar (Home, Movies, TV Shows, My Watchlist), five content rows (Trending, Popular Movies, Popular TV Shows, Action Movies, Top Rated), dark theme and hover effects
- **Live data** from TMDB (nothing hard-coded); missing posters, ratings, dates and overviews are handled
- **Search** by title (`/search/multi`) with loading, empty-result and error states
- **Details page** (`/movie/:id`, `/tv/:id`): poster, overview, release date, rating, genres, runtime, cast, trailer link
- **Movies / TV Shows pages** with a **genre filter**, sorting (popular, rating, newest) and pagination
- **My Watchlist**: add, view and remove titles; saved in `localStorage` so it survives a refresh
- **Responsive**: permanent sidebar on desktop, hamburger drawer on tablet/mobile, poster grid from 2 to 7 columns

## Project structure

```
api/tmdb.js            Serverless proxy (keeps the TMDB key secret)
src/api/tmdb.js        API helper + data normalisation
src/components/        Layout, NavMenu, SearchBar, MovieCard, MovieGrid, ContentRow, PosterImage, StateView
src/pages/             Home, Browse (Movies/TV), SearchPage, Details, Watchlist, NotFound
src/hooks/useFetch.js  Loading / error / data hook
src/context/           WatchlistContext (localStorage)
```

## API key and security

The TMDB key is **never** in the frontend code or in the repository. The browser calls `/api/tmdb`, a small proxy that adds the key on the server (Vercel serverless function in production, Vite dev middleware locally). The proxy only allows a fixed list of TMDB endpoints.

## Run locally

```bash
npm install
cp .env.example .env     # then put your own TMDB key in .env
npm run dev              # http://localhost:5173
```

Get a free key at https://www.themoviedb.org/settings/api (the v3 "API Key").

## Deploy (Vercel)

1. Push the repo to GitHub (`.env` is git-ignored).
2. Import it on Vercel and add the environment variable `TMDB_KEY`.
3. Deploy. `vercel.json` handles the React Router rewrites.

## Attribution

This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and images are provided by [TMDB](https://www.themoviedb.org).
