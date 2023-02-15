import { createSlice } from '@reduxjs/toolkit';

import type { RequestStatus } from '@/models/request-status';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';

import { signUpForBetaAction } from '@/state/sign-up/sign-up-actions';

export interface SignUpState {
  modalVisible: boolean;
  betaSignUpStatus: RequestStatus;
}

const initialState: () => SignUpState = () => ({
  modalVisible: false,
  formData: null,
  betaSignUpStatus: 'idle'
});

const signUpSlice = createSlice({
  name: 'signUp',
  initialState,
  reducers: {
    showSignUpModalAction: (state) => {
      state.modalVisible = true;
    },
    hideSignUpModalAction: (state) => {
      state.modalVisible = false;
    },
    resetBetaSignUpStatusAction: (state) => {
      state.betaSignUpStatus = 'idle';
    }
  },
  extraReducers: (builder: ActionReducerMapBuilder<SignUpState>) => {
    /** Get nodes leaderboard **/
    builder
      .addCase(signUpForBetaAction.pending, (state) => {
        state.betaSignUpStatus = 'loading';
      })
      .addCase(signUpForBetaAction.fulfilled, (state) => {
        state.betaSignUpStatus = 'success';
      })
      .addCase(signUpForBetaAction.rejected, (state) => {
        state.betaSignUpStatus = 'failure';
      });
  }
});

export { signUpForBetaAction };

export const {
  showSignUpModalAction,
  hideSignUpModalAction,
  resetBetaSignUpStatusAction
} = signUpSlice.actions;

export default signUpSlice.reducer;
