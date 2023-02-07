import { useCallback } from 'react';

import type { RangeType } from '@/models/range-type';

import { getNetworkEmissionsAction } from '@/state/nodes/nodes-actions';
import { useAppDispatch, useAppSelector } from '@/state/hooks';
import { getNodesLeaderboardAction } from '@/state/nodes/nodes-slice';

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

  return {
    actions: {
      getNodesLeaderboard,
      getNetworkEmissions
    },
    nodesLeaderboard,
    isNodesLeaderboardLoading,
    hasNodesLeaderboardError,
    networkEmissions,
    isNetworkEmissionsLoading,
    hasNetworkEmissionsError
  };
};

export default useNodes;
