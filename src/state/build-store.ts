import { configureStore } from '@reduxjs/toolkit';

import type { DashboardState } from '@/state/dashboard/dashboard-slice';
import type { NodesState } from '@/state/nodes/nodes-slice';
import type { SignUpState } from '@/state/sign-up/sign-up-slice';
import type { SubnetsState } from '@/state/subnets/subnets-slice';
import type { ResourcesState } from '@/state/resources/resources-slice';

import dashboardReducer from '@/state/dashboard/dashboard-slice';
import nodesReducer from '@/state/nodes/nodes-slice';
import resourcesReducer from '@/state/resources/resources-slice';
import signUpReducer from '@/state/sign-up/sign-up-slice';
import subnetsReducer from '@/state/subnets/subnets-slice';

export interface RootState {
  nodes: NodesState;
  dashboard: DashboardState;
  signUp: SignUpState;
  subnets: SubnetsState;
  resources: ResourcesState;
}

export const createStore = (preloadedState?: Partial<RootState>) =>
  configureStore<RootState>({
    reducer: {
      nodes: nodesReducer,
      subnets: subnetsReducer,
      dashboard: dashboardReducer,
      signUp: signUpReducer,
      resources: resourcesReducer
    },
    preloadedState
  });

export const store = createStore();
export default store;
