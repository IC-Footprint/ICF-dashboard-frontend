import type { FC } from 'react';

import World from '@/components/dashboard/World';
import HeadlineFigures from '@/components/dashboard/HeadlineFigures';
import LocationsLeaderboard from '@/components/dashboard/LocationsLeaderboard';
import NodesCounters from '@/components/dashboard/NodesCounters';
import {
  DashboardContentContainer,
  DashboardTablesSectionContainer
} from '@/theme/styled-components';

const Dashboard: FC = () => {
  return (
    <>
      <HeadlineFigures />
      <DashboardContentContainer>
        <World />
        <DashboardTablesSectionContainer>
          <LocationsLeaderboard />
          <NodesCounters />
        </DashboardTablesSectionContainer>
      </DashboardContentContainer>
    </>
  );
};

export default Dashboard;
