// Uncomment the code below and write your tests
import {
  throwError,
  throwCustomError,
  resolveValue,
  MyAwesomeError,
  rejectCustomError,
} from './index';

describe('resolveValue', () => {
  test('should resolve provided value', async () => {
    await expect(resolveValue('val')).resolves.toBe('val');
  });
});

describe('throwError', () => {
  test('should throw error with provided message', () => {
    try {
      throwError('err');
    } catch (error) {
      expect((error as Error).message).toMatch('err');
    }
  });

  test('should throw error with default message if message is not provided', () => {
    try {
      throwError();
    } catch (error) {
      expect((error as Error).message).toMatch('Oops!');
    }
  });
});

describe('throwCustomError', () => {
  try {
    throwCustomError();
  } catch (error) {
    expect(error).toBeInstanceOf(MyAwesomeError);
  }
});

describe('rejectCustomError', () => {
  test('should reject custom error', async () => {
    await rejectCustomError().catch((e) =>
      expect(e).toBeInstanceOf(MyAwesomeError),
    );
  });
});
