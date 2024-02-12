import { expect, describe, test } from 'vitest';

import { StringUtils } from '@/utils/string-utils';

describe('StringUtils', () => {
  test('should return default value when the value is undefined', () => {
    expect(StringUtils.toDifferencePercentage()).toBe('-');
  });

  test('should return 0 with no sign when the value is 0', () => {
    expect(StringUtils.toDifferencePercentage(0)).toBe('0%');
  });

  test('should return the value with a plus sign and percentage when the value is positive', () => {
    expect(StringUtils.toDifferencePercentage(10)).toBe('+10%');
  });

  test('should return the value with a minus sign and percentage when the value is negative', () => {
    expect(StringUtils.toDifferencePercentage(-10)).toBe('-10%');
  });
});
