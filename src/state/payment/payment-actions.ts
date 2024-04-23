import { createAsyncThunk } from '@reduxjs/toolkit';

import type { PaymentDataModel } from '@/models/payment/payment-data-model';

import paymentApi from '@/api/payment-api';

export const calculateCostAction = createAsyncThunk<number, PaymentDataModel>(
  'payment/calculateCost',
  async (data: PaymentDataModel, { rejectWithValue }) => {
    try {
      return paymentApi.calculateCost(data);
    } catch (err) {
      console.error('Error calculating cost: ', err);
      return rejectWithValue(null);
    }
  }
);

export const registerPaymentAction = createAsyncThunk<
  boolean,
  PaymentDataModel
>(
  'payment/registerPayment',
  async (data: PaymentDataModel, { rejectWithValue }) => {
    try {
      const payment = paymentApi.registerPayment(data);
      // console.log('Payment: ', payment);
      return payment;
    } catch (err) {
      console.error('Error registering payment: ', err);
      return rejectWithValue(false);
    }
  }
);
