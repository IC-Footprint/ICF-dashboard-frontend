import type { FC } from 'react';

import HeadlineFigures from '@/components/dashboard/HeadlineFigures';
import LocationsLeaderboard from '@/components/dashboard/LocationsLeaderboard';
import {
  DashboardContentContainer,
  DashboardTablesSectionContainer,
  FlexColumnCard,
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
          <FlexColumnCard>
            <span>Data centers</span>
          </FlexColumnCard>
        </DashboardTablesSectionContainer>
      </DashboardContentContainer>
    </>
  );
};

export default Dashboard;
