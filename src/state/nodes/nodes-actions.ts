import { createAsyncThunk } from '@reduxjs/toolkit';

import type { NodeModel } from '@/models/nodes/node-model';

import nodesApi from '@/api/nodes-api';

export const getNodesLeaderboardAction = createAsyncThunk<NodeModel[], void>(
  '/getNodesLeaderboard',
  async (_, { rejectWithValue }) => {
    try {
      return await nodesApi.getNodesLeaderboard();
    } catch (err) {
      return rejectWithValue(null);
    }
  }
);
