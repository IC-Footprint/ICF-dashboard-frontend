import { useEffect } from 'react';

import type { FC } from 'react';

import CarbonAccounts from '@/components/dashboard/carbon-accounts/CarbonAccounts';
import DashboardInformationCarousel from '@/components/dashboard/DashboardInformationCarousel';
import DashboardOutstandingCarbonDebit from '@/components/dashboard/DashboardOutstandingCarbonDebit';
import useDashboard from '@/helpers/state/useDashboard';

const Home: FC = () => {
  const {
    actions: { getHeadlineFigures },
    headlineFigures
  } = useDashboard();

  useEffect(() => {
    getHeadlineFigures();

    const minutesInterval: number =
      +process.env.REACT_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL!;
    const intervalId = setInterval(() => {
      getHeadlineFigures();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [getHeadlineFigures]);

  return (
    <div className="grid m-5">
      <div className="col-12 lg:col-7">
        <DashboardOutstandingCarbonDebit
          carbonDebit={headlineFigures?.cumulativeNetworkEmissions}
          weekDifferencePercentage={
            headlineFigures?.cumulativeNetworkEmissionsRate
          }
        />
      </div>
      <div className="col-12 lg:col-5">
        <DashboardInformationCarousel />
      </div>
      <div className="col-12">
        <CarbonAccounts />
      </div>
    </div>
  );
};

export default Home;
