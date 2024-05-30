import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Column } from 'primereact/column';
import { DataView } from 'primereact/dataview';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link, useNavigate } from 'react-router-dom';

import type { FC } from 'react';
import type { DataTableSelectionSingleChangeEvent } from 'primereact/datatable';
import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import { NumberUtils } from '@/utils/number-utils';
import {
  FlexRowContainer,
  LabelStyle,
  PaginatorStyle,
  StyledTable
} from '@/theme/styled-components';
import { gridCardBackground } from '@/theme/colors';
import { defaultPaginatorOptions } from '@/models/paginator-options-model';
import useDashboard from '@/helpers/state/useDashboard';
import NodeStatus from '@/components/nodes/NodeStatus';
import TrendValue from '@/components/dashboard/TrendValue';
import { PlusIcon } from '@heroicons/react/24/outline';

export type AccountDataType = 'nodes' | 'nodeProviders' | 'projects';
interface AddNewItem {
  __typename: 'AddNewItem',
  title: string;
}

export interface AccountsDataViewProps {
  list: [AddNewItem, ...CarbonAccountModel[]] | CarbonAccountModel[] | null;
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

const AddNewItemCard = styled(Card)`
background-color: rgb(255 255 255 / 0.04);
height: 100%;
border: 2px dotted rgb(255 255 255 / 0.2);
color: #86e7d4;
font-weight: bold;

.p-card-body {
  height: 100%;
}

.p-card-content {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  height: 100%;
}

`;

const AddNewItemIcon = styled.div`
height: 32px;
width: 32px;
border-radius: 8px;
border: 1px solid #86e7d4;

`;

export const InformationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  h4 {
    ${LabelStyle};
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
    const header =
      dataType === 'nodes' ? t('table.headers.id') : t('table.headers.name');
    const identificationField =
      dataType === 'nodes' ? account.id : account.operator?.name;

    return (
      <div className="col-12 md:col-6 lg:col-4 xl:col-3 p-2" key={account.id}>
        <AccountCard>
          <FlexRowContainer className="justify-content-between">
            <div className="flex-grow-1">
              <OperatorIcon
                src={account.operator?.icon}
                alt={identificationField}
              />
            </div>
            <InformationItemContainer className="flex-1">
              <h4>{header}</h4>
              <p
                title={identificationField}
                className="font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis"
              >
                {identificationField}
              </p>
            </InformationItemContainer>
          </FlexRowContainer>
          <InformationItemContainer>
            <h4>{t('dashboard.carbonAccounts.carbonDebits')}</h4>
            <p>
              <span className="text-xl font-bold">
                {NumberUtils.formatNumber(account.carbonDebit)}
              </span>
              <span className="font-normal">
                {t('common.unit.co2Kg', {
                  value: ''
                })}
              </span>
            </p>
          </InformationItemContainer>
          <FlexRowContainer>
            <InformationItemContainer className="min-w-min">
              <h4>
                {t('common.unit.kgPerWeek', {
                  value: ''
                })}
              </h4>
              <TrendValue
                differenceValue={account.weeklyEmissions}
                size="small"
                iconAlignment={'right'}
              />
            </InformationItemContainer>
            <InformationItemContainer className="ml-2">
              <h4>{t('common.status')}</h4>
              <NodeStatus status={account.status} />
            </InformationItemContainer>
            <div className="flex flex-1 justify-content-end">
              <Link to={`${parentRoute}/${account.id}`}>
                <Button
                  label={t('common.seeMore') ?? ''}
                  severity="secondary"
                  size="small"
                  className="white-space-nowrap"
                />
              </Link>
            </div>
          </FlexRowContainer>
        </AccountCard>
      </div>
    );
  };

  const itemTemplate = (account: CarbonAccountModel | AddNewItem, _layout: 'list' | 'grid' | (string & Record<string, unknown>)) => {
    if (!account) {
      return;
    }
    if ('__typename' in account) {
      return (
        <div className="col-12 md:col-6 lg:col-4 xl:col-3 p-2" key={account.__typename}>
          <AddNewItemCard>
            <AddNewItemIcon>
              <PlusIcon />
            </AddNewItemIcon>
            <p>{account.title}</p>
          </AddNewItemCard>
        </div>
      );
    } else {
      return gridItem(account);
    }

  };

  const identificationColumn = useMemo(() => {
    const field = dataType === 'nodes' ? 'id' : 'operator.name';
    const header =
      dataType === 'nodes' ? t('table.headers.id') : t('table.headers.name');

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
              NumberUtils.formatNumber(rowData.carbonDebit)
            }
          ></Column>
          <Column
            field="weeklyEmissions"
            header={t('common.unit.kgPerWeek', {
              value: ''
            })}
            body={(rowData: CarbonAccountModel) =>
              NumberUtils.formatNumber(rowData.weeklyEmissions)
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
              rowData.status
                ? t(`common.nodeStatus.${rowData.status?.toLowerCase()}`)
                : '-'
            }
          ></Column>
          {dataType === 'nodes' ? (
            <Column
              field="confidence"
              header={t('table.headers.confidence')}
            ></Column>
          ) : null}
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

{/* <AddNewItemButton
itemType={
  dataType as 'dao' | 'dapp' | 'nodeProvider' | 'node' | 'individual'
}
onClick={() => {
  // Handle the onClick event for adding a new item
}}
/> */}
