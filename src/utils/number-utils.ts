export class NumberUtils {
  static formatNumber(value?: number): string | undefined {
    if (value === undefined) {
      return undefined;
    }
    return new Intl.NumberFormat().format(value);
  }
}
