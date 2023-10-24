import { css } from '@emotion/css';
import { Column } from 'primereact/column';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { ChartDataApiObject } from '@/api/carbon-rankings-api';

import {
  PaginatorStyle,
  FlexColumnCard,
  StyledTable
} from '@/theme/styled-components';
import CarbonRankingsApi from '@/api/carbon-rankings-api';

const CryptoStats: FC = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<ChartDataApiObject[]>([]);

  const client = useMemo(() => {
    return new CarbonRankingsApi();
  }, []);

  useEffect(() => {
    client.getChartData().then(setChartData).catch(console.log);
  }, [client, setChartData]);

  const powerTemplate = (rowData: ChartDataApiObject) => {
    return t('common.unit.GW', {
      value: rowData.power.toFixed(3)
    });
  };

  const consumptionTemplate = (rowData: ChartDataApiObject) => {
    return t('common.unit.TWh', {
      value: rowData.power.toFixed(3)
    });
  };

  const emissionsTemplate = (rowData: ChartDataApiObject) => {
    return t('common.unit.Mt', {
      value: rowData.power.toFixed(3)
    });
  };

  const currencyTemplate = (rowData: ChartDataApiObject) => {
    return `$ ${rowData.marketcap.toLocaleString()}`;
  };

  return (
    <FlexColumnCard>
      <span>{t('crypto.stats')}</span>
      <StyledTable
        value={chartData ?? []}
        dataKey="id"
        paginatorClassName={css(PaginatorStyle)}
        responsiveLayout="scroll"
        selectionMode="single"
      >
        <Column field="ticker" header={t('table.headers.id')} />
        <Column
          field="marketcap"
          header={t('table.headers.marketCap')}
          body={currencyTemplate}
        />
        <Column
          field="power"
          header={t('table.headers.electricalPower')}
          body={powerTemplate}
        />
        <Column
          field="consumption"
          header={t('table.headers.consumption')}
          body={consumptionTemplate}
        />
        <Column
          field="emission"
          header={t('table.headers.emission')}
          body={emissionsTemplate}
        />
      </StyledTable>
    </FlexColumnCard>
  );
};

export default CryptoStats;
