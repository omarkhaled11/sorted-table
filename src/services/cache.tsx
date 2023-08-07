import {log} from './logger';
import {Storage} from './storage';

const EXPIRE_TIME = 3600000; // 1 hour

type CACHE_KEYS = 'USERS_CACHE' | 'OTHER_CACHE_KEY';

// Returns cached data if it exists in storage and is not expired, otherwise fetches new data from api
export const cacheHandler = async (
  key: CACHE_KEYS,
  storage: Storage,
  fetchData: () => Promise<unknown>,
) => {
  log('cacheHandler', 'key: ' + key);
  const cache = await storage.getData(key);
  const timestamp = Date.now();

  if (cache && cache.timestamp + EXPIRE_TIME > timestamp) {
    log('cacheHandler', 'get data from cache');
    return cache.data;
  } else {
    const data = await fetchData();
    await storage.storeData(key, {timestamp, data});
    log('cacheHandler', 'get data from fetch');
    return data;
  }
};
