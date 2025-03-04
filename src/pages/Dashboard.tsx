import { useEffect, useMemo } from 'react';

import type { FC } from 'react';

import CarbonAccounts from '@/components/dashboard/carbon-accounts/CarbonAccounts';
import DashboardInformationCarousel from '@/components/dashboard/DashboardInformationCarousel';
import DashboardOutstandingCarbonDebit from '@/components/dashboard/DashboardOutstandingCarbonDebit';
import useDashboard from '@/helpers/state/useDashboard';
import useIntervalIncrement from '@/helpers/useIntervalIncrement';

const Dashboard: FC = () => {
  const {
    actions: { getHeadlineFigures, resetHeadlineFigures },
    headlineFigures
  } = useDashboard();

  useEffect(() => {
    getHeadlineFigures();

    const minutesInterval: number = +import.meta.env
      .VITE_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL;
    const intervalId = setInterval(() => {
      getHeadlineFigures();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
      resetHeadlineFigures();
    };
  }, [getHeadlineFigures, resetHeadlineFigures]);

  const cumulativeNetworkEmissions = useIntervalIncrement(
    headlineFigures?.cumulativeNetworkEmissions,
    headlineFigures?.cumulativeNetworkEmissionsRate
  );

  const weeklyPercentageDifference = useMemo(() => {
    return (
      (headlineFigures?.weeklyEmissions ?? 0) /
      (headlineFigures?.cumulativeNetworkEmissions ?? 1)
    );
  }, [headlineFigures]);

  return (
    <div className="grid m-5">
      <div className="col-12 lg:col-7">
        <DashboardOutstandingCarbonDebit
          carbonDebit={cumulativeNetworkEmissions}
          weekDifferencePercentage={weeklyPercentageDifference}
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

export default Dashboard;
