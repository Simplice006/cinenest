// All calls go through our own proxy (/api/tmdb) so the TMDB key never reaches the browser.
export const IMG = 'https://image.tmdb.org/t/p';

export async function tmdb(path, params = {}, signal) {
  const qs = new URLSearchParams({ path, language: 'en-US', ...params });
  const res = await fetch(`/api/tmdb?${qs}`, { signal });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || data.status_message || `Request failed (${res.status})`);
  return data;
}

// Normalise a TMDB result (movie or tv) into one shape used by the whole UI.
export function normalize(x, forcedType) {
  const type = forcedType || x.media_type || (x.title ? 'movie' : 'tv');
  const date = x.release_date || x.first_air_date || '';
  return {
    id: x.id,
    type,
    title: x.title || x.name || 'Untitled',
    poster: x.poster_path || null,
    year: date.slice(0, 4),
    rating: x.vote_average ? Number(x.vote_average.toFixed(1)) : null,
  };
}
