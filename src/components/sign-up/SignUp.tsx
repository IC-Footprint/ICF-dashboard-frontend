import { Button } from 'primereact/button';
import { Toast } from 'primereact/toast';
import { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import { createToast } from '@/models/toast-model';
import SignUpForm from '@/components/sign-up/SignUpForm';
import useSignUp from '@/helpers/state/useSignUp';
import {
  FooterButtonsContainer,
  SignUpContainer,
  SignUpMessage
} from '@/theme/styled-components';

interface SignUpProps {
  showClose?: boolean;
  showCancel?: boolean;
}

const SignUp: FC<SignUpProps> = ({ showClose = true, showCancel = true }) => {
  const { t } = useTranslation();
  const toast = useRef<Toast>(null);
  const {
    actions: { resetBetaSignUpStatus, hideSignUpModal },
    isSignUpForBetaSuccessful,
    hasSignUpForBetaError
  } = useSignUp();

  useEffect(() => {
    if (hasSignUpForBetaError) {
      toast.current?.show(
        createToast('error', t('common.error'), t('signUp.error.title'))
      );
    }
    return () => {
      resetBetaSignUpStatus();
    };
  }, [t, hasSignUpForBetaError, resetBetaSignUpStatus]);

  return (
    <SignUpContainer>
      <Toast ref={toast} />
      {isSignUpForBetaSuccessful ? (
        <>
          <h5>{t('signUp.success.title')}</h5>
          <SignUpMessage>{t('signUp.success.description')}</SignUpMessage>
          <FooterButtonsContainer>
            {showClose ? (
              <Button
                label={t('common.close').toString()}
                onClick={hideSignUpModal}
              />
            ) : null}
          </FooterButtonsContainer>
        </>
      ) : (
        <SignUpForm showCancel={showCancel} />
      )}
    </SignUpContainer>
  );
};

export default SignUp;
