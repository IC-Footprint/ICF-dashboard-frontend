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
import { NumberUtils } from '@/utils/number-utils';

import NodeStatus from '@/components/nodes/NodeStatus';
// import IcLogo from '@/theme/assets/ic-logo.png';

// const icLogo = IcLogo;

import {
  createSNSEmissions,
  getSNSMetadata,
  updateEmissionsInBackground
} from '@/api/sns-api';

const Loading: React.FC = () => (
  <div className="animate-pulse bg-gray-200 h-4 w-20 rounded"></div>
);

interface GridItemProps {
  account: CarbonAccountModel;
  dataType?: AccountDataType;
  parentRoute?: string;
  setSNSList?: React.Dispatch<React.SetStateAction<CarbonAccountModel[]>>;
}
const GridItem: React.FC<GridItemProps> = ({
  account,
  dataType,
  parentRoute,
  setSNSList
}) => {
  const [snsName, setSnsName] = useState<string | undefined>(undefined);
  const [snsIcon, setSnsIcon] = useState<string | undefined>(undefined);
  const [snsEmissions, setsnsEmissions] = useState<number>();
  const [iconLoading, setIconLoading] = useState(false);
  const [nameLoading, setNameLoading] = useState(false);
  const [isEmissionsLoading, setisEmissionsLoading] = useState(false);
  const [initialEmissionSet, setInitialEmissionSet] = useState(false);

  useEffect(() => {
    if (account.type === 'sns') {
      setIconLoading(true);
      setNameLoading(true);
      setisEmissionsLoading(true);

      getSNSMetadata(Principal.fromText(account.id))
        .then((value) => {
          // Handle logo
          const icon =
            Array.isArray(value.logo) && value.logo.length > 0
              ? value.logo[0]
              : undefined;
          setSnsIcon(icon);
          setIconLoading(false);
          console.log('Logo loaded:', icon); // Added console.log

          // Handle name
          const name =
            Array.isArray(value.name) && value.name.length > 0
              ? value.name[0]
              : undefined;
          setSnsName(name);
          setNameLoading(false);
        })
        .catch((error) => {
          console.error('Error fetching SNS metadata:', error);
          setIconLoading(false);
          setNameLoading(false);
        });

      createSNSEmissions(Principal.fromText(account.id)).then((value) => {
        setsnsEmissions(value);
        console.log('Emissions loaded:', value); // Added console.log

        if (value === 0) {
          setSNSList &&
            setSNSList((prev) =>
              prev.map((item) => {
                if (item.id === account.id) {
                  return {
                    ...item,
                    emissions: value,
                    status: 'DOWN'
                  };
                }
                return item;
              })
            );
        }
        setisEmissionsLoading(false);
        setInitialEmissionSet(true);
      });
    } else {
      setIconLoading(false);
      setNameLoading(false);
      setisEmissionsLoading(false);
    }
  }, [account, setSNSList]);

  // update emissions in the background
  useEffect(() => {
    if (account.type === 'sns' && initialEmissionSet) {
      updateEmissionsInBackground(Principal.fromText(account.id));
    }
  }, [account, initialEmissionSet]);

  const isLoading = iconLoading || nameLoading || isEmissionsLoading;
  // const isDown = account.status === 'DOWN';

  const header =
    dataType === 'nodes' ? t('table.headers.id') : t('table.headers.name');
  const identificationField =
    dataType === 'nodes' ? account.id : account.operator?.name;


  return (
    <div className="col-12 md:col-6 lg:col-4 xl:col-3 p-2" key={account.id}>
      <AccountCard>
        <FlexRowContainer className="justify-content-between">
          <div className="flex-grow-1">
            {iconLoading ? (
              <div className="w-12 h-12 bg-gray-200 rounded-full animate-pulse"></div>
            ) : (
              <OperatorIcon
                src={snsIcon ?? account.icon}
                alt={identificationField}
              />
            )}
          </div>
          <InformationItemContainer className="flex-1">
            <h4>{header}</h4>
            {isLoading ? (
              <Loading />
            ) : (
              <p
                title={snsName ?? identificationField}
                className="font-bold white-space-nowrap overflow-hidden text-overflow-ellipsis"
              >
                {snsName ?? identificationField}
              </p>
            )}
          </InformationItemContainer>
        </FlexRowContainer>
        <InformationItemContainer>
          <h4>{t('dashboard.carbonAccounts.carbonDebits')}</h4>
          {isEmissionsLoading ? (
            <Loading />
          ) : (
            <p>
              <span className="text-xl font-bold">
                {NumberUtils.formatNumber(snsEmissions ?? account.carbonDebit)}
              </span>
              <span className="font-normal">
                {t('common.unit.co2Kg', { value: '' })}
              </span>
            </p>
          )}
        </InformationItemContainer>
        <FlexRowContainer>
          <InformationItemContainer className="min-w-min">
            <h4>
              {t('common.unit.kgPerWeek', {
                value: ''
              })}
            </h4>
            {isEmissionsLoading ? (
              <Loading />
            ) : (
              <TrendValue
                differenceValue={account.weeklyEmissions}
                size="small"
                iconAlignment={'right'}
              />
            )}
          </InformationItemContainer>
          <InformationItemContainer className="ml-2">
            <h4>{t('common.status')}</h4>
            {isEmissionsLoading ? (
              <Loading />
            ) : (
              <NodeStatus status={account.status} />
            )}
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
