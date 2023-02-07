import { useCallback } from 'react';

import type { RangeType } from '@/models/range-type';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  getElectricityDrawByTechnologyTypeAction,
  getNetworkEmissionsAction,
  getNodeEmissionsByRegionAction,
  getNodesLeaderboardAction
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

  return {
    actions: {
      getNodesLeaderboard,
      getNetworkEmissions,
      getNodeEmissionsByRegion,
      getElectricityDrawByTechnologyType
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
    electricityDrawByTechnologyType,
    isElectricityDrawByTechnologyTypeLoading,
    hasElectricityDrawByTechnologyTypeError
  };
};

export default useNodes;
