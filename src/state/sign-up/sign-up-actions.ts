import { createAsyncThunk } from '@reduxjs/toolkit';

import type { SignUpFormModel } from '@/models/sing-up-form-model';
import type { OperationResultModel } from '@/models/operation-result-model';

import signUpApi from '@/api/sign-up-api';

export const signUpForBetaAction = createAsyncThunk<
  OperationResultModel,
  SignUpFormModel
>('/signUp/signUpForBeta', async (formData, { rejectWithValue }) => {
  try {
    return await signUpApi.signUpForBeta(formData);
  } catch (err) {
    return rejectWithValue(null);
  }
});
