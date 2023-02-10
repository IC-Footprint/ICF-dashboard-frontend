import type { ReactNode } from 'react';
import type { UnitType } from '@/models/unit-type';

export interface HeadlineFiguresModel {
  cumulativeNetworkEmissions: number;
  cumulativeNetworkEmissionsRate: number;
  cumulativeElectricityDraw: number;
  avoidedEmissions: number;
  offsetEmissions: number;
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

export function createEmptyHeadlineFiguresViewModel(): HeadlineFiguresViewModel {
  return {
    avoidedEmissions: null,
    cumulativeElectricityDraw: null,
    cumulativeNetworkEmissions: null,
    offsetEmissions: null
  };
}
