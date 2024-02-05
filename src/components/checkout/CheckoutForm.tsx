import { Button } from 'primereact/button';
import { InputNumber } from 'primereact/inputnumber';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { InputNumberChangeEvent } from 'primereact/inputnumber';
import type { FC, FormEventHandler } from 'react';

import TokenSelection from '@/components/checkout/TokenSelection';
import usePayment from '@/helpers/state/usePayment';
import { useDebounce } from '@/helpers/useDebounce';
import { emptyPaymentModel } from '@/models/payment/payment-data-model';
import { Form } from '@/theme/styled-components';

const CheckoutForm: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { setPayment, calculateCost, registerPayment },
    cost,
    payment,
    isCostCalculationLoading,
    isPaymentRegistrationLoading
  } = usePayment();

  useEffect(() => {
    if (!payment) {
      setPayment(emptyPaymentModel());
    }
  }, [payment, setPayment]);

  const updateDebitAmountAndCalculateCost = async (
    e: InputNumberChangeEvent
  ) => {
    const paymentValue = payment ?? emptyPaymentModel();
    calculateCost({ ...paymentValue, carbonDebitAmount: e.value ?? 0 });
  };

  const debouncedUpdateDebitAmount = useDebounce(
    updateDebitAmountAndCalculateCost,
    300
  );

  const registerCarbonOffsetPayment: FormEventHandler = (event) => {
    event.preventDefault();
    if (payment) {
      registerPayment(payment);
    }
  };

  return (
    <Form onSubmit={registerCarbonOffsetPayment} className="grid">
      <div className="col-12">
        <label className="opacity-70 mb-2 block" htmlFor="carbonDebitAmount">
          {t('checkout.form.amount.label')}
        </label>
        <div className="p-inputgroup">
          <InputNumber
            inputId="carbonDebitAmount"
            value={payment?.carbonDebitAmount}
            allowEmpty
            onChange={debouncedUpdateDebitAmount}
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
        <h5 className="text-sm">{t('checkout.form.cost.label')}</h5>
        {isCostCalculationLoading ? (
          <ProgressSpinner className="w-2rem h-2rem" />
        ) : (
          <p className="text-3xl">
            {cost}
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
    </Form>
  );
};

export default CheckoutForm;
