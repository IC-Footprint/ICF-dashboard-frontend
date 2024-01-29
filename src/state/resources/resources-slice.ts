import { createSlice } from '@reduxjs/toolkit';

import type { GlobalConfigurationModel } from '@/models/global-configuration-model';

import { loadGlobalConfigurationAction } from '@/state/resources/resources-actions';

export interface ResourcesState {
  globalConfiguration: GlobalConfigurationModel | null;
}

export const initialState: () => ResourcesState = () => ({
  globalConfiguration: null
});

const resourcesSlice = createSlice({
  name: 'resources',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    /** Get links **/
    builder.addCase(
      loadGlobalConfigurationAction.fulfilled,
      (state, action) => {
        state.globalConfiguration = action.payload;
      }
    );
  }
});

export { loadGlobalConfigurationAction };

export default resourcesSlice.reducer;
