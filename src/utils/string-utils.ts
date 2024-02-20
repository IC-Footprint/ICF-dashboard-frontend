import { NumberUtils } from '@/utils/number-utils';

export class StringUtils {
  static toDifferencePercentage(value?: number): string {
    if (value === undefined) {
      return '-';
    }
    let sign = '';
    if (value > 0) {
      sign = '+';
    }
    return `${sign}${NumberUtils.formatNumber(value, 2)}%`;
  }
}
