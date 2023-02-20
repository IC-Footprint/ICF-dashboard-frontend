import { css } from '@emotion/css';
import { Column } from 'primereact/column';
import { Tag } from 'primereact/tag';
import { Tooltip } from 'primereact/tooltip';
import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { ColumnBodyOptions } from 'primereact/column';
import type { FC } from 'react';
import type { NodeModel } from '@/models/nodes/node-model';

import { defaultPaginatorOptions } from '@/models/paginator-options-model';
import { nodeStatusSeverityMap } from '@/models/nodes/node-status';
import GridTechnologies from '@/components/nodes/GridTechnologies';
import {
  PaginatorStyle,
  StyledProgressBar,
  FlexColumnCard,
  StyledTable
} from '@/theme/styled-components';
import useNodes from '@/helpers/state/useNodes';

const NodesLeaderboard: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getNodesLeaderboard },
    nodesLeaderboard,
    isNodesLeaderboardLoading
  } = useNodes();
  const paginatorOptions = useMemo(() => {
    return defaultPaginatorOptions();
  }, []);

  useEffect(() => {
    if (!nodesLeaderboard) {
      getNodesLeaderboard();
    }
  }, [nodesLeaderboard, getNodesLeaderboard]);

  const electricityDrawTemplate = (rowData: NodeModel) => {
    return t('common.unit.wattHour', { value: rowData.electricityDraw });
  };

  const carbonIntensityTemplate = (rowData: NodeModel) => {
    const tooltipId = `p-tooltip-${rowData.id}`;
    const carbonIntensityPercentage: number = Math.round(
      rowData.carbonIntensity * 100
    );
    return (
      <>
        <Tooltip
          target={`#${tooltipId}`}
          position="top"
          content={`${carbonIntensityPercentage}%`}
        />
        <StyledProgressBar
          id={tooltipId}
          value={carbonIntensityPercentage}
          displayValueTemplate={() => null}
        />
      </>
    );
  };

  const emissionsTemplate = (rowData: NodeModel) => {
    return t('common.unit.co2Tonnes', {
      value: rowData.emissions.toFixed(1)
    });
  };

  // TODO: add grid technology
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const gridTechnologyTemplate = (rowData: NodeModel) => {
    return (
      <GridTechnologies
        id={rowData.id}
        technologies={rowData.gridTechnology}
        maximumVisibleTechnologies={2}
      />
    );
  };

  const statusTemplate = (rowData: NodeModel) => {
    return (
      <Tag
        value={t(`common.nodeStatus.${rowData.status.toLowerCase()}`)}
        severity={nodeStatusSeverityMap[rowData.status]}
      />
    );
  };

  const textColumnTemplate = (
    rowData: NodeModel,
    options: ColumnBodyOptions
  ) => {
    const textField: string = rowData[
      options.field as keyof NodeModel
    ] as string;
    return <span title={textField}>{textField}</span>;
  };

  return (
    <FlexColumnCard>
      <span>{t('common.leaderboard')}</span>
      <StyledTable
        value={nodesLeaderboard ?? []}
        paginator
        rows={paginatorOptions.rows}
        rowsPerPageOptions={paginatorOptions.rowsPerPage}
        dataKey="id"
        paginatorClassName={css(PaginatorStyle)}
        paginatorTemplate={paginatorOptions.paginatorTemplate}
        currentPageReportTemplate={t('table.pageReport').toString()}
        loading={isNodesLeaderboardLoading}
        responsiveLayout="scroll"
      >
        <Column
          field="id"
          header={t('table.headers.id')}
          body={textColumnTemplate}
        ></Column>
        <Column
          field="nodeProvider"
          header={t('table.headers.nodeProvider')}
          body={textColumnTemplate}
        ></Column>
        <Column
          field="electricityDraw"
          header={t('table.headers.electricityDraw')}
          body={electricityDrawTemplate}
        ></Column>
        <Column
          field="carbonIntensity"
          header={t('table.headers.carbonIntensity')}
          body={carbonIntensityTemplate}
        ></Column>
        <Column
          field="emissions"
          header={t('table.headers.emissions')}
          body={emissionsTemplate}
        ></Column>
        <Column
          field="location"
          header={t('table.headers.location')}
          body={textColumnTemplate}
        ></Column>
        <Column
          field="status"
          header={t('table.headers.status')}
          body={statusTemplate}
        ></Column>
      </StyledTable>
    </FlexColumnCard>
  );
};

export default NodesLeaderboard;
