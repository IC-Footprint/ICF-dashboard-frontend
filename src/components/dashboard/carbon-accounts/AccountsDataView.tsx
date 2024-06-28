import { css } from '@emotion/css';
import { Column } from 'primereact/column';
import { DataView } from 'primereact/dataview';

import { useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import { PlusIcon } from '@heroicons/react/24/outline';

import Modal from 'styled-react-modal';

import { AddNewItemCard, AddNewItemIcon } from './StyledComponents';

import GridItem from './GridItem';

import { ModalForm } from './ModalForm';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { DataTableSelectionSingleChangeEvent } from 'primereact/datatable';
import type { FC } from 'react';

import useDashboard from '@/helpers/state/useDashboard';
import { defaultPaginatorOptions } from '@/models/paginator-options-model';
import { PaginatorStyle, StyledTable } from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

export type AccountDataType = 'nodes' | 'nodeProviders' | 'projects' | 'sns';
interface AddNewItem {
  __typename: 'AddNewItem';
  title: string;
  organizationType?: AccountDataType;
}

export interface AccountsDataViewProps {
  list: [AddNewItem, ...CarbonAccountModel[]] | CarbonAccountModel[] | null;
  isLoading?: boolean;
  parentRoute?: string;
  dataType?: AccountDataType;
  setSNSList?: React.Dispatch<React.SetStateAction<CarbonAccountModel[]>>;
}

const AddNewItemComponent = ({ account }: { account: AddNewItem }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="col-12 md:col-6 lg:col-4 xl:col-3 p-2"
      key={account.__typename}
    >
      <AddNewItemCard onClick={() => setIsOpen((prev) => !prev)}>
        <AddNewItemIcon>
          <PlusIcon />
        </AddNewItemIcon>
        <p>{account.title}</p>
      </AddNewItemCard>
      <Modal
        isOpen={isOpen}
        onBackgroundClick={() => setIsOpen((prev) => !prev)}
        onEscapeKeydown={() => setIsOpen((prev) => !prev)}
      >
        <ModalForm
          onClose={() => setIsOpen(false)}
          organizationType={account.organizationType}
        />
      </Modal>
    </div>
  );
};

const AccountsDataView: FC<AccountsDataViewProps> = ({
  list,
  isLoading,
  parentRoute,
  dataType,
  setSNSList,
}) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { dataLayout } = useDashboard();
  const paginatorOptions = useMemo(() => {
    return defaultPaginatorOptions();
  }, []);

  const itemTemplate = (
    account: CarbonAccountModel | AddNewItem,
    _layout: 'list' | 'grid' | (string & Record<string, unknown>)
  ) => {
    if (!account) {
      return;
    }
    if ('__typename' in account) {
      return <AddNewItemComponent account={account} />;
    } else {
      return (
        <GridItem
          account={account}
          dataType={dataType}
          parentRoute={parentRoute}
          setSNSList={setSNSList}
        />
      );
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
