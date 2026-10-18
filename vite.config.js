import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { tmdbProxy } from './api/tmdb.js';

// In development, serve /api/tmdb with the same proxy code as the Vercel function.
const devProxy = (key) => ({
  name: 'tmdb-dev-proxy',
  configureServer(server) {
    server.middlewares.use('/api/tmdb', async (req, res) => {
      const query = Object.fromEntries(new URL(req.url, 'http://x').searchParams);
      const { status, body } = await tmdbProxy(query, key);
      res.statusCode = status;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify(body));
    });
  },
});

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  return { plugins: [react(), devProxy(env.TMDB_KEY)] };
});
