// Uncomment the code below and write your tests
import axios from 'axios';
import { throttledGetDataFromApi } from './index';

describe('throttledGetDataFromApi', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
    jest.resetAllMocks();
  });

  test('should create instance with provided base url', async () => {
    const spy = jest.spyOn(axios, 'create');
    await throttledGetDataFromApi('/users');
    jest.advanceTimersByTime(5000);
    expect(spy).toBeCalledWith({
      baseURL: 'https://jsonplaceholder.typicode.com',
    });
  });

  test('should perform request to correct provided url', async () => {
    const spy = jest.spyOn(axios.Axios.prototype, 'get');
    await throttledGetDataFromApi('/users');
    jest.advanceTimersByTime(5000);
    expect(spy).toHaveBeenCalledWith('/users');
  });

  test('should return response data', async () => {
    const mockResponseData = { id: 1, name: 'John Doe' };
    const mockAxiosGet = jest
      .spyOn(axios.Axios.prototype, 'get')
      .mockResolvedValueOnce({
        data: mockResponseData,
      });

    const result = await throttledGetDataFromApi('/users');
    jest.advanceTimersByTime(5000);

    expect(mockAxiosGet).toHaveBeenCalledWith('/users');
    expect(result).toEqual(mockResponseData);
  });
});
