import { addDays, addMinutes, addMonths, addYears } from 'date-fns';
import { useMemo, useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';

import type { DatasetFilterModel } from '@/models/dataset-filter-model';
import type { RangeType } from '@/models/range-type';
import type { ChartData } from 'chart.js';
import type { FC } from 'react';

import ChartCard from '@/components/nodes/ChartCard';
import IcApi from '@/api/ic-api';

interface NodePowerConsumptionProps {
  nodeId: string;
}

const NodePowerConsumption: FC<NodePowerConsumptionProps> = ({ nodeId }) => {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const [nodeEmissionsData, setNodeEmissionsData] = useState<ChartData | null>(
    null
  );

  const currentTimestamp = useMemo(() => {
    return new Date();
  }, []);

  const icClient = useMemo(() => {
    return new IcApi();
  }, []);

  const getEndDate = useCallback(
    (range: RangeType) => {
      switch (range) {
        case 'FIVE_YEARS':
          return addYears(currentTimestamp, -5);
        case 'ONE_YEAR':
          return addYears(currentTimestamp, -1);
        case 'THREE_MONTHS':
          return addMonths(currentTimestamp, -3);
        case 'ONE_MONTH':
          return addMonths(currentTimestamp, -1);
        case 'SEVEN_DAYS':
          return addDays(currentTimestamp, -7);
        case 'ONE_DAY':
          return addDays(currentTimestamp, -1);
        case 'HALF_AN_HOUR':
          return addMinutes(currentTimestamp, -30);
      }
    },
    [currentTimestamp]
  );

  const getGranularity = useCallback((range: RangeType) => {
    switch (range) {
      case 'SEVEN_DAYS':
        return 60 * 60;
      case 'ONE_MONTH':
        return 60 * 60 * 24;
    }

    return 250000;
  }, []);

  const getNodeEnergyConsumption = useCallback(
    (filter?: DatasetFilterModel) => {
      if (!icClient) return;

      setLoading(true);

      const range = filter?.range ?? 'ONE_DAY';
      icClient
        .getNodeEnergyConsumptionRate(
          nodeId,
          getEndDate(range).getTime() / 1000,
          currentTimestamp.getTime() / 1000,
          getGranularity(range)
        )
        .then((readings) => {
          const chartData: ChartData = {
            datasets: [
              {
                data: readings.energy_consumption_rate.map(
                  ([timestamp, reading]) => {
                    return { x: parseInt(timestamp), y: parseFloat(reading) };
                  }
                )
              }
            ],
            labels: readings.energy_consumption_rate.map(([timestamp]) =>
              new Date(parseInt(timestamp) * 1000).toLocaleDateString()
            )
          };

          setNodeEmissionsData(structuredClone(chartData));
        })
        .finally(() => setLoading(false));
    },
    [icClient, nodeId, currentTimestamp, getEndDate, getGranularity]
  );

  return (
    <ChartCard
      label={t('nodes.nodeElectricityDraw')}
      data={nodeEmissionsData}
      idFilter={nodeId}
      isLoading={loading}
      getDataAction={getNodeEnergyConsumption}
    />
  );
};

export default NodePowerConsumption;
