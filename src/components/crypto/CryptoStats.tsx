import { css } from '@emotion/css';
import { Column } from 'primereact/column';
import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type {
  ChartDataApiObject,
  CryptodetailsApiObject
} from '@/api/carbon-rankings-api';

import {
  PaginatorStyle,
  FlexColumnCard,
  StyledTable
} from '@/theme/styled-components';
import CarbonRankingsApi from '@/api/carbon-rankings-api';

const CryptoStats: FC = () => {
  const { t } = useTranslation();
  const [chartData, setChartData] = useState<ChartDataApiObject[]>([]);
  const [currencyDetails, setCurrencyDetails] = useState<
    CryptodetailsApiObject[]
  >([]);

  const client = useMemo(() => {
    return new CarbonRankingsApi();
  }, []);

  useEffect(() => {
    client.getChartData().then(setChartData).catch(console.log);
  }, [client, setChartData]);

  useEffect(() => {
    client.getCryptoDetails().then(setCurrencyDetails).catch(console.log);
  }, [client, setCurrencyDetails]);

  const powerTemplate = (rowData: ChartDataApiObject) => {
    const info = currencyDetails.find(
      (detail) => detail.ticker === rowData.ticker
    );

    return `${rowData.power.toFixed(3)} ${info?.outputs.power}`;
  };

  const consumptionTemplate = (rowData: ChartDataApiObject) => {
    const info = currencyDetails.find(
      (detail) => detail.ticker === rowData.ticker
    );

    return `${rowData.consumption.toFixed(3)} ${info?.outputs.electricity}`;
  };

  const emissionsTemplate = (rowData: ChartDataApiObject) => {
    const info = currencyDetails.find(
      (detail) => detail.ticker === rowData.ticker
    );

    return `${rowData.emission.toFixed(3)} ${info?.outputs.emissions}`;
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
