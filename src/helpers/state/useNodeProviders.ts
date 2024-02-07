import { useCallback } from 'react';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  getNodeProviderCanisterAttributionAction,
  getNodeProviderDetailsAction
} from '@/state/node-providers/node-providers-slice';

const useNodeProviders = () => {
  const dispatch = useAppDispatch();

  const getNodeProviderDetails = useCallback(
    (providerId: string) => dispatch(getNodeProviderDetailsAction(providerId)),
    [dispatch]
  );

  const nodeProviderStats = useAppSelector(
    (state) => state.nodeProviders.nodeProviderStats
  );

  const nodeProvider = useAppSelector(
    (state) => state.nodeProviders.nodeProvider
  );

  const isNodeProviderLoading = useAppSelector(
    (state) => state.nodeProviders.nodeProviderLoading
  );

  const hasNodeProviderError = useAppSelector(
    (state) => state.nodeProviders.nodeProviderError
  );

  const getNodeProviderCanisterAttributions = useCallback(
    (providerId: string) =>
      dispatch(getNodeProviderCanisterAttributionAction(providerId)),
    [dispatch]
  );

  const nodeProviderCanisterAttributions = useAppSelector(
    (state) => state.nodeProviders.nodeProviderCanisterAttributions
  );

  const isNodeProviderCanisterAttributionsLoading = useAppSelector(
    (state) => state.nodeProviders.nodeProviderCanisterAttributionsLoading
  );

  const hasNodeProviderCanisterAttributionsError = useAppSelector(
    (state) => state.nodeProviders.nodeProviderCanisterAttributionsError
  );

  return {
    actions: {
      getNodeProviderDetails,
      getNodeProviderCanisterAttributions
    },
    nodeProviderStats,
    nodeProvider,
    isNodeProviderLoading,
    hasNodeProviderError,
    nodeProviderCanisterAttributions,
    isNodeProviderCanisterAttributionsLoading,
    hasNodeProviderCanisterAttributionsError
  };
};

export default useNodeProviders;
