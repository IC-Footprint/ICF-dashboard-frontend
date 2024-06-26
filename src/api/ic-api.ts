interface EnergyConsumptionResponseResponse {
  energy_consumption_rate: string[][];
}
type CycleBurnRateResponse = {
  cycle_burn_rate: [number, string][];
};

const BASE_URL = 'https://ic-api.internetcomputer.org';

class IcApi {
  private async request<T>(url: string) {
    const result = await fetch(`${BASE_URL}/${url}`);
    return result.json() as Promise<T>;
  }

  getNodeEnergyConsumptionRate(
    nodeId: string,
    start: number,
    end: number,
    granularity: number
  ): Promise<EnergyConsumptionResponseResponse> {
    return this.request(
      `api/v3/metrics/node-energy-consumption-rate-kwh?start=${start}&end=${end}&node_id=${nodeId}&step=${granularity}`
    );
  }

  async getCycleBurnRate(): Promise<CycleBurnRateResponse> {
    return this.request('api/v3/metrics/cycle-burn-rate');
  }
}

export default IcApi;
