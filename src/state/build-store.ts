import { configureStore } from '@reduxjs/toolkit';

import type { SignUpState } from '@/state/sign-up/sign-up-slice';
import type { NodesState } from '@/state/nodes/nodes-slice';
import type { DashboardState } from '@/state/dashboard/dashboard-slice';

import signUpReducer from '@/state/sign-up/sign-up-slice';
import nodesReducer from '@/state/nodes/nodes-slice';
import dashboardReducer from '@/state/dashboard/dashboard-slice';

export interface RootState {
  nodes: NodesState;
  dashboard: DashboardState;
  signUp: SignUpState;
}

export const createStore = () =>
  configureStore<RootState>({
    reducer: {
      nodes: nodesReducer,
      dashboard: dashboardReducer,
      signUp: signUpReducer
    }
  });

export const store = createStore();
export default store;
