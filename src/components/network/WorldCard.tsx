import type { FC } from 'react';

import LocationsLeaderboard from '@/components/dashboard/LocationsLeaderboard';
import NodesCounters from '@/components/dashboard/NodesCounters';
import World from '@/components/dashboard/World';
import {
  RelativeContainer,
  DashboardContentContainer,
  DashboardRightPanelContainer,
  TableCardContainer,
  StyledCard
} from '@/theme/styled-components';

const WorldCard: FC = () => {
  return (
    <StyledCard>
      <RelativeContainer className="h-screen lg:h-30rem">
        <DashboardContentContainer>
          <div className="grid gap-3 w-full h-full">
            <div className="col-12 xl:col-7 h-half lg:h-full">
              <World />
            </div>
            <DashboardRightPanelContainer className="col-12 xl:col h-half lg:h-full">
              <TableCardContainer className="flex-grow-1">
                <LocationsLeaderboard />
              </TableCardContainer>
              <TableCardContainer className="mb-3 xl:mb-0 flex-grow-0">
                <NodesCounters />
              </TableCardContainer>
            </DashboardRightPanelContainer>
          </div>
        </DashboardContentContainer>
      </RelativeContainer>
    </StyledCard>
  );
};

export default WorldCard;
