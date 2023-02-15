import { useCallback } from 'react';

import type { SignUpFormModel } from '@/models/sing-up-form-model';

import {
  hideSignUpModalAction,
  resetBetaSignUpStatusAction,
  showSignUpModalAction,
  signUpForBetaAction
} from '@/state/sign-up/sign-up-slice';

import { useAppDispatch, useAppSelector } from '@/state/hooks';

const useSignUp = () => {
  const dispatch = useAppDispatch();

  const isSignUpModalVisible = useAppSelector(
    (state) => state.signUp.modalVisible
  );

  const showSignUpModal = useCallback(
    () => dispatch(showSignUpModalAction()),
    [dispatch]
  );

  const hideSignUpModal = useCallback(
    () => dispatch(hideSignUpModalAction()),
    [dispatch]
  );

  const signUpForBeta = useCallback(
    (formData: SignUpFormModel) => dispatch(signUpForBetaAction(formData)),
    [dispatch]
  );

  const resetBetaSignUpStatus = useCallback(
    () => dispatch(resetBetaSignUpStatusAction()),
    [dispatch]
  );

  const isSignUpForBetaLoading = useAppSelector(
    (state) => state.signUp.betaSignUpStatus === 'loading'
  );

  const hasSignUpForBetaError = useAppSelector(
    (state) => state.signUp.betaSignUpStatus === 'failure'
  );

  const isSignUpForBetaSuccessful = useAppSelector(
    (state) => state.signUp.betaSignUpStatus === 'success'
  );

  return {
    actions: {
      showSignUpModal,
      hideSignUpModal,
      signUpForBeta,
      resetBetaSignUpStatus
    },
    isSignUpModalVisible,
    isSignUpForBetaLoading,
    hasSignUpForBetaError,
    isSignUpForBetaSuccessful
  };
};

export default useSignUp;
