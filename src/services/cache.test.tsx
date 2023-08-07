import {cacheHandler} from './cache';
import {storage} from './storage';

jest.mock('./storage', () => ({
  storage: {
    getData: jest.fn(),
    storeData: jest.fn(),
  },
}));

jest.mock('../api/httpClient', () => ({
  HttpClient: {
    fetchUsers: jest.fn(),
  },
}));

describe('cacheHandler', () => {
  test('should return cached data', async () => {
    const mockData = {
      timestamp: Date.now(),
      data: [
        {
          name: 'Omar Mohamed',
          age: 33,
        },
      ],
    };
    storage.getData = jest.fn().mockResolvedValue(mockData);
    const mockFetchData = jest.fn();

    const data = await cacheHandler('USERS_CACHE', storage, mockFetchData);
    expect(data).toEqual(mockData.data);
    expect(mockFetchData).not.toHaveBeenCalled();
  });

  test('should return new data', async () => {
    const mockData = {
      timestamp: Date.now() - 3600001,
      data: [
        {
          name: 'Omar Mohamed',
          age: 33,
        },
      ],
    };
    storage.getData = jest.fn().mockResolvedValue(mockData);
    const mockFetchData = jest.fn().mockResolvedValue(mockData.data);

    const data = await cacheHandler('USERS_CACHE', storage, mockFetchData);
    expect(data).toEqual(mockData.data);
    expect(mockFetchData).toHaveBeenCalled();
  });
});
