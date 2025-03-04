import React, { useEffect, useMemo } from 'react';
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
import useIntervalIncrement from '@/helpers/useIntervalIncrement';
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
    // console.log('Ofssset emissions are: ', projectStats?.offsetEmissions);
  }, [projectStats?.offsetEmissions]);

  useEffect(() => {
    if (projectId) {
      // split project id if there's a comma
      const projectIds = projectId.split(',');
      getProjectDetails(projectIds[0]);
      getProjectCanisterAttributions(projectIds[0]);
    }
  }, [getProjectDetails, getProjectCanisterAttributions, projectId]);

  const incrementingProjectEmissions = useIntervalIncrement(
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
    // console.log('Offset emissions are: ', projectStats?.offsetEmissions);
    return projectStats
      ? {
          ...projectStats,
          cumulativeNetworkEmissions: incrementingProjectEmissions ?? 0
        }
      : null;
  }, [projectStats, incrementingProjectEmissions]);

  // console.log('offset emissions are: ', projectStats?.offsetEmissions);

  const nodeId = projectId ? projectId.split(',')[0] : '';

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
          <CheckoutCard
            nodeId={nodeId}
            account={project ?? undefined}
          />
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

export default React.memo(Project);
