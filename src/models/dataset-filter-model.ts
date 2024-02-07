import type { RangeType } from '@/models/range-type';

export interface DatasetFilterModel {
  id: string;
  range: RangeType | null;
}
