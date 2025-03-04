const cache = new Map();

export function setCache(key, data, ttl = 300000) {
  // Store data with expiration time (default: 5 minutes)
  const expiry = Date.now() + ttl;
  cache.set(key, { data, expiry });
}

export function getCache(key) {
  const cached = cache.get(key);
  if (!cached || Date.now() > cached.expiry) {
    cache.delete(key);
    return null;
  }
  return cached.data;
}
