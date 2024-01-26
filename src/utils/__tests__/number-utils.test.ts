import { NumberUtils } from '@/utils/number-utils';

describe('NumberUtils', () => {
  test('should return undefined when the value is undefined', () => {
    expect(NumberUtils.formatNumber()).toBeUndefined();
  });

  test('should return the value formatted when the value is defined', () => {
    expect(NumberUtils.formatNumber(1000)).toBe('1,000');
  });
});
