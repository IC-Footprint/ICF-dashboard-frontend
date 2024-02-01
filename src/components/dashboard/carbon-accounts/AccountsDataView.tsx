import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { DataView } from 'primereact/dataview';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';
import { css } from '@emotion/css';
import { Column } from 'primereact/column';

import type { FC } from 'react';
import type { DataTableSelectionSingleChangeEvent } from 'primereact/datatable';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import TrendValue from '@/components/dashboard/TrendValue';
import useDashboard from '@/helpers/state/useDashboard';
import { defaultPaginatorOptions } from '@/models/paginator-options-model';
import { appRoutes } from '@/router/app-routes';
import Spinner1 from '@/theme/assets/icons/spinner-1';
import { gridCardBackground } from '@/theme/colors';
import {
  FlexRowContainer,
  PaginatorStyle,
  StyledTable
} from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

export type AccountDataType = 'nodes' | 'nodeProviders';

export interface AccountsDataViewProps {
  list: CarbonAccountModel[] | null;
  isLoading?: boolean;
  parentRoute?: string;
  dataType?: AccountDataType;
}

const AccountCard = styled(Card)`
  background-color: ${gridCardBackground};

  .p-card-content {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    padding: 0.5rem;
  }
`;

const InformationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;
  flex: 1 1 0;

  h4 {
    font-size: 0.75rem;
    color: var(--text-color-secondary);
    font-weight: normal;
  }

  p {
    font-weight: bold;
  }
`;

const OperatorIcon = styled.img`
  flex-grow: 1;
  max-height: 2rem;
  max-width: 4rem;
`;

const AccountsDataView: FC<AccountsDataViewProps> = ({
  list,
  isLoading,
  parentRoute,
  dataType
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dataLayout } = useDashboard();
  const paginatorOptions = useMemo(() => {
    return defaultPaginatorOptions();
  }, []);

  const gridItem = (account: CarbonAccountModel) => {
    return (
      <div className="col-12 md:col-6 lg:col-4 xl:col-3 p-2" key={account.id}>
        <AccountCard>
          <FlexRowContainer className="justify-content-between">
            <div className="flex-grow-1">
              {/* TODO: change alt*/}
              <OperatorIcon
                src={account.operator.icon}
                alt={account.id.substring(0, 10)}
              />
            </div>
            <InformationItemContainer>
              <h4>{t('dashboard.carbonAccounts.nodeProvider')}</h4>
              <p
                title={account.operator.name}
                className="font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis"
              >
                {account.operator.name}
              </p>
            </InformationItemContainer>
          </FlexRowContainer>
          <InformationItemContainer>
            <h4>{t('dashboard.carbonAccounts.carbonDebits')}</h4>
            <p>
              <span className="text-xl font-bold">
                {NumberUtils.formatNumber(account.carbonDebits)}
              </span>
              <span className="font-normal">
                {t('common.unit.co2Kg', {
                  value: ''
                })}
              </span>
            </p>
          </InformationItemContainer>
          <FlexRowContainer>
            <InformationItemContainer>
              <h4>
                {t('common.unit.kgPerDay', {
                  value: ''
                })}
              </h4>
              <TrendValue
                differenceValue={account.lastDayCarbonDifference}
                size="small"
                iconAlignment={'right'}
              />
            </InformationItemContainer>
            <InformationItemContainer>
              <h4>{t('common.status')}</h4>
              <p className="flex align-items-center gap-1">
                {t(`common.nodeStatus.${account.status.toLowerCase()}`)}
                {account.status === 'UP' ? <Spinner1 width="1rem" /> : null}
              </p>
            </InformationItemContainer>
            <div className="flex flex-1 justify-content-end">
              <Link to={`${appRoutes.nodeProviders.root}/${account.id}`}>
                <Button
                  label={t('common.seeMore') ?? ''}
                  severity="secondary"
                  size="small"
                />
              </Link>
            </div>
          </FlexRowContainer>
        </AccountCard>
      </div>
    );
  };

  const itemTemplate = (account: CarbonAccountModel) => {
    if (!account) {
      return;
    }
    return gridItem(account);
  };

  const identificationColumn = useMemo(() => {
    const field = dataType === 'nodes' ? 'id' : 'operator.name';
    const header =
      dataType === 'nodes'
        ? t('table.headers.id')
        : t('table.headers.nodeProvider');

    return <Column field={field} header={header}></Column>;
  }, [dataType, t]);

  return (
    <>
      {dataLayout === 'grid' ? (
        <DataView
          value={list ?? []}
          itemTemplate={itemTemplate}
          paginator
          rows={8}
          paginatorTemplate={paginatorOptions.paginatorTemplate}
          paginatorClassName={css(PaginatorStyle)}
          loading={isLoading}
        />
      ) : (
        <StyledTable
          value={list ?? []}
          paginator
          rows={paginatorOptions.rows}
          rowsPerPageOptions={paginatorOptions.rowsPerPage}
          dataKey="id"
          paginatorClassName={css(PaginatorStyle)}
          paginatorTemplate={paginatorOptions.paginatorTemplate}
          currentPageReportTemplate={t('table.pageReport').toString()}
          loading={isLoading}
          responsiveLayout="scroll"
          selectionMode="single"
          onSelectionChange={(
            e: DataTableSelectionSingleChangeEvent<CarbonAccountModel[]>
          ) => {
            navigate(`${parentRoute}/${e.value.id}`);
          }}
        >
          {identificationColumn}
          <Column
            field="carbonDebits"
            header={`${t('table.headers.carbonDebits')} (${t(
              'common.unit.co2Kg',
              {
                value: ''
              }
            ).trim()})`}
            body={(rowData: CarbonAccountModel) =>
              NumberUtils.formatNumber(rowData.carbonDebits)
            }
          ></Column>
          {dataType === 'nodes' ? (
            <Column
              field="operator.name"
              header={t('table.headers.nodeProvider')}
            ></Column>
          ) : null}
          <Column
            field="status"
            header={t('table.headers.status')}
            body={(rowData: CarbonAccountModel) =>
              t(`common.nodeStatus.${rowData.status.toLowerCase()}`)
            }
          ></Column>
          <Column
            field="confidence"
            header={t('table.headers.confidence')}
          ></Column>
          <Column
            field="location"
            header={t('table.headers.location')}
          ></Column>
        </StyledTable>
      )}
    </>
  );
};

export default AccountsDataView;
