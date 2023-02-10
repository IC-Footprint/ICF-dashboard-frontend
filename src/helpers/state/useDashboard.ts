import { useCallback } from 'react';

import { getHeadlineFiguresAction } from '@/state/dashboard/dashboard-slice';
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

  return {
    actions: {
      getHeadlineFigures
    },
    headlineFigures,
    isHeadlineFiguresLoading,
    hasHeadlineFiguresError
  };
};

export default useDashboard;
