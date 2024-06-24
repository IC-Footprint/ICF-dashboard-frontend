import { t } from 'i18next';
import { Button } from 'primereact/button';
import { Link } from 'react-router-dom';

import { useEffect, useState } from 'react';

import { Principal } from '@dfinity/principal';

import TrendValue from '../TrendValue';

import {
  AccountCard,
  InformationItemContainer,
  OperatorIcon
} from './StyledComponents';

import type { AccountDataType } from './AccountsDataView';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import { FlexRowContainer } from '@/theme/styled-components';
// import { NumberUtils } from '@/utils/number-utils';

import NodeStatus from '@/components/nodes/NodeStatus';

import { getSNSEmissions, getSNSMetadata } from '@/api/sns-api';

interface GridItemProps {
  account: CarbonAccountModel;
  dataType?: AccountDataType;
  parentRoute?: string;
}
const GridItem: React.FC<GridItemProps> = ({
  account,
  dataType,
  parentRoute
}) => {
  const [snsName, setSnsName] = useState<string>();
  const [snsIcon, setSnsIcon] = useState<string>();
  const [snsEmissions, setsnsEmissions] = useState<number>();

  useEffect(() => {
    if (account.type === 'sns') {
      getSNSMetadata(Principal.fromText(account.id)).then((value) => {
        if ('Ok' in value) {
          const icon = value.Ok.logo.length > 0 ? value.Ok.logo[0] : undefined;
          const name = value.Ok.name.length > 0 ? value.Ok.name[0] : undefined;
          setSnsIcon(icon);
          setSnsName(name);
        }
      });

      getSNSEmissions(Principal.fromText(account.id)).then((value) => {
        console.log('value is', value);
        setsnsEmissions(value);
      });
    }
  }, [account]);

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
              src={snsIcon ?? account.icon}
              alt={identificationField}
            />
          </div>
          <InformationItemContainer className="flex-1">
            <h4>{header}</h4>
            <p
              title={snsName ?? identificationField}
              className="font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis"
            >
              {snsName ?? identificationField}
            </p>
          </InformationItemContainer>
        </FlexRowContainer>
        <InformationItemContainer>
          <h4>{t('dashboard.carbonAccounts.carbonDebits')}</h4>
          <p>
            <span className="text-xl font-bold">
              {Number(snsEmissions) ?? account.carbonDebit}
              {/* {NumberUtils.formatNumber(snsEmissions ?? account.carbonDebit)} */}
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

export default GridItem;
