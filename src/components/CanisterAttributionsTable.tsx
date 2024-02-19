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
      <Column field="payer" header={t('table.headers.payer')}></Column>
      <Column
        field="ticketCount"
        header={t('table.headers.ticketCount')}
      ></Column>
      <Column
        field="ticketPrice"
        header={t('table.headers.ticketPrice')}
      ></Column>
      <Column field="total" header={t('table.headers.total')}></Column>
    </StyledTable>
  );
};

export default CanisterAttributionsTable;
