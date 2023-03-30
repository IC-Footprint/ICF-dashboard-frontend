import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import { Button } from 'primereact/button';
import { useCallback, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { object, string } from 'yup';

import type { FC } from 'react';
import type { ObjectSchema } from 'yup';
import type { SignUpFormModel } from '@/models/sing-up-form-model';

import ControlledInputText from '@/components/form/ControlledInputText';
import {
  FooterButtonsContainer,
  Form,
  SignUpMessage
} from '@/theme/styled-components';
import useSignUp from '@/helpers/state/useSignUp';

interface SignUpFormProps {
  showCancel?: boolean;
}

const SignUpForm: FC<SignUpFormProps> = ({ showCancel = true }) => {
  const { t } = useTranslation();
  const {
    actions: { hideSignUpModal, signUpForBeta },
    isSignUpForBetaLoading
  } = useSignUp();
  const schema = useMemo(
    (): ObjectSchema<SignUpFormModel> =>
      object({
        name: string().required().max(255),
        email: string().email().required().max(255),
        company: string().required().max(255)
      }).required(),
    []
  );
  const {
    control,
    handleSubmit,
    formState: { errors, isValid }
  } = useForm<SignUpFormModel>({
    defaultValues: {
      email: '',
      company: '',
      name: ''
    },
    mode: 'onChange',
    reValidateMode: 'onChange',
    resolver: yupResolver(schema)
  });

  const onSubmit = useCallback(
    (data: SignUpFormModel) => {
      signUpForBeta(data);
    },
    [signUpForBeta]
  );

  return (
    <>
      <h4>{t('signUp.title')}</h4>
      <SignUpMessage>{t('signUp.description')}</SignUpMessage>
      <Form onSubmit={handleSubmit(onSubmit)} className="grid">
        <div className="col-12 sm:col-6">
          <ControlledInputText<SignUpFormModel>
            name="name"
            label={t('form.name.label')}
            control={control}
            errors={errors}
            disabled={isSignUpForBetaLoading}
          />
        </div>
        <div className="col-12 sm:col-6">
          <ControlledInputText<SignUpFormModel>
            name="company"
            label={t('form.company.label')}
            control={control}
            errors={errors}
            disabled={isSignUpForBetaLoading}
          />
        </div>
        <div className="col-12">
          <ControlledInputText<SignUpFormModel>
            name="email"
            label={t('form.email.label')}
            control={control}
            errors={errors}
            disabled={isSignUpForBetaLoading}
          />
        </div>
        <span className="col-12 text-xs">{t('signUp.consentMessage')}</span>
        <FooterButtonsContainer className="col-12">
          {showCancel ? (
            <Button
              label={t('common.cancel').toString()}
              onClick={hideSignUpModal}
              type="button"
              outlined
              disabled={isSignUpForBetaLoading}
            />
          ) : null}
          <Button
            label={t('common.submit').toString()}
            type="submit"
            loading={isSignUpForBetaLoading}
            disabled={!isValid}
          />
        </FooterButtonsContainer>
      </Form>
    </>
  );
};

export default SignUpForm;
