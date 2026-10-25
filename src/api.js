// CoinGecko's free API only allows a few requests per minute, so responses are
// cached and reused instead of being fetched again on every page visit.
const cache = new Map();
const CACHE_TIME = 2 * 60 * 1000;

const RATE_LIMIT_MESSAGE =
  'Too many requests to CoinGecko. Please wait a minute and try again.';

export const fetchJSON = async (url, signal) => {
  const cached = cache.get(url);
  if (cached && Date.now() - cached.time < CACHE_TIME) return cached.data;

  try {
    const res = await fetch(url, { signal });
    if (res.status === 429) throw new Error(RATE_LIMIT_MESSAGE);
    if (!res.ok) throw new Error(`Request failed (${res.status})`);

    const data = await res.json();
    cache.set(url, { data, time: Date.now() });
    return data;
  } catch (err) {
    if (err.name === 'AbortError') throw err;
    // Fall back to older data rather than showing an error
    if (cached) return cached.data;
    // CoinGecko's 429 responses have no CORS header, so the browser reports
    // them as a network error ("Failed to fetch") instead of a status code
    if (err instanceof TypeError) throw new Error(RATE_LIMIT_MESSAGE, { cause: err });
    throw err;
  }
};
