import { useCallback } from 'react';

import type { RangeType } from '@/models/range-type';

import { useAppDispatch, useAppSelector } from '@/state/hooks';

import {
  getSubnetEmissionsByTypeAction,
  getEmissionsBySubnetAction
} from '@/state/subnets/subnets-actions';

const useSubnets = () => {
  const dispatch = useAppDispatch();

  const getSubnetEmissionsByType = useCallback(
    (range: RangeType | null) => dispatch(getSubnetEmissionsByTypeAction(range)),
    [dispatch]
  );

  const subnetEmissionsByType = useAppSelector(
    (state) => state.subnets.subnetEmissionsByType
  );

  const isSubnetEmissionsByTypeLoading = useAppSelector(
    (state) => state.subnets.subnetEmissionsByTypeLoading
  );

  const hasSubnetEmissionsByTypeError = useAppSelector(
    (state) => state.subnets.subnetEmissionsByTypeError
  );

  const getEmissionsBySubnet = useCallback(
    (range: RangeType | null) => dispatch(getEmissionsBySubnetAction(range)),
    [dispatch]
  );

  const emissionsBySubnet = useAppSelector(
    (state) => state.subnets.emissionsBySubnet
  );

  const isEmissionsBySubnetLoading = useAppSelector(
    (state) => state.subnets.emissionsBySubnetLoading
  );

  const hasEmissionsBySubnetError = useAppSelector(
    (state) => state.subnets.emissionsBySubnetError
  );

  return {
    actions: {
      getSubnetEmissionsByType,
      getEmissionsBySubnet
    },
    subnetEmissionsByType,
    isSubnetEmissionsByTypeLoading,
    hasSubnetEmissionsByTypeError,
    emissionsBySubnet,
    isEmissionsBySubnetLoading,
    hasEmissionsBySubnetError
  };
};

export default useSubnets;
