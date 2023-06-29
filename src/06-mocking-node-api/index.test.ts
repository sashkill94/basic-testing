// Uncomment the code below and write your tests
import { readFileAsynchronously, doStuffByTimeout, doStuffByInterval } from '.';
import fs from 'fs';
import path from 'path';

describe('doStuffByTimeout', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set timeout with provided callback and timeout', () => {
    const timeoutSpy = jest.spyOn(global, 'setTimeout');
    const callback = jest.fn();

    doStuffByTimeout(callback, 10);

    expect(setTimeout).toHaveBeenCalledTimes(1);
    expect(timeoutSpy).toHaveBeenCalledWith(callback, 10);

    timeoutSpy.mockRestore();
  });

  test('should call callback only after timeout', () => {
    const callback = jest.fn();

    doStuffByTimeout(callback, 10);

    expect(callback).not.toBeCalled();

    jest.runAllTimers();

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(1);
  });
});

describe('doStuffByInterval', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  test('should set interval with provided callback and timeout', () => {
    const intervalSpy = jest.spyOn(global, 'setInterval');
    const callback = jest.fn();

    doStuffByInterval(callback, 10);

    expect(setInterval).toHaveBeenCalledTimes(1);
    expect(intervalSpy).toHaveBeenCalledWith(callback, 10);

    intervalSpy.mockRestore();
  });

  test('should call callback multiple times after multiple intervals', () => {
    const callback = jest.fn();

    doStuffByInterval(callback, 10);

    expect(callback).not.toBeCalled();

    jest.advanceTimersByTime(30);

    expect(callback).toBeCalled();
    expect(callback).toHaveBeenCalledTimes(3);
  });
});

describe('readFileAsynchronously', () => {
  test('should call join with pathToFile', async () => {
    const mockJoin = jest.spyOn(path, 'join');

    await readFileAsynchronously('test');

    expect(mockJoin).toHaveBeenCalledWith(__dirname, 'test');
  });

  test('should return null if file does not exist', async () => {
    jest.spyOn(fs, 'existsSync').mockImplementation(() => false);
    await expect(readFileAsynchronously('test')).resolves.toBeNull;
  });

  test('should return file content if file exists', async () => {
    const fileContent = 'promises';
    jest.spyOn(fs, 'existsSync').mockImplementation(() => true);
    jest.spyOn(fs.promises, 'readFile').mockResolvedValue(fileContent);
    await expect(readFileAsynchronously('test')).resolves.toBe(fileContent);
  });
});
