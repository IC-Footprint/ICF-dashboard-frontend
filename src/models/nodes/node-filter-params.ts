import type { RangeType } from '@/models/range-type';

export interface NodeFilterParams {
  nodeId: string;
  range: RangeType | null;
}
