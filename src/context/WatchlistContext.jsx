import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const KEY = 'cinenest-watchlist';
const WatchlistContext = createContext(null);

const load = () => {
  try { return JSON.parse(localStorage.getItem(KEY)) || []; } catch { return []; }
};

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(load);

  // Persist on every change so the list survives a page refresh.
  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* storage unavailable */ }
  }, [items]);

  const value = useMemo(() => {
    const same = (a, b) => a.id === b.id && a.type === b.type;
    const has = (item) => items.some((i) => same(i, item));
    const add = (item) => setItems((l) => (l.some((i) => same(i, item)) ? l : [item, ...l]));
    const remove = (item) => setItems((l) => l.filter((i) => !same(i, item)));
    return { items, has, add, remove, toggle: (item) => (has(item) ? remove(item) : add(item)) };
  }, [items]);

  return <WatchlistContext.Provider value={value}>{children}</WatchlistContext.Provider>;
}

export const useWatchlist = () => useContext(WatchlistContext);
