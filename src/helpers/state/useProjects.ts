import { useCallback } from 'react';

import type { DatasetFilterModel } from '@/models/dataset-filter-model';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  getProjectDetailsAction,
  getProjectCanisterAttributionsAction,
  getProjectEmissionsAction,
  getProjectPowerConsumptionAction
} from '@/state/projects/projects-slice';

const useProjects = () => {
  const dispatch = useAppDispatch();

  const getProjectDetails = useCallback(
    (projectId: string) => dispatch(getProjectDetailsAction(projectId)),
    [dispatch]
  );

  const projectStats = useAppSelector((state) => state.projects.projectStats);

  const project = useAppSelector((state) => state.projects.project);

  const isProjectLoading = useAppSelector(
    (state) => state.projects.projectLoading
  );

  const hasProjectError = useAppSelector(
    (state) => state.projects.projectError
  );

  const getProjectCanisterAttributions = useCallback(
    (projectId: string) =>
      dispatch(getProjectCanisterAttributionsAction(projectId)),
    [dispatch]
  );

  const projectCanisterAttributions = useAppSelector(
    (state) => state.projects.projectCanisterAttributions
  );

  const isProjectCanisterAttributionsLoading = useAppSelector(
    (state) => state.projects.projectCanisterAttributionsLoading
  );

  const hasProjectCanisterAttributionsError = useAppSelector(
    (state) => state.projects.projectCanisterAttributionsError
  );

  const getProjectEmissions = useCallback(
    (filter: DatasetFilterModel) => dispatch(getProjectEmissionsAction(filter)),
    [dispatch]
  );

  const projectEmissions = useAppSelector(
    (state) => state.projects.projectEmissions
  );

  const isProjectEmissionsLoading = useAppSelector(
    (state) => state.projects.projectEmissionsLoading
  );

  const hasProjectEmissionsError = useAppSelector(
    (state) => state.projects.projectEmissionsError
  );

  const getProjectPowerConsumption = useCallback(
    (filter: DatasetFilterModel) =>
      dispatch(getProjectPowerConsumptionAction(filter)),
    [dispatch]
  );

  const projectPowerConsumption = useAppSelector(
    (state) => state.projects.projectPowerConsumption
  );

  const isProjectPowerConsumptionLoading = useAppSelector(
    (state) => state.projects.projectPowerConsumptionLoading
  );

  const hasProjectPowerConsumptionError = useAppSelector(
    (state) => state.projects.projectPowerConsumptionError
  );

  return {
    actions: {
      getProjectDetails,
      getProjectCanisterAttributions,
      getProjectEmissions,
      getProjectPowerConsumption
    },
    projectStats,
    project,
    isProjectLoading,
    hasProjectError,
    projectCanisterAttributions,
    isProjectCanisterAttributionsLoading,
    hasProjectCanisterAttributionsError,
    projectEmissions,
    isProjectEmissionsLoading,
    hasProjectEmissionsError,
    projectPowerConsumption,
    isProjectPowerConsumptionLoading,
    hasProjectPowerConsumptionError
  };
};

export default useProjects;
