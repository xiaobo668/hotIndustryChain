/**
 * 通用缓存管理（localStorage）
 * - getCache(prefix, query): 读取缓存
 * - setCache(prefix, query, data): 写入缓存
 * - clearAllCache(): 清除所有 AI 缓存
 *
 * 使用方式：
 *   产业链: cache.get('industry', '半导体')
 *   板块龙头: cache.get('sector', '白酒')
 */

const Cache = {
  _prefixes: {
    industry: CACHE_PREFIX,
    sector: SECTOR_CACHE_PREFIX,
  },

  /** 获取缓存 key */
  _key(prefix, query) {
    return this._prefixes[prefix] + query;
  },

  /** 读取缓存 */
  get(prefix, query) {
    try {
      const raw = localStorage.getItem(this._key(prefix, query));
      if (!raw) return null;
      const { data, ts } = JSON.parse(raw);
      if (Date.now() - ts > CACHE_TTL) {
        localStorage.removeItem(this._key(prefix, query));
        return null;
      }
      console.log(`[localStorage CACHE HIT] ${prefix}:${query}`);
      return data;
    } catch (e) {
      return null;
    }
  },

  /** 写入缓存 */
  set(prefix, query, data) {
    try {
      localStorage.setItem(this._key(prefix, query), JSON.stringify({ data, ts: Date.now() }));
      console.log(`[localStorage CACHED] ${prefix}:${query}`);
    } catch (e) {
      console.warn('[localStorage] 缓存写入失败:', e);
    }
  },

  /** 清除所有 AI 缓存 */
  clearAll() {
    const keysToRemove = [];
    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key && (key.startsWith(CACHE_PREFIX) || key.startsWith(SECTOR_CACHE_PREFIX))) {
        keysToRemove.push(key);
      }
    }
    keysToRemove.forEach(k => localStorage.removeItem(k));
    console.log(`[localStorage] 已清除 ${keysToRemove.length} 条 AI 缓存`);
  },
};

// ==================== 向后兼容的便捷函数 ====================
function getCacheKey(query) { return Cache._key('industry', query); }
function getCachedIndustry(query) { return Cache.get('industry', query); }
function cacheIndustry(query, data) { Cache.set('industry', query, data); }
function getSectorCacheKey(query) { return Cache._key('sector', query); }
function getCachedSector(query) { return Cache.get('sector', query); }
function cacheSector(query, data) { Cache.set('sector', query, data); }
function clearAllAICache() { Cache.clearAll(); }
