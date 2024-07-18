import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import { Principal } from '@dfinity/principal';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { FC } from 'react';

import type { NodeStatusType } from '@/models/nodes/node-status-type';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import AttributionsCard from '@/components/AttributionsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
// import ChartCard from '@/components/nodes/ChartCard';
// import NodePowerConsumption from '@/components/nodes/NodePowerConsumtion';
import NodeStats from '@/components/nodes/NodeStats';
import useNodes from '@/helpers/state/useNodes';
import usePayment from '@/helpers/state/usePayment';
import useIntervalIncrement from '@/helpers/useIntervalIncrement';
import { FlexColumnContainer } from '@/theme/styled-components';
import {
  getSNSMetadata,
  createSNSEmissions,
  updateEmissionsInBackground
} from '@/api/sns-api';

import SNSWarning from '@/components/nodes/SNSWarning';
import defaultICPIcon from '@/theme/assets/ic-logo.png';

/**
 * Renders the Node component, which displays detailed information about a specific node.
 * This component fetches and displays node details, stats, canister attributions, emissions, and power consumption.
 * It also handles the incrementing of node emissions and updates the displayed values accordingly.
 */
const SNSDetails: FC = () => {
  const { t } = useTranslation();
  const { snsId } = useParams();
  const {
    actions: {
      getNodeDetails,
      getNodeStats,
      getNodeCanisterAttributions,
      // getNodeEmissions,
      resetNodeDetails
    },
    nodeDetails,
    nodeStats,
    canisterAttributions,
    isCanisterAttributionsLoading
    // nodeEmissions,
    // nodeEmissionsLoading
  } = useNodes();

  const date = '2024-06-29';
  const dateError = 'Not Tracking Emissions Yet';
  const { paymentRegistered, payment } = usePayment();

  const [snsName, setSnsName] = useState<string | undefined>(undefined);
  const [snsIcon, setSnsIcon] = useState<string | undefined>(undefined);
  const [snsEmissions, setSnsEmissions] = useState<number>();
  const [snsStatus, setSnsStatus] = useState<NodeStatusType>('BETA');

  useEffect(() => {
    if (snsId) {
      const principal = Principal.fromText(snsId);
      getSNSMetadata(principal)
        .then((value) => {
          const icon =
            Array.isArray(value.logo) && value.logo.length > 0
              ? value.logo[0]
              : defaultICPIcon;
          setSnsIcon(icon);

          const name =
            Array.isArray(value.name) && value.name.length > 0
              ? value.name[0]
              : undefined;
          setSnsName(name);
        })
        .catch((error) => {
          console.error('Error fetching SNS metadata:', error);
          setSnsIcon(defaultICPIcon);
        });

      createSNSEmissions(principal).then((value) => {
        setSnsEmissions(value);
        if (value === 0) {
          setSnsStatus('DOWN');
        }
        if (value !== 0) {
          updateEmissionsInBackground(principal);
        }
      });
    }
  }, [snsId]);

  useEffect(() => {
    if (snsId) {
      getNodeDetails(snsId);
      getNodeStats(snsId);
      getNodeCanisterAttributions(snsId);
    }
    return () => {
      resetNodeDetails();
    };
  }, [
    snsId,
    getNodeDetails,
    getNodeStats,
    getNodeCanisterAttributions,
    resetNodeDetails
  ]);

  useEffect(() => {
    if (snsId && payment?.nodeId.includes(snsId) && paymentRegistered) {
      getNodeCanisterAttributions(snsId);
    }
  }, [payment, paymentRegistered, getNodeCanisterAttributions, snsId]);

  const incrementingNodeEmissions = useIntervalIncrement(
    nodeDetails?.carbonDebit,
    nodeStats?.cumulativeNetworkEmissionsRate
  );

  const incrementingNodeDetails = useMemo((): CarbonAccountModel | null => {
    return nodeDetails
      ? {
          ...nodeDetails,
          carbonDebit: snsEmissions ?? incrementingNodeEmissions ?? 0,
          operator: {
            ...nodeDetails.operator,
            name: snsName ?? nodeDetails.operator?.name ?? '',
            icon: snsIcon ?? nodeDetails.icon
          },
          status: snsStatus ?? nodeDetails.status
        }
      : null;
  }, [
    nodeDetails,
    incrementingNodeEmissions,
    snsEmissions,
    snsName,
    snsIcon,
    snsStatus
  ]);

  const incrementingNodeStats = useMemo((): HeadlineFiguresModel | null => {
    return nodeStats
      ? {
          ...nodeStats,
          cumulativeNetworkEmissions:
            snsEmissions ?? incrementingNodeEmissions ?? 0
        }
      : null;
  }, [nodeStats, incrementingNodeEmissions, snsEmissions]);

  return (
    <FlexColumnContainer>
      <SNSWarning status={snsStatus} id={snsId ?? ''} />
      <h3 className="text-lg text-color-secondary">
        {t('nodes.sns', { nodeId: snsId })}
      </h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard
            account={incrementingNodeDetails}
            nameLabel={t('dashboard.carbonAccounts.sns') ?? ''}
          />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard
            nodeId={snsId}
            account={nodeDetails ?? undefined}
            isPaymentUnsupported={incrementingNodeDetails?.status === 'DOWN'}
          />
        </div>
        <div className="col-12">
          <NodeStats
            stats={incrementingNodeStats}
            startDate={
              snsStatus === 'BETA'
                ? date
                : snsStatus === 'DOWN'
                ? dateError
                : undefined
            }
            isSNS={true}
          />
        </div>
        <div className="col-12">
          <AttributionsCard
            title={t('nodes.nodeCanisterAttributions')}
            list={canisterAttributions ?? []}
            isLoading={isCanisterAttributionsLoading}
          />
        </div>
        {/* <div className="col-12 lg:col-6">
          <ChartCard
            label={t('nodes.nodeEmissions')}
            idFilter={snsId ?? ''}
            data={nodeEmissions}
            getDataAction={getNodeEmissions}
            isLoading={nodeEmissionsLoading}
          />
        </div> */}
        {/* <div className="col-12 lg:col-6">
          <NodePowerConsumption nodeId={snsId ?? ''} />
        </div> */}
      </div>
    </FlexColumnContainer>
  );
};

export default SNSDetails;
