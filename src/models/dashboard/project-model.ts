import type { OperatorModel } from '@/models/dashboard/carbon-account-model';

export interface ProjectModel extends OperatorModel {
  id: string[];
  name: string;
  icon?: string;
}
