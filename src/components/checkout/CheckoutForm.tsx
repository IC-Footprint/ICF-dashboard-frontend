import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { useEffect, useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import type { InputNumberChangeEvent } from 'primereact/inputnumber';
import type { FC, FormEventHandler } from 'react';

import { NumberUtils } from '@/utils/number-utils';
import CheckoutSuccess from '@/components/checkout/CheckoutSuccess';
import TokenSelection from '@/components/checkout/TokenSelection';
import usePayment from '@/helpers/state/usePayment';
import { useDebounce } from '@/helpers/useDebounce';
import { emptyPaymentModel } from '@/models/payment/payment-data-model';
import { createToast } from '@/models/toast-model';
import carouselBackground from '@/theme/assets/carousel-background.png';
import { Form } from '@/theme/styled-components';

const SuccessDialog = styled(Dialog)`
  width: 35vw;
  background: #071426 url(${carouselBackground}) no-repeat center;
  background-size: cover;

  .p-dialog-header,
  .p-dialog-content {
    background: none;
  }
`;

const CheckoutForm: FC = () => {
  const { t } = useTranslation();
  const {
    actions: {
      setPayment,
      calculateCost,
      registerPayment,
      resetPaymentRegistration
    },
    cost,
    payment,
    isCostCalculationLoading,
    isPaymentRegistrationLoading,
    paymentRegistered,
    hasPaymentRegistrationError
  } = usePayment();
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const toast = useRef<Toast>(null);

  useEffect(() => {
    if (!payment) {
      setPayment(emptyPaymentModel());
    }
  }, [payment, setPayment]);

  useEffect(() => {
    if (paymentRegistered) {
      setSuccessDialogVisible(true);
    }
  }, [paymentRegistered]);

  useEffect(() => {
    if (hasPaymentRegistrationError) {
      toast.current?.show(
        createToast(
          'error',
          t('common.error'),
          t('checkout.offsetEmission.error.title')
        )
      );
    }
    return () => {
      resetPaymentRegistration();
    };
  }, [t, hasPaymentRegistrationError, resetPaymentRegistration]);

  const updateValue = (e: InputNumberChangeEvent) => {
    const paymentValue = payment ?? emptyPaymentModel();
    setPayment({ ...paymentValue, carbonDebitAmount: e.value ?? 0 });
  };

  const debouncedCalculateAmount = useDebounce(() => {
    if (payment) {
      calculateCost(payment);
    }
  }, 300);

  useEffect(() => {
    debouncedCalculateAmount();
  }, [payment]);

  const registerCarbonOffsetPayment: FormEventHandler = async (event) => {
    event.preventDefault();
    if (payment) {
      registerPayment({
        ...payment,
        totalCost: cost
      });
    }
  };

  return (
    <Form onSubmit={registerCarbonOffsetPayment} className="grid">
      <Toast ref={toast} />
      <div className="col-12">
        <label className="opacity-70 mb-2 block" htmlFor="carbonDebitAmount">
          {t('checkout.form.amount.label')}
        </label>
        <div className="p-inputgroup">
          <InputNumber
            inputId="carbonDebitAmount"
            value={payment?.carbonDebitAmount}
            allowEmpty
            onChange={updateValue}
            suffix={
              t('common.unit.co2Kg', {
                value: ''
              }) ?? ''
            }
          />
          <div className="p-inputgroup-addon p-0">
            <TokenSelection />
          </div>
        </div>
      </div>
      <div className="col-12">
        <h5 className="font-normal text-color-secondary">
          {t('checkout.form.cost.label')}
        </h5>
        {isCostCalculationLoading ? (
          <ProgressSpinner className="w-2rem h-2rem" />
        ) : (
          <p className="text-3xl text-color">
            {NumberUtils.formatNumber(cost, 3)}
            <span className="text-xs text-color-secondary ml-1">
              {t('common.costCurrency.icp')}
            </span>
          </p>
        )}
      </div>
      <div className="col-12 mt-5">
        <Button
          className="w-full mx-3"
          type="submit"
          loading={isPaymentRegistrationLoading}
          label={t('checkout.form.submit.label') ?? ''}
        />
      </div>
      <SuccessDialog
        visible={successDialogVisible}
        onHide={() => setSuccessDialogVisible(false)}
        draggable={false}
        resizable={false}
        breakpoints={{ '1440px': '50vw', '960px': '75vw', '641px': '100vw' }}
      >
        <CheckoutSuccess
          nodeId={payment?.nodeId ?? ''}
          carbonDebit={payment?.carbonDebitAmount ?? 0}
        />
      </SuccessDialog>
    </Form>
  );
};

export default CheckoutForm;
