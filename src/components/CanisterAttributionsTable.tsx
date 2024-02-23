import { css } from '@emotion/css';
import { Column } from 'primereact/column';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { CanisterAttributionModel } from '@/models/nodes/canister-attribution-model';
import type { FC } from 'react';

import { defaultPaginatorOptions } from '@/models/paginator-options-model';
import { StyledTable, PaginatorStyle } from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

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
        field="payer"
        header={t('table.headers.walletId')}
        body={(rowData: CanisterAttributionModel) => {
          return <span title={rowData.payer}>{rowData.payer}</span>;
        }}
      ></Column>
      <Column
        field="type"
        header={t('table.headers.type')}
        body={(rowData: CanisterAttributionModel) => {
          return t(`common.canisterAttributionType.${rowData.type}`);
        }}
      ></Column>
      <Column
        field="total"
        header={t('table.headers.price')}
        body={(rowData: CanisterAttributionModel) => {
          return NumberUtils.formatNumber(rowData.total, 9);
        }}
      ></Column>
      <Column
        field="cawaUrl"
        header={t('table.headers.link')}
        body={(rowData: CanisterAttributionModel) => (
          <a
            href={rowData.cawaUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary"
          >
            {t('common.cawa')}
          </a>
        )}
      ></Column>
    </StyledTable>
  );
};

export default CanisterAttributionsTable;
