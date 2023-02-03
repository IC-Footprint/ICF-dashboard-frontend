import { useCallback } from 'react';

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

  return {
    actions: {
      getNodesLeaderboard
    },
    nodesLeaderboard,
    isNodesLeaderboardLoading,
    hasNodesLeaderboardError
  };
};

export default useNodes;
