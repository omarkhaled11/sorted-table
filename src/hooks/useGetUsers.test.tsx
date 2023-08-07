import {renderHook} from '@testing-library/react-hooks';
import {useGetUsers} from './useGetUsers';

jest.mock('../api/httpClient', () => ({
  HttpClient: {
    fetchUsers: jest.fn(() => [
      {
        name: 'Omar Mohamed',
        age: 33,
      },
    ]),
  },
}));

describe('useGetUsers', () => {
  test('should return data, loading and error', async () => {
    const {result, waitForNextUpdate} = renderHook(() => useGetUsers());

    await waitForNextUpdate();

    expect(result.current.loading).toEqual(false);
    expect(result.current.error).toEqual(null);
    expect(result.current.data).toEqual([
      {
        name: 'Omar Mohamed',
        age: 33,
      },
    ]);
  });
});
