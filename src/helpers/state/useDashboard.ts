import { useCallback } from 'react';

import {
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
  getNodesCountersAction
} from '@/state/dashboard/dashboard-slice';
import { useAppDispatch, useAppSelector } from '@/state/hooks';

const useDashboard = () => {
  const dispatch = useAppDispatch();

  const getHeadlineFigures = useCallback(
    () => dispatch(getHeadlineFiguresAction()),
    [dispatch]
  );

  const headlineFigures = useAppSelector(
    (state) => state.dashboard.headlineFigures
  );

  const isHeadlineFiguresLoading = useAppSelector(
    (state) => state.dashboard.headlineFiguresLoading
  );

  const hasHeadlineFiguresError = useAppSelector(
    (state) => state.dashboard.headlineFiguresError
  );

  const getLocationsLeaderboard = useCallback(
    () => dispatch(getLocationsLeaderboardAction()),
    [dispatch]
  );

  const locationsLeaderboard = useAppSelector(
    (state) => state.dashboard.locationsLeaderboard
  );

  const isLocationsLeaderboardLoading = useAppSelector(
    (state) => state.dashboard.locationsLeaderboardLoading
  );

  const hasLocationsLeaderboardError = useAppSelector(
    (state) => state.dashboard.locationsLeaderboardError
  );

  const getNodesCounters = useCallback(
    () => dispatch(getNodesCountersAction()),
    [dispatch]
  );

  const nodesCounters = useAppSelector(
    (state) => state.dashboard.nodesCounters
  );

  const isNodesCountersLoading = useAppSelector(
    (state) => state.dashboard.nodesCountersLoading
  );

  const hasNodesCountersError = useAppSelector(
    (state) => state.dashboard.nodesCountersError
  );

  return {
    actions: {
      getHeadlineFigures,
      getLocationsLeaderboard,
      getNodesCounters
    },
    headlineFigures,
    isHeadlineFiguresLoading,
    hasHeadlineFiguresError,
    locationsLeaderboard,
    isLocationsLeaderboardLoading,
    hasLocationsLeaderboardError,
    nodesCounters,
    isNodesCountersLoading,
    hasNodesCountersError
  };
};

export default useDashboard;
