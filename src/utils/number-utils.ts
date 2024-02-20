export class NumberUtils {
  static formatNumber(
    value?: number,
    maximumSignificantDigits?: number
  ): string | undefined {
    if (value === undefined) {
      return undefined;
    }
    return new Intl.NumberFormat(undefined, {
      maximumSignificantDigits,
      maximumFractionDigits: 2
    }).format(value);
  }
}
