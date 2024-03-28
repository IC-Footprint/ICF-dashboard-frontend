import { useEffect, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams } from 'react-router-dom';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';
import type { HeadlineFiguresModel } from '@/models/dashboard/headline-figures-model';
import type { FC } from 'react';

import AccountDetailsCard from '@/components/AccountDetailsCard';
import AttributionsCard from '@/components/AttributionsCard';
import CheckoutCard from '@/components/checkout/CheckoutCard';
import ChartCard from '@/components/nodes/ChartCard';
import NodeStats from '@/components/nodes/NodeStats';
import useProjects from '@/helpers/state/useProjects';
import useIncrementalValue from '@/helpers/useIntervalIncrement';
import { FlexColumnContainer } from '@/theme/styled-components';

const Project: FC = () => {
  const { t } = useTranslation();
  const { projectId } = useParams();
  const {
    actions: {
      getProjectDetails,
      getProjectCanisterAttributions,
      getProjectEmissions
    },
    project,
    projectStats,
    projectCanisterAttributions,
    isProjectCanisterAttributionsLoading,
    projectEmissions,
    isProjectEmissionsLoading
  } = useProjects();

  useEffect(() => {
    if (projectId) {
      getProjectDetails(projectId);
      getProjectCanisterAttributions(projectId);
    }
  }, [getProjectDetails, getProjectCanisterAttributions, projectId]);

  const incrementingProjectEmissions = useIncrementalValue(
    project?.carbonDebit,
    projectStats?.cumulativeNetworkEmissionsRate
  );

  const incrementingProject = useMemo((): CarbonAccountModel | null => {
    return project
      ? {
          ...project,
          carbonDebit: incrementingProjectEmissions ?? 0
        }
      : null;
  }, [project, incrementingProjectEmissions]);

  const incrementingProjectStats = useMemo((): HeadlineFiguresModel | null => {
    return projectStats
      ? {
          ...projectStats,
          cumulativeNetworkEmissions: incrementingProjectEmissions ?? 0
        }
      : null;
  }, [projectStats, incrementingProjectEmissions]);

  return (
    <FlexColumnContainer>
      <h3 className="text-lg text-color-secondary">
        {t('project.machineId', { projectId })}
      </h3>
      <div className="grid">
        <div className="col-12 lg:col-5">
          <AccountDetailsCard
            account={incrementingProject}
            nameLabel={t('table.headers.name') as string}
          />
        </div>
        <div className="col-12 lg:col-7">
          <CheckoutCard nodeId='eq6en-6jqla-fbu5s-daskr-h6hx2-376n5-iqabl-qgrng-gfqmv-n3yjr-mqe' />
        </div>
        <div className="col-12">
          <NodeStats stats={incrementingProjectStats} />
        </div>
        <div className="col-12">
          <AttributionsCard
            title={t('project.projectAttributions')}
            list={projectCanisterAttributions ?? []}
            isLoading={isProjectCanisterAttributionsLoading}
          />
        </div>
        <div className="col-12">
          <ChartCard
            label={t('project.projectEmissions')}
            idFilter={projectId ?? ''}
            data={projectEmissions}
            getDataAction={getProjectEmissions}
            isLoading={isProjectEmissionsLoading}
          />
        </div>
      </div>
    </FlexColumnContainer>
  );
};

export default Project;
