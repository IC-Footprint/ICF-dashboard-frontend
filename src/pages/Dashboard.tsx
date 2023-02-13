import type { FC } from 'react';

import HeadlineFigures from '@/components/dashboard/HeadlineFigures';
import LocationsLeaderboard from '@/components/dashboard/LocationsLeaderboard';
import NodesCounters from '@/components/dashboard/NodesCounters';
import {
  DashboardContentContainer,
  DashboardTablesSectionContainer,
  GlobeContainer
} from '@/theme/styled-components';

const Dashboard: FC = () => {
  return (
    <>
      <HeadlineFigures />
      <DashboardContentContainer>
        <GlobeContainer>Globe container</GlobeContainer>
        <DashboardTablesSectionContainer>
          <LocationsLeaderboard />
          <NodesCounters />
        </DashboardTablesSectionContainer>
      </DashboardContentContainer>
    </>
  );
};

export default Dashboard;
