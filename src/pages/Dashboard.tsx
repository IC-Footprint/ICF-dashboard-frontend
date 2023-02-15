import { useEffect } from 'react';

import type { FC } from 'react';

import useDashboard from '@/helpers/state/useDashboard';
import World from '@/components/dashboard/World';
import HeadlineFigures from '@/components/dashboard/HeadlineFigures';
import LocationsLeaderboard from '@/components/dashboard/LocationsLeaderboard';
import NodesCounters from '@/components/dashboard/NodesCounters';
import {
  DashboardContentContainer,
  DashboardTablesSectionContainer,
  RelativeContainer
} from '@/theme/styled-components';

const Dashboard: FC = () => {
  const {
    actions: {
      getLocationsLeaderboard,
      getGlobePoints,
      getHeadlineFigures,
      getNodesCounters
    }
  } = useDashboard();
  useEffect(() => {
    const minutesInterval: number =
      +process.env.REACT_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL!;
    const intervalId = setInterval(() => {
      getLocationsLeaderboard();
      getGlobePoints();
      getHeadlineFigures();
      getNodesCounters();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [
    getLocationsLeaderboard,
    getGlobePoints,
    getHeadlineFigures,
    getNodesCounters
  ]);

  return (
    <>
      <HeadlineFigures />
      <RelativeContainer>
        <DashboardContentContainer>
          <World />
          <DashboardTablesSectionContainer>
            <LocationsLeaderboard />
            <NodesCounters />
          </DashboardTablesSectionContainer>
        </DashboardContentContainer>
      </RelativeContainer>
    </>
  );
};

export default Dashboard;
