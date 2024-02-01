import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';

import type { FC } from 'react';

import AccountsDataView from '@/components/dashboard/carbon-accounts/AccountsDataView';
import { appRoutes } from '@/router/app-routes';
import useDashboard from '@/helpers/state/useDashboard';

const Projects: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getProjects },
    projects,
    isProjectsLoading,
    hasProjectsError,
    searchFilter
  } = useDashboard();

  useEffect(() => {
    if (!projects) {
      getProjects();
    }

    const minutesInterval: number =
      +process.env.REACT_APP_DASHBOARD_REFRESH_MINUTES_INTERVAL!;
    const intervalId = setInterval(() => {
      getProjects();
    }, 1000 * 60 * minutesInterval);

    return () => {
      clearInterval(intervalId);
    };
  }, [projects, getProjects]);

  if (hasProjectsError) {
    return <p>{t('dashboard.carbonAccounts.projects.error')}</p>;
  }

  const filteredProjects =
    projects?.filter((project) => {
      return project.operator.name
        .toLowerCase()
        .includes(searchFilter.toLowerCase());
    }) ?? [];

  return (
    <AccountsDataView
      list={filteredProjects}
      isLoading={isProjectsLoading}
      parentRoute={appRoutes.projects.root}
      dataType="projects"
    />
  );
};

export default Projects;
