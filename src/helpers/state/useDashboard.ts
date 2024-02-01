import { useCallback } from 'react';

import type { DataLayoutType } from '@/models/dashboard/data-layout-type';

import {
  getDashboardCarbonDebitAction,
  getGlobePointsAction,
  getHeadlineFiguresAction,
  getLocationsLeaderboardAction,
  getNodeProvidersAction,
  getNodesCountersAction,
  setDataLayoutAction
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

  const getGlobePoints = useCallback(
    () => dispatch(getGlobePointsAction()),
    [dispatch]
  );

  const globePoints = useAppSelector((state) => state.dashboard.globePoints);

  const isGlobePointsLoading = useAppSelector(
    (state) => state.dashboard.globePointsLoading
  );

  const hasGlobePointsError = useAppSelector(
    (state) => state.dashboard.globePointsError
  );

  const getDashboardCarbonDebits = useCallback(
    () => dispatch(getDashboardCarbonDebitAction()),
    [dispatch]
  );

  const dashboardCarbonDebits = useAppSelector(
    (state) => state.dashboard.carbonDebit
  );

  const isDashboardCarbonDebitsLoading = useAppSelector(
    (state) => state.dashboard.carbonDebitLoading
  );

  const hasDashboardCarbonDebitsError = useAppSelector(
    (state) => state.dashboard.carbonDebitError
  );

  const getNodeProviders = useCallback(
    () => dispatch(getNodeProvidersAction()),
    [dispatch]
  );

  const nodeProviders = useAppSelector(
    (state) => state.dashboard.nodeProviders
  );

  const isNodeProvidersLoading = useAppSelector(
    (state) => state.dashboard.nodeProvidersLoading
  );

  const hasNodeProvidersError = useAppSelector(
    (state) => state.dashboard.nodeProvidersError
  );

  const dataLayout = useAppSelector((state) => state.dashboard.dataLayout);

  const setDataLayout = useCallback(
    (dataLayout: DataLayoutType) => dispatch(setDataLayoutAction(dataLayout)),
    [dispatch]
  );

  return {
    actions: {
      getHeadlineFigures,
      getLocationsLeaderboard,
      getNodesCounters,
      getGlobePoints,
      getDashboardCarbonDebits,
      getNodeProviders,
      setDataLayout
    },
    headlineFigures,
    isHeadlineFiguresLoading,
    hasHeadlineFiguresError,
    locationsLeaderboard,
    isLocationsLeaderboardLoading,
    hasLocationsLeaderboardError,
    nodesCounters,
    isNodesCountersLoading,
    hasNodesCountersError,
    globePoints,
    isGlobePointsLoading,
    hasGlobePointsError,
    dashboardCarbonDebits,
    isDashboardCarbonDebitsLoading,
    hasDashboardCarbonDebitsError,
    nodeProviders,
    isNodeProvidersLoading,
    hasNodeProvidersError,
    dataLayout
  };
};

export default useDashboard;
