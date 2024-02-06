import { css } from '@emotion/css';
import { Column } from 'primereact/column';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';

import { StyledTable, PaginatorStyle } from '@/theme/styled-components';
import { defaultPaginatorOptions } from '@/models/paginator-options-model';

interface CanisterAttributionsTableProps {
  list: CanisterAttributionModel[];
  isLoading?: boolean;
}

const CanisterAttributionsTable: FC<CanisterAttributionsTableProps> = ({
  list,
  isLoading
}) => {
  const { t } = useTranslation();
  const paginatorOptions = useMemo(() => {
    return defaultPaginatorOptions();
  }, []);

  return (
    <StyledTable
      value={list}
      paginator
      rows={paginatorOptions.rows}
      rowsPerPageOptions={paginatorOptions.rowsPerPage}
      dataKey="id"
      paginatorClassName={css(PaginatorStyle)}
      paginatorTemplate={paginatorOptions.paginatorTemplate}
      currentPageReportTemplate={t('table.pageReport').toString()}
      loading={isLoading}
      responsiveLayout="scroll"
    >
      <Column
        field="registry"
        header={t('table.headers.registry')}
        body={(rowData: CanisterAttributionModel) => (
          <a
            href={rowData.registry}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {rowData.registry}
          </a>
        )}
      ></Column>
      <Column
        field="status"
        header={t('table.headers.status')}
        body={(rowData: CanisterAttributionModel) =>
          t(`common.canisterAttributionStatus.${rowData.status}`)
        }
      ></Column>
      <Column field="type" header={t('table.headers.type')}></Column>
      <Column
        field="timestamp"
        header={t('table.headers.timestamp')}
        body={(rowData: CanisterAttributionModel) => {
          return new Date(rowData.timestamp).toISOString();
        }}
      ></Column>
      <Column
        field="transactionHash"
        header={t('table.headers.transactionHash')}
        body={(rowData: CanisterAttributionModel) => {
          return (
            <span title={rowData.transactionHash}>
              {rowData.transactionHash}
            </span>
          );
        }}
      ></Column>
      <Column
        field="confidence"
        header={t('table.headers.confidence')}
      ></Column>
    </StyledTable>
  );
};

export default CanisterAttributionsTable;
