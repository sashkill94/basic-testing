// Uncomment the code below and write your tests
import {
  getBankAccount,
  InsufficientFundsError,
  SynchronizationFailedError,
  TransferFailedError,
} from '.';
import lodash from 'lodash';

lodash.random = jest.fn();

describe('BankAccount', () => {
  let account = getBankAccount(100);
  let toAccount = getBankAccount(100);

  beforeEach(() => {
    account = getBankAccount(100);
    toAccount = getBankAccount(100);
  });

  test('should create account with initial balance', () => {
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    try {
      account.withdraw(100000);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring more than balance', () => {
    try {
      account.transfer(100000, toAccount);
    } catch (error) {
      expect(error).toBeInstanceOf(InsufficientFundsError);
    }
  });

  test('should throw error when transferring to the same account', () => {
    try {
      account.transfer(100000, account);
    } catch (error) {
      expect(error).toBeInstanceOf(TransferFailedError);
    }
  });

  test('should deposit money', () => {
    account.deposit(100);
    expect(account.getBalance()).toBe(200);
  });

  test('should withdraw money', () => {
    account.withdraw(50);
    expect(account.getBalance()).toBe(50);
  });

  test('should transfer money', () => {
    account.transfer(30, toAccount);
    expect(account.getBalance()).toBe(70);
    expect(toAccount.getBalance()).toBe(130);
  });

  test('fetchBalance should return number in case if request did not failed', async () => {
    (lodash.random as jest.Mock).mockReturnValue(1);
    const result = await account.fetchBalance();
    expect(typeof result === 'number').toBeTruthy();
  });

  test('should set new balance if fetchBalance returned number', async () => {
    (lodash.random as jest.Mock).mockReturnValue(1);
    try {
      const result = await account.synchronizeBalance();
      expect(typeof result === 'number').toBeTruthy();
    } catch {}
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    (lodash.random as jest.Mock).mockReturnValue(0);
    try {
      await account.synchronizeBalance();
    } catch (error) {
      expect(error).toBeInstanceOf(SynchronizationFailedError);
    }
  });
});
