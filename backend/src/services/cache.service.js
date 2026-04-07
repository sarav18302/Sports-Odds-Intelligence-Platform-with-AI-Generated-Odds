const cache = new Map();

function setCache(key, value, ttlSeconds = 60) {
  const expiry = Date.now() + ttlSeconds * 1000;

  cache.set(key, {
    value,
    expiry
  });
}

function getCache(key) {
  const data = cache.get(key);

  if (!data) return null;

  if (Date.now() > data.expiry) {
    cache.delete(key);
    return null;
  }

  return data.value;
}

function clearCache() {
  cache.clear();
}

module.exports = {
  setCache,
  getCache,
  clearCache
};