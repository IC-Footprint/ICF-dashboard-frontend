import { useCallback } from 'react';

import type { RangeType } from '@/models/range-type';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  getElectricityDrawByTechnologyTypeAction,
  getNetworkEmissionsAction,
  getNodeEmissionsAction,
  getNodeEmissionsByRegionAction,
  getNodeEmissionsByProviderAction,
  getNodesLeaderboardAction,
  getNodeStatsAction
} from '@/state/nodes/nodes-slice';

const useNodes = () => {
  const dispatch = useAppDispatch();

  const getNodesLeaderboard = useCallback(
    () => dispatch(getNodesLeaderboardAction()),
    [dispatch]
  );

  const nodesLeaderboard = useAppSelector((state) => state.nodes.leaderboard);

  const isNodesLeaderboardLoading = useAppSelector(
    (state) => state.nodes.leaderboardLoading
  );

  const hasNodesLeaderboardError = useAppSelector(
    (state) => state.nodes.leaderboardError
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

  return {
    actions: {
      getNodesLeaderboard,
      getNetworkEmissions,
      getNodeEmissionsByRegion,
      getNodeEmissionsByProvider,
      getElectricityDrawByTechnologyType,
      getNodeStats,
      getNodeEmissions
    },
    nodesLeaderboard,
    isNodesLeaderboardLoading,
    hasNodesLeaderboardError,
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
    nodeEmissionsLoading
  };
};

export default useNodes;
