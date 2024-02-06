import { useCallback } from 'react';

import type { RangeType } from '@/models/range-type';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  getElectricityDrawByTechnologyTypeAction,
  getNetworkEmissionsAction,
  getNodeEmissionsAction,
  getNodeEmissionsByRegionAction,
  getNodeEmissionsByProviderAction,
  getNodesListAction,
  getNodeStatsAction,
  getNodeDetailsAction,
  getNodeCanisterAttributionsAction
} from '@/state/nodes/nodes-slice';

const useNodes = () => {
  const dispatch = useAppDispatch();

  const getNodesList = useCallback(
    () => dispatch(getNodesListAction()),
    [dispatch]
  );

  const nodesList = useAppSelector((state) => state.nodes.nodesList);

  const isNodesListLoading = useAppSelector(
    (state) => state.nodes.nodesListLoading
  );

  const hasNodesListError = useAppSelector(
    (state) => state.nodes.nodesListError
  );

  const getNetworkEmissions = useCallback(
    (range: RangeType | null) => dispatch(getNetworkEmissionsAction(range)),
    [dispatch]
  );

  const networkEmissions = useAppSelector(
    (state) => state.nodes.networkEmissions
  );

  const isNetworkEmissionsLoading = useAppSelector(
    (state) => state.nodes.networkEmissionsLoading
  );

  const hasNetworkEmissionsError = useAppSelector(
    (state) => state.nodes.networkEmissionsError
  );

  const getNodeEmissionsByRegion = useCallback(
    (range: RangeType | null) =>
      dispatch(getNodeEmissionsByRegionAction(range)),
    [dispatch]
  );

  const nodeEmissionsByRegion = useAppSelector(
    (state) => state.nodes.nodeEmissionsByRegion
  );

  const isNodeEmissionsByRegionLoading = useAppSelector(
    (state) => state.nodes.nodeEmissionsByRegionLoading
  );

  const hasNodeEmissionsByRegionError = useAppSelector(
    (state) => state.nodes.nodeEmissionsByRegionError
  );

  const getNodeEmissionsByProvider = useCallback(
    (range: RangeType | null) =>
      dispatch(getNodeEmissionsByProviderAction(range)),
    [dispatch]
  );
  const nodeEmissionsByProvider = useAppSelector(
    (state) => state.nodes.nodeEmissionsByProvider
  );
  const isNodeEmissionsByProviderLoading = useAppSelector(
    (state) => state.nodes.nodeEmissionsByProviderLoading
  );
  const hasNodeEmissionsByProviderError = useAppSelector(
    (state) => state.nodes.nodeEmissionsByProviderError
  );

  const getElectricityDrawByTechnologyType = useCallback(
    (range: RangeType | null) =>
      dispatch(getElectricityDrawByTechnologyTypeAction(range)),
    [dispatch]
  );

  const electricityDrawByTechnologyType = useAppSelector(
    (state) => state.nodes.electricityDrawByTechnologyType
  );

  const isElectricityDrawByTechnologyTypeLoading = useAppSelector(
    (state) => state.nodes.electricityDrawByTechnologyTypeLoading
  );

  const hasElectricityDrawByTechnologyTypeError = useAppSelector(
    (state) => state.nodes.electricityDrawByTechnologyTypeError
  );

  const getNodeStats = useCallback(
    (nodeId: string) => dispatch(getNodeStatsAction(nodeId)),
    [dispatch]
  );

  const nodeStats = useAppSelector((state) => state.nodes.nodeStats);

  const getNodeEmissions = useCallback(
    (nodeId: string, range: RangeType | null) =>
      dispatch(getNodeEmissionsAction({ nodeId, range })),
    [dispatch]
  );

  const nodeEmissions = useAppSelector((state) => state.nodes.nodeEmissions);

  const nodeEmissionsLoading = useAppSelector(
    (state) => state.nodes.nodeEmissionsLoading
  );

  const getNodeDetails = useCallback(
    (nodeId: string) => dispatch(getNodeDetailsAction(nodeId)),
    [dispatch]
  );

  const nodeDetails = useAppSelector((state) => state.nodes.nodeDetails);

  const nodeDetailsLoading = useAppSelector(
    (state) => state.nodes.nodeDetailsLoading
  );

  const nodeDetailsError = useAppSelector(
    (state) => state.nodes.nodeDetailsError
  );

  const getNodeCanisterAttributions = useCallback(
    (nodeId: string) => dispatch(getNodeCanisterAttributionsAction(nodeId)),
    [dispatch]
  );

  const canisterAttributions = useAppSelector(
    (state) => state.nodes.canisterAttributions
  );

  const isCanisterAttributionsLoading = useAppSelector(
    (state) => state.nodes.canisterAttributionsLoading
  );

  const hasCanisterAttributionsError = useAppSelector(
    (state) => state.nodes.canisterAttributionsError
  );

  return {
    actions: {
      getNodesList,
      getNetworkEmissions,
      getNodeEmissionsByRegion,
      getNodeEmissionsByProvider,
      getElectricityDrawByTechnologyType,
      getNodeStats,
      getNodeEmissions,
      getNodeDetails,
      getNodeCanisterAttributions
    },
    nodesList,
    isNodesListLoading,
    hasNodesListError,
    networkEmissions,
    isNetworkEmissionsLoading,
    hasNetworkEmissionsError,
    nodeEmissionsByRegion,
    isNodeEmissionsByRegionLoading,
    hasNodeEmissionsByRegionError,
    nodeEmissionsByProvider,
    isNodeEmissionsByProviderLoading,
    hasNodeEmissionsByProviderError,
    electricityDrawByTechnologyType,
    isElectricityDrawByTechnologyTypeLoading,
    hasElectricityDrawByTechnologyTypeError,
    nodeStats,
    nodeEmissions,
    nodeEmissionsLoading,
    nodeDetails,
    nodeDetailsLoading,
    nodeDetailsError,
    canisterAttributions,
    isCanisterAttributionsLoading,
    hasCanisterAttributionsError
  };
};

export default useNodes;
