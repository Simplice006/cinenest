import { useEffect, useState } from 'react';

// Runs an async loader whenever `deps` change; exposes { data, loading, error, retry }.
export default function useFetch(loader, deps) {
  const [state, setState] = useState({ data: null, loading: true, error: null });
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const ctrl = new AbortController();
    setState((s) => ({ ...s, loading: true, error: null }));
    loader(ctrl.signal)
      .then((data) => setState({ data, loading: false, error: null }))
      .catch((err) => {
        if (err.name !== 'AbortError') setState({ data: null, loading: false, error: err.message });
      });
    return () => ctrl.abort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick]);

  return { ...state, retry: () => setTick((t) => t + 1) };
}
