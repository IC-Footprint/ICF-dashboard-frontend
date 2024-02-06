import { css } from '@emotion/css';
import { Column } from 'primereact/column';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type { CanisterAttributionViewModel } from '@/models/nodes/canister-attribution-model';

import { StyledTable, PaginatorStyle } from '@/theme/styled-components';
import { defaultPaginatorOptions } from '@/models/paginator-options-model';

interface CanisterAttributionsTableProps {
  list: CanisterAttributionViewModel[];
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
        body={(rowData: CanisterAttributionViewModel) => (
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
        body={(rowData: CanisterAttributionViewModel) =>
          t(`common.canisterAttributionStatus.${rowData.status}`)
        }
      ></Column>
      <Column field="type" header={t('table.headers.type')}></Column>
      <Column
        field="timestamp"
        header={t('table.headers.timestamp')}
        body={(rowData: CanisterAttributionViewModel) => {
          return rowData.creationDate.toISOString();
        }}
      ></Column>
      <Column
        field="transactionHash"
        header={t('table.headers.transactionHash')}
        body={(rowData: CanisterAttributionViewModel) => {
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
