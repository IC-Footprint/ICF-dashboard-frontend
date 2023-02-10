import { configureStore } from '@reduxjs/toolkit';

import type { NodesState } from '@/state/nodes/nodes-slice';
import type { DashboardState } from '@/state/dashboard/dashboard-slice';

import nodesReducer from '@/state/nodes/nodes-slice';
import dashboardReducer from '@/state/dashboard/dashboard-slice';

export interface RootState {
  nodes: NodesState;
  dashboard: DashboardState;
}

export const createStore = () =>
  configureStore<RootState>({
    reducer: {
      nodes: nodesReducer,
      dashboard: dashboardReducer
    }
  });

export const store = createStore();
export default store;
