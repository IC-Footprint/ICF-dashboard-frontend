import { useCallback } from 'react';

import type { PaymentDataModel } from '@/models/payment/payment-data-model';

import { useAppSelector, useAppDispatch } from '@/state/hooks';
import {
  calculateCostAction,
  registerPaymentAction,
  setPaymentAction,
  resetPaymentRegistrationAction,
  resetPaymentAction
} from '@/state/payment/payment-slice';

const usePayment = () => {
  const dispatch = useAppDispatch();

  const payment = useAppSelector((state) => state.payment.payment);

  const setPayment = useCallback(
    (payment: PaymentDataModel) => dispatch(setPaymentAction(payment)),
    [dispatch]
  );

  const calculateCost = useCallback(
    (payment: PaymentDataModel) => dispatch(calculateCostAction(payment)),
    [dispatch]
  );

  const cost = useAppSelector((state) => state.payment.cost);

  const isCostCalculationLoading = useAppSelector(
    (state) => state.payment.costCalculationLoading
  );

  const hasCostCalculationError = useAppSelector(
    (state) => state.payment.costCalculationError
  );

  const registerPayment = useCallback(
    (payment: PaymentDataModel) => dispatch(registerPaymentAction(payment)),
    [dispatch]
  );

  const paymentRegistered = useAppSelector(
    (state) => state.payment.paymentRegistered
  );

  const isPaymentRegistrationLoading = useAppSelector(
    (state) => state.payment.paymentRegistrationLoading
  );

  const hasPaymentRegistrationError = useAppSelector(
    (state) => state.payment.paymentRegistrationError
  );

  const resetPaymentRegistration = useCallback(
    () => dispatch(resetPaymentRegistrationAction()),
    [dispatch]
  );

  const resetPayment = useCallback(
    (payment: Partial<PaymentDataModel>) =>
      dispatch(resetPaymentAction(payment)),
    [dispatch]
  );

  const lastPaymentAmount = useAppSelector(
    (state) => state.payment.lastPaymentAmount
  );

  return {
    actions: {
      setPayment,
      calculateCost,
      registerPayment,
      resetPaymentRegistration,
      resetPayment
    },
    payment,
    cost,
    isCostCalculationLoading,
    hasCostCalculationError,
    paymentRegistered,
    isPaymentRegistrationLoading,
    hasPaymentRegistrationError,
    lastPaymentAmount
  };
};

export default usePayment;
