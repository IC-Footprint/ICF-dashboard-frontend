import { createSlice } from '@reduxjs/toolkit';

import type { PaymentDataModel } from '@/models/payment/payment-data-model';
import type { PayloadAction } from '@reduxjs/toolkit';

import {
  calculateCostAction,
  registerPaymentAction
} from '@/state/payment/payment-actions';

export interface PaymentState {
  payment: PaymentDataModel | null;
  cost: number;
  costCalculationLoading: boolean;
  costCalculationError: boolean;
  paymentRegistrationLoading: boolean;
  paymentRegistrationError: boolean;
  paymentRegistered: boolean;
}

const initialState: () => PaymentState = () => ({
  payment: null,
  cost: 0,
  costCalculationLoading: false,
  costCalculationError: false,
  paymentRegistrationLoading: false,
  paymentRegistered: false,
  paymentRegistrationError: false
});

const paymentSlice = createSlice({
  name: 'payment',
  initialState: initialState(),
  reducers: {
    setPaymentAction: (state, action: PayloadAction<PaymentDataModel>) => {
      state.payment = action.payload;
    }
  },
  extraReducers: (builder) => {
    /** Calculate cost of a certain carbon debit amount **/
    builder.addCase(calculateCostAction.pending, (state, { meta }) => {
      state.payment = meta.arg;
      state.costCalculationLoading = true;
      state.costCalculationError = false;
    });

    builder.addCase(calculateCostAction.fulfilled, (state, { payload }) => {
      state.costCalculationLoading = false;
      state.cost = payload;
    });

    builder.addCase(calculateCostAction.rejected, (state) => {
      state.costCalculationLoading = false;
      state.costCalculationError = true;
    });

    /** Register payment **/
    builder.addCase(registerPaymentAction.pending, (state) => {
      state.paymentRegistrationLoading = true;
      state.paymentRegistrationError = false;
    });

    builder.addCase(registerPaymentAction.fulfilled, (state, { payload }) => {
      state.paymentRegistrationLoading = false;
      state.paymentRegistered = payload;
    });

    builder.addCase(registerPaymentAction.rejected, (state) => {
      state.paymentRegistrationLoading = false;
      state.paymentRegistrationError = true;
    });
  }
});

export const { setPaymentAction } = paymentSlice.actions;

export { calculateCostAction, registerPaymentAction };

export default paymentSlice.reducer;
