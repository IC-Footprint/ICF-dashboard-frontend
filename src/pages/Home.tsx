import { useEffect } from 'react';

import type { FC } from 'react';

import DashboardOutstandingCarbonDebit from '@/components/dashboard/DashboardOutstandingCarbonDebit';
import useDashboard from '@/helpers/state/useDashboard';
import { FlexColumnContainer } from '@/theme/styled-components';

const Home: FC = () => {
  const {
    actions: { getDashboardCarbonDebits },
    dashboardCarbonDebits
  } = useDashboard();

  useEffect(() => {
    getDashboardCarbonDebits();

    const minutesInterval: number =
      +process.env.REACT_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL!;
    const intervalId = setInterval(() => {
      getDashboardCarbonDebits();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [getDashboardCarbonDebits]);

  return (
    <FlexColumnContainer>
      <DashboardOutstandingCarbonDebit
        carbonDebit={dashboardCarbonDebits?.carbonDebit}
        weekDifferencePercentage={
          dashboardCarbonDebits?.weekDifferencePercentage
        }
      />
    </FlexColumnContainer>
  );
};

export default Home;
