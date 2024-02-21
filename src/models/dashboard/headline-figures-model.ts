import type { ReactNode } from 'react';
import type { UnitType } from '@/models/unit-type';

export interface HeadlineFiguresModel {
  cumulativeNetworkEmissions: number;
  cumulativeNetworkEmissionsRate: number;
  cumulativeElectricityDraw: number;
  avoidedEmissions: number;
  offsetEmissions: number;
  weeklyEmissions: number;
}

export interface HeadlineFigureEntryModel {
  icon: ReactNode;
  value?: number;
  unit: UnitType;
}

export interface HeadlineFiguresViewModel {
  cumulativeNetworkEmissions: HeadlineFigureEntryModel | null;
  cumulativeElectricityDraw: HeadlineFigureEntryModel | null;
  avoidedEmissions: HeadlineFigureEntryModel | null;
  offsetEmissions: HeadlineFigureEntryModel | null;
}

export function createHeadlineFigureEntry(
  unit: UnitType,
  icon: ReactNode,
  value?: number
): HeadlineFigureEntryModel {
  return {
    icon,
    unit,
    value
  };
}

export function createEmptyHeadlineFiguresModel(): HeadlineFiguresModel {
  return {
    avoidedEmissions: 0,
    cumulativeElectricityDraw: 0,
    cumulativeNetworkEmissions: 0,
    cumulativeNetworkEmissionsRate: 0,
    offsetEmissions: 0,
    weeklyEmissions: 0
  };
}

export function createEmptyHeadlineFiguresViewModel(): HeadlineFiguresViewModel {
  return {
    avoidedEmissions: null,
    cumulativeElectricityDraw: null,
    cumulativeNetworkEmissions: null,
    offsetEmissions: null
  };
}
