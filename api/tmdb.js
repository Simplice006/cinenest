// Serverless proxy: the TMDB key stays on the server and is never sent to the browser.
// Used by Vercel in production (/api/tmdb) and by the Vite dev server (see vite.config.js).
const BASE = 'https://api.themoviedb.org/3';
const ALLOWED = /^\/(trending\/(all|movie|tv)\/(day|week)|(movie|tv)\/(popular|top_rated|\d+)|discover\/(movie|tv)|genre\/(movie|tv)\/list|search\/(multi|movie|tv))$/;

export async function tmdbProxy(query, key) {
  if (!key) return { status: 503, body: { error: 'TMDB_KEY is not configured on the server.' } };
  const { path = '', ...params } = query;
  if (!ALLOWED.test(path)) return { status: 400, body: { error: 'Endpoint not allowed.' } };
  const qs = new URLSearchParams({ ...params, api_key: key });
  try {
    const r = await fetch(`${BASE}${path}?${qs}`);
    const body = await r.json();
    return { status: r.status, body };
  } catch {
    return { status: 502, body: { error: 'Could not reach TMDB.' } };
  }
}

export default async function handler(req, res) {
  const { status, body } = await tmdbProxy(req.query, process.env.TMDB_KEY);
  res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
  res.status(status).json(body);
}
