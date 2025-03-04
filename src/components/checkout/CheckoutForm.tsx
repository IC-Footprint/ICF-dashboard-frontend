import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { Dialog } from 'primereact/dialog';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Toast } from 'primereact/toast';
import { useEffect, useState, useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { InputNumberChangeEvent } from 'primereact/inputnumber';
import type { FC, FormEventHandler } from 'react';

import CheckoutSuccess from '@/components/checkout/CheckoutSuccess';
import TokenSelection from '@/components/checkout/TokenSelection';
import usePayment from '@/helpers/state/usePayment';
import { useDebounce } from '@/helpers/useDebounce';
import { emptyPaymentModel } from '@/models/payment/payment-data-model';
import { createToast } from '@/models/toast-model';
import { plugWallet } from '@/services/plug-service';
import carouselBackground from '@/theme/assets/carousel-background.png';
import plugWalletLogo from '@/theme/assets/plug-wallet-logo.png';
import { cardBackgroundColor } from '@/theme/colors';
import { Form } from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

const SuccessDialog = styled(Dialog)`
  width: 35vw;
  background: ${cardBackgroundColor} url(${carouselBackground}) no-repeat center;
  background-size: cover;

  .p-dialog-header,
  .p-dialog-content {
    background: none;
  }
`;

interface CheckOutFormProps {
  disable?: boolean;
}

const CheckoutForm: FC<CheckOutFormProps> = ({ disable }) => {
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
    hasPaymentRegistrationError,
    lastPaymentAmount
  } = usePayment();
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const toast = useRef<Toast>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const isFormDisabled = useMemo(() => {
    return !payment?.nodeId || disable;
  }, [disable, payment]);

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
    inputRef.current?.focus();
  }, [payment]);

  const registerCarbonOffsetPayment: FormEventHandler = async (event) => {
    event.preventDefault();

    if (!plugWallet.isPlugAvailable()) {
      toast.current?.show(
        createToast(
          'warn',
          t('common.warning'),
          t('checkout.offsetEmission.error.plugWalletUnavailable')
        )
      );
      return;
    }

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
            inputRef={inputRef}
            inputId="carbonDebitAmount"
            value={payment?.carbonDebitAmount}
            allowEmpty
            onChange={updateValue}
            suffix={
              t('common.unit.co2Kg', {
                value: ''
              }) ?? ''
            }
            disabled={isFormDisabled}
          />
          <div className="p-inputgroup-addon p-0">
            <TokenSelection disabled={isFormDisabled} />
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
          <p className={`text-3xl ${isFormDisabled ? '' : 'text-color'}`}>
            {NumberUtils.formatNumber(cost, 9)}
            <span className="text-xs text-color-secondary ml-1">
              {t('common.costCurrency.icp')}
            </span>
          </p>
        )}
      </div>
      <div className="col-12 mt-5 px-3">
        <Button
          className="w-full"
          type="submit"
          loading={isPaymentRegistrationLoading}
          disabled={isFormDisabled || !payment?.carbonDebitAmount}
          iconPos="right"
          outlined
        >
          <div className="p-button-label flex align-items-center justify-content-center">
            {t('checkout.form.submit.label')}
            <img
              src={plugWalletLogo}
              alt="Plug Wallet Logo"
              className="h-2rem p-button-icon-right mr-4"
            ></img>
          </div>
        </Button>
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
          carbonDebit={lastPaymentAmount}
          account={payment?.account}
        />
      </SuccessDialog>
    </Form>
  );
};

export default CheckoutForm;
