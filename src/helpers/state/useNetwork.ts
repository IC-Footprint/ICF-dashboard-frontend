import { useCallback } from 'react';

import type { RangeType } from '@/models/range-type';

import { useAppDispatch, useAppSelector } from '@/state/hooks';
import {
  getSubnetEmissionsByTypeAction,
  getEmissionsBySubnetAction,
  getNetworkDetailsAction,
  getNetworkAttributionsAction
} from '@/state/network/network-slice';

const useNetwork = () => {
  const dispatch = useAppDispatch();

  const getSubnetEmissionsByType = useCallback(
    (range: RangeType | null) =>
      dispatch(getSubnetEmissionsByTypeAction(range)),
    [dispatch]
  );

  const subnetEmissionsByType = useAppSelector(
    (state) => state.network.subnetEmissionsByType
  );

  const isSubnetEmissionsByTypeLoading = useAppSelector(
    (state) => state.network.subnetEmissionsByTypeLoading
  );

  const hasSubnetEmissionsByTypeError = useAppSelector(
    (state) => state.network.subnetEmissionsByTypeError
  );

  const getEmissionsBySubnet = useCallback(
    (range: RangeType | null) => dispatch(getEmissionsBySubnetAction(range)),
    [dispatch]
  );

  const emissionsBySubnet = useAppSelector(
    (state) => state.network.emissionsBySubnet
  );

  const isEmissionsBySubnetLoading = useAppSelector(
    (state) => state.network.emissionsBySubnetLoading
  );

  const hasEmissionsBySubnetError = useAppSelector(
    (state) => state.network.emissionsBySubnetError
  );

  const getNetworkDetails = useCallback(
    () => dispatch(getNetworkDetailsAction()),
    [dispatch]
  );

  const networkDetails = useAppSelector(
    (state) => state.network.networkDetails
  );

  const networkStats = useAppSelector((state) => state.network.networkStats);

  const isNetworkDetailsLoading = useAppSelector(
    (state) => state.network.networkDetailsLoading
  );

  const hasNetworkDetailsError = useAppSelector(
    (state) => state.network.networkDetailsError
  );

  const getNetworkAttributions = useCallback(
    () => dispatch(getNetworkAttributionsAction()),
    [dispatch]
  );

  const networkAttributions = useAppSelector(
    (state) => state.network.networkAttributions
  );

  const isNetworkAttributionsLoading = useAppSelector(
    (state) => state.network.networkAttributionsLoading
  );

  const hasNetworkAttributionsError = useAppSelector(
    (state) => state.network.networkAttributionsError
  );

  return {
    actions: {
      getSubnetEmissionsByType,
      getEmissionsBySubnet,
      getNetworkDetails,
      getNetworkAttributions
    },
    subnetEmissionsByType,
    isSubnetEmissionsByTypeLoading,
    hasSubnetEmissionsByTypeError,
    emissionsBySubnet,
    isEmissionsBySubnetLoading,
    hasEmissionsBySubnetError,
    networkDetails,
    networkStats,
    isNetworkDetailsLoading,
    hasNetworkDetailsError,
    networkAttributions,
    isNetworkAttributionsLoading,
    hasNetworkAttributionsError
  };
};

export default useNetwork;
