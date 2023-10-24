import axios from 'axios';

import type { AxiosResponse } from 'axios';

interface CryptoEmissions {
  name: string;
  emissions: { [key: string]: number };
}

interface GraphDataApiObject {
  ticker: string;
  dates: string[];
  dailyEmissions: number[];
}

interface ConsumptionGraphDataApiObject {
  ticker: string;
  dates: string[];
  dailyConsumption: number[];
}

export interface ChartDataApiObject {
  ticker: string;
  marketcap: number;
  emission: number;
  consumption: number;
  power: number;
}

export interface CryptodetailsApiObject {
  ticker: string;
  name: string;
  outputs: {
    power: string;
    electricity: string;
    emissions: string;
  };
}

class CarbonRankingsApi {
  async getEmissionsGraphData(): Promise<CryptoEmissions[]> {
    const response: AxiosResponse<GraphDataApiObject[]> = await axios.get(
      '/dashboard/emissionsGraphData'
    );

    const cryptoStats = response.data.map((emissions) => {
      const readings: { [name: string]: number } = {};

      emissions.dates.forEach((date, index) => {
        readings[date] = emissions.dailyEmissions[index];
      });

      return {
        name: emissions.ticker,
        emissions: readings
      };
    });

    return cryptoStats;
  }

  async getConsumptionGraphData(): Promise<CryptoEmissions[]> {
    const response: AxiosResponse<ConsumptionGraphDataApiObject[]> =
      await axios.get('/dashboard/consumptionGraphData');

    const cryptoStats = response.data.map((emissions) => {
      const readings: { [name: string]: number } = {};

      emissions.dates.forEach((date, index) => {
        readings[date] = emissions.dailyConsumption[index];
      });

      return {
        name: emissions.ticker,
        emissions: readings
      };
    });

    return cryptoStats;
  }

  async getChartData(): Promise<ChartDataApiObject[]> {
    const response: AxiosResponse<ChartDataApiObject[]> = await axios.get(
      '/dashboard/cryptoChartData'
    );
    return response.data;
  }

  async getCryptoDetails(): Promise<CryptodetailsApiObject[]> {
    const response: AxiosResponse<CryptodetailsApiObject[]> = await axios.get(
      '/dashboard/curencyDetails'
    );
    return response.data;
  }
}

export default CarbonRankingsApi;
