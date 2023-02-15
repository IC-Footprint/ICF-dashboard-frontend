import axios from 'axios';

import type { SignUpFormModel } from '@/models/sing-up-form-model';
import type { AxiosResponse } from 'axios';
import type { OperationResultModel } from '@/models/operation-result-model';

export class SignUpApi {
  async signUpForBeta(
    formData: SignUpFormModel
  ): Promise<OperationResultModel> {
    const response: AxiosResponse<OperationResultModel> = await axios.post(
      '/subscriptions/beta',
      formData
    );
    return response.data;
  }
}

const signUpApi: SignUpApi = new SignUpApi();
export default signUpApi;
