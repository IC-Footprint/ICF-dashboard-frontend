import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { loadGlobalConfigurationAction } from '@/state/resources/resources-slice';

const useResources = () => {
  const dispatch = useAppDispatch();

  const loadGlobalConfiguration = useCallback(
    () => dispatch(loadGlobalConfigurationAction()),
    [dispatch]
  );

  const globalConfiguration = useAppSelector(
    (state) => state.resources.globalConfiguration
  );

  return {
    actions: {
      loadGlobalConfiguration
    },
    globalConfiguration
  };
};

export default useResources;
