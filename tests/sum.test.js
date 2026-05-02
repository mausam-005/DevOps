const sum = require('../src/sum');

describe('sum function — unit tests', () => {
  test('adds 2 + 3 to equal 5', () => {
    expect(sum(2, 3)).toBe(5);
  });

  test('adds negative numbers correctly', () => {
    expect(sum(-1, -2)).toBe(-3);
  });

  test('adds zero without changing value', () => {
    expect(sum(0, 5)).toBe(5);
  });

  test('handles large numbers', () => {
    expect(sum(1000000, 2000000)).toBe(3000000);
  });

  test('adds decimal numbers', () => {
    expect(sum(1.5, 2.5)).toBe(4);
  });
});
