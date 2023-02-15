import type { FormErrorMessageModel } from '@/models/form/form-error-message-model';

export interface FormErrorModel {
  type: string;
  message: string | FormErrorMessageModel;
}
