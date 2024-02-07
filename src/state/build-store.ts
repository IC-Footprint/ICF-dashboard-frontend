import { configureStore } from '@reduxjs/toolkit';

import type { DashboardState } from '@/state/dashboard/dashboard-slice';
import type { NetworkState } from '@/state/network/network-slice';
import type { NodeProvidersState } from '@/state/node-providers/node-providers-slice';
import type { NodesState } from '@/state/nodes/nodes-slice';
import type { PaymentState } from '@/state/payment/payment-slice';
import type { ResourcesState } from '@/state/resources/resources-slice';
import type { SignUpState } from '@/state/sign-up/sign-up-slice';

import dashboardReducer from '@/state/dashboard/dashboard-slice';
import networkReducer from '@/state/network/network-slice';
import nodeProvidersReducer from '@/state/node-providers/node-providers-slice';
import nodesReducer from '@/state/nodes/nodes-slice';
import paymentReducer from '@/state/payment/payment-slice';
import resourcesReducer from '@/state/resources/resources-slice';
import signUpReducer from '@/state/sign-up/sign-up-slice';

export interface RootState {
  nodes: NodesState;
  dashboard: DashboardState;
  signUp: SignUpState;
  network: NetworkState;
  resources: ResourcesState;
  payment: PaymentState;
  nodeProviders: NodeProvidersState;
}

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore<RootState>({
    reducer: {
      nodes: nodesReducer,
      network: networkReducer,
      dashboard: dashboardReducer,
      signUp: signUpReducer,
      resources: resourcesReducer,
      payment: paymentReducer,
      nodeProviders: nodeProvidersReducer
    },
    preloadedState
  });

export const store = createStore();
export default store;
