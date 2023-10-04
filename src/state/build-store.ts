import { configureStore } from '@reduxjs/toolkit';

import type { SignUpState } from '@/state/sign-up/sign-up-slice';
import type { NodesState } from '@/state/nodes/nodes-slice';
import type { SubnetsState } from '@/state/subnets/subnets-slice';
import type { DashboardState } from '@/state/dashboard/dashboard-slice';

import signUpReducer from '@/state/sign-up/sign-up-slice';
import nodesReducer from '@/state/nodes/nodes-slice';
import subnetsReducer from '@/state/subnets/subnets-slice';
import dashboardReducer from '@/state/dashboard/dashboard-slice';

export interface RootState {
  nodes: NodesState;
  dashboard: DashboardState;
  signUp: SignUpState;
  subnets: SubnetsState;
}

export const createStore = () =>
  configureStore<RootState>({
    reducer: {
      nodes: nodesReducer,
      subnets: subnetsReducer,
      dashboard: dashboardReducer,
      signUp: signUpReducer
    }
  });

export const store = createStore();
export default store;
