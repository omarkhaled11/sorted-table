import {useEffect, useState} from 'react';
import {HttpClient} from '../api/httpClient';
import {cacheHandler} from '../services/cache';
import {storage} from '../services/storage';

export const useGetUsers = () => {
  const [data, setData] = useState(null);
  const [error, setError] = useState<unknown>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const users = await cacheHandler(
          'USERS_CACHE',
          storage,
          HttpClient.fetchUsers,
        );
        setData(users);
      } catch (err: unknown) {
        setError(err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  return {data, error, loading};
};
