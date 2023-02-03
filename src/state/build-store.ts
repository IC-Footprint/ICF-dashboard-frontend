import { configureStore } from '@reduxjs/toolkit';

import type { NodesState } from '@/state/nodes/nodes-slice';

import nodesReducer from '@/state/nodes/nodes-slice';

export interface RootState {
  nodes: NodesState;
}

export const createStore = () =>
  configureStore<RootState>({
    reducer: {
      nodes: nodesReducer
    }
  });

export const store = createStore();
export default store;
