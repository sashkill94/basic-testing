// Uncomment the code below and write your tests
import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const n = simpleCalculator({ a: 1, b: 2, action: Action.Add });
    expect(n).not.toBeNull();
    expect(n).toBe(3);
  });

  test('should subtract two numbers', () => {
    const n = simpleCalculator({ a: 1, b: 2, action: Action.Subtract });
    expect(n).not.toBeNull();
    expect(n).toBe(-1);
  });

  test('should multiply two numbers', () => {
    const n = simpleCalculator({ a: 2, b: 2, action: Action.Multiply });
    expect(n).not.toBeNull();
    expect(n).toBe(4);
  });

  test('should divide two numbers', () => {
    const n = simpleCalculator({ a: 4, b: 2, action: Action.Divide });
    expect(n).not.toBeNull();
    expect(n).toBe(2);
  });

  test('should exponentiate two numbers', () => {
    const n = simpleCalculator({ a: 2, b: 3, action: Action.Exponentiate });
    expect(n).not.toBeNull();
    expect(n).toBe(8);
  });

  test('should return null for invalid action', () => {
    const n = simpleCalculator({ a: 1, b: 2, action: 'invalid' });
    expect(n).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const n = simpleCalculator({ a: 1, b: 'dummy', action: Action.Add });
    expect(n).toBeNull();
  });
});
