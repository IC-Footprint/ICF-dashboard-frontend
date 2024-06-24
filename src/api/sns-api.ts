import type { Principal } from '@dfinity/principal';

import type { CarbonAccountModel } from '@/models/dashboard/carbon-account-model';

import type { Result_4 } from '@/declarations/cycles_assessment_manager/cycles_assessment_manager.did';

import { createActor as cyclesManagerActor } from '@/declarations/cycles_assessment_manager';

const cycles_assessment_manager =
  process.env.CANISTER_ID_CYCLES_ASSESSMENT_MANAGER ?? '';
const cyclesAssessmentManager = cyclesManagerActor(cycles_assessment_manager, {
  agentOptions: {
    host: import.meta.env.VITE_APP_ICP_NETWORK_HOST
  }
});

export async function getSNS(): Promise<CarbonAccountModel[]> {
  try {
    const rootCanisterResults =
      await cyclesAssessmentManager.fetch_root_canisters();

    if ('Err' in rootCanisterResults) {
      throw Error(
        `[Error fetching root canisters]: ${rootCanisterResults.Err}`
      );
    }

    return rootCanisterResults.Ok.map((rootCanister) => ({
      id: rootCanister.toText(),
      operator: {
        name: rootCanister.toText()
      },
      carbonDebit: -1,
      status: null,
      weeklyEmissions: -1,
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
): Promise<Result_4> => {
  return await cyclesAssessmentManager.get_sns_metadata(principal);
};

export const getSNSEmissions = async (
  principal: Principal
): Promise<number> => {
  const networkEmissionsValue = 1_340_721.27;
  const networkBurnRateValue = 15_710_317_192;

  const burnRateResult =
    await cyclesAssessmentManager.get_root_canister_cycles_burn_rate(principal);

  if ('Err' in burnRateResult) {
    console.error('Error fetching burn rate:', burnRateResult.Err);
    return 0;
  }

  const snsEmissionsValue =
    await cyclesAssessmentManager.calculate_canister_emission_rate(
      Number(burnRateResult.Ok),
      networkBurnRateValue,
      networkEmissionsValue
    );

  return snsEmissionsValue;
};

export async function fetchSNSData(): Promise<CarbonAccountModel[]> {
  try {
    // Hard-coded values
    const networkEmissionsValue = 1000; // Example value
    const networkBurnRateValue = 500; // Example value

    // Fetch root canisters
    const rootCanistersResult =
      await cyclesAssessmentManager.fetch_root_canisters();
    console.log('Root Canisters:', rootCanistersResult);

    if ('Err' in rootCanistersResult) {
      console.error('Error fetching root canisters:', rootCanistersResult.Err);
      return [];
    }

    interface SNSBurnRate {
      canisterId: Principal;
      burnRate?: number;
    }

    const snsBurnRates: SNSBurnRate[] = [];

    for (const rootCanister of rootCanistersResult.Ok) {
      const burnRateResult =
        await cyclesAssessmentManager.get_root_canister_cycles_burn_rate(
          rootCanister
        );

      if ('Err' in burnRateResult) {
        console.error('Error fetching burn rate:', burnRateResult.Err);

        snsBurnRates.push({
          canisterId: rootCanister
        });

        continue;
      }

      snsBurnRates.push({
        canisterId: rootCanister,
        burnRate: Number(burnRateResult.Ok)
      });
    }

    interface SNSEmmission {
      canisterId: Principal;
      burnRate: number;
      snsEmissionsValue: number;
      networkBurnRateValue: number;
      networkEmissionsValue: number;
    }

    const snsEmissions: SNSEmmission[] = [];

    // Fetch sns emmissions
    for (const sns of snsBurnRates) {
      if (sns.burnRate === undefined) {
        snsEmissions.push({
          canisterId: sns.canisterId,
          burnRate: 0,
          snsEmissionsValue: 0,
          networkBurnRateValue,
          networkEmissionsValue
        });
      } else {
        const snsEmissionsValue =
          await cyclesAssessmentManager.calculate_canister_emission_rate(
            sns.burnRate,
            networkBurnRateValue,
            networkEmissionsValue
          );

        snsEmissions.push({
          canisterId: sns.canisterId,
          burnRate: sns.burnRate,
          networkBurnRateValue,
          networkEmissionsValue,
          snsEmissionsValue
        });
      }
    }

    return snsEmissions.map((sns) => {
      return {
        id: sns.canisterId.toText(),
        operator: {
          name: sns.canisterId.toText()
        },
        carbonDebit: sns.snsEmissionsValue,
        status: null,
        weeklyEmissions: 0,
        confidence: null,
        location: null,
        type: 'sns'
      };
    });
  } catch (error) {
    console.error('Error fetching SNS data:', error);
    return [];
  }
}
