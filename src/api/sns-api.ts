import networkApi from './network-api';

import type { Principal } from '@dfinity/principal';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import type { SnsMetadata } from '@/declarations/cycles_assessment_manager/cycles_assessment_manager.did';

import { createActor as cyclesManagerActor } from '@/declarations/cycles_assessment_manager';

import IcApi from '@/api/ic-api';

// const MEASUREMENT_INTERVAL = 60 * 60 * 1000;

const cycles_assessment_manager =
  process.env.CANISTER_ID_CYCLES_ASSESSMENT_MANAGER ?? '';
const cyclesAssessmentManager = cyclesManagerActor(cycles_assessment_manager, {
  agentOptions: {
    host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
  }
});

const icClient = new IcApi();

const emissionsCache: { [key: string]: { value: number; timestamp: number } } =
  {};
const CACHE_EXPIRATION_TIME = 60 * 60 * 1000;

export async function getSNS(): Promise<CarbonAccountModel[]> {
  try {
    const rootCanistersResult =
      await cyclesAssessmentManager.get_root_canisters();

    let rootCanisters: Principal[];
    if (rootCanistersResult.length === 0) {
      const fetchRootCanistersResult =
        await cyclesAssessmentManager.fetch_root_canisters();
      if ('Err' in fetchRootCanistersResult) {
        throw Error(
          `[Error fetching root canisters]: ${fetchRootCanistersResult.Err}`
        );
      }
      rootCanisters = fetchRootCanistersResult.Ok;
    } else {
      rootCanisters = rootCanistersResult;
    }

    // Reverse the order of rootCanisters
    rootCanisters = rootCanisters.reverse();

    return rootCanisters.map((rootCanister) => ({
      id: rootCanister.toText(),
      operator: {
        name: rootCanister.toText()
      },
      carbonDebit: 0,
      status: 'BETA',
      weeklyEmissions: 0,
      confidence: null,
      location: null,
      type: 'sns'
    }));
  } catch (error) {
    console.error(error);
    return [];
  }
}

export const getSNSMetadata = async (
  principal: Principal
): Promise<SnsMetadata> => {
  let metadata: SnsMetadata;

  const getMetadataResponse = await cyclesAssessmentManager.get_metadata(
    principal
  );

  if (getMetadataResponse.length === 0) {
    const getSnsMetadata = await cyclesAssessmentManager.get_sns_metadata(
      principal
    );

    if ('Ok' in getSnsMetadata) {
      metadata = getSnsMetadata.Ok;
    } else {
      throw Error(`[Error fetching SNS metadata]: ${getSnsMetadata.Err}`);
    }
  } else {
    metadata = getMetadataResponse[0];
  }

  return metadata;
};

export const createSNSEmissions = async (
  principal: Principal
): Promise<number> => {
  const cacheKey = principal.toText();
  const cachedValue = emissionsCache[cacheKey];

  // If there's a cached value and it's not expired, return it
  if (
    cachedValue &&
    Date.now() - cachedValue.timestamp < CACHE_EXPIRATION_TIME
  ) {
    // Trigger background update
    updateEmissionsInBackground(principal);
    return cachedValue.value;
  }

  // If there's no cached value or it's expired, calculate a new one
  const newValue = await calculateSNSEmissions(principal);

  // Update the cache
  emissionsCache[cacheKey] = { value: newValue, timestamp: Date.now() };

  return newValue;
};

const updateEmissionsInBackground = async (principal: Principal) => {
  try {
    const [dailyNetworkEmissionsData, burnRateResult] = await Promise.all([
      networkApi.getDailyNetworkEmissions(),
      cyclesAssessmentManager.get_root_canister_cycles_burn_rate(principal)
    ]);

    const dailyNetworkEmissions =
      dailyNetworkEmissionsData.cumulativeNetworkEmissions;

    const { cycle_burn_rate } = await icClient.getCycleBurnRate();
    const dailyCyclesBurnedData = cycle_burn_rate[0][1];
    const dailyCyclesBurnedPerDay = +dailyCyclesBurnedData * 24 * 60 * 60;

    if ('Err' in burnRateResult) {
      console.error('Error fetching burn rate:', burnRateResult.Err);
      return;
    }

    cyclesAssessmentManager
      .get_cumulative_sns_emissions(
        principal,
        dailyCyclesBurnedPerDay,
        dailyNetworkEmissions,
        Number(burnRateResult.Ok)
      )
      .catch((error) => {
        console.error(
          'Error updating cumulative emissions in background:',
          error
        );
      });
  } catch (error) {
    console.error('Error in updateEmissionsInBackground:', error);
  }
};

const calculateSNSEmissions = async (principal: Principal): Promise<number> => {
  try {
    const snsEmissionsValue =
      await cyclesAssessmentManager.get_stored_sns_emissions(principal);
    if ('Err' in snsEmissionsValue) {
      console.error('Error fetching emissions:', snsEmissionsValue.Err);
      if (
        snsEmissionsValue.Err ===
        `No emissions data found for SNS with root ID: ${principal.toText()}`
      ) {
        const [dailyNetworkEmissionsData, burnRateResult] = await Promise.all([
          networkApi.getDailyNetworkEmissions(),
          cyclesAssessmentManager.get_root_canister_cycles_burn_rate(principal)
        ]);

        const dailyNetworkEmissions =
          dailyNetworkEmissionsData.cumulativeNetworkEmissions;

        const { cycle_burn_rate } = await icClient.getCycleBurnRate();
        const dailyCyclesBurnedData = cycle_burn_rate[0][1];

        // Calculate the per day rate
        const dailyCyclesBurnedPerDay = +dailyCyclesBurnedData * 24 * 60 * 60;

        if ('Err' in burnRateResult) {
          console.error('Error fetching burn rate:', burnRateResult.Err);
          return 0;
        }
        cyclesAssessmentManager
          .get_cumulative_sns_emissions(
            principal,
            dailyCyclesBurnedPerDay,
            dailyNetworkEmissions,
            Number(burnRateResult.Ok)
          )
          .catch((error) => {
            console.error(
              'Error updating cumulative emissions in background:',
              error
            );
          });
      }
      return 0;
    }

    updateEmissionsInBackground(principal);

    return snsEmissionsValue.Ok;
  } catch (error) {
    console.error('Error in calculateSNSEmissions:', error);
    throw error;
  }
};
