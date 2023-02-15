import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';
import type {
  HeadlineFiguresViewModel,
  HeadlineFigureEntryModel
} from '@/models/dashboard/headline-figures-model';

import WorldIcon from '@/theme/assets/icons/world-2';
import LeafIcon from '@/theme/assets/icons/leaf-alt-3';
import CircleDashedIcon from '@/theme/assets/icons/circle-dashed';
import ThunderboltIcon from '@/theme/assets/icons/thunderbolt';
import {
  createEmptyHeadlineFiguresViewModel,
  createHeadlineFigureEntry
} from '@/models/dashboard/headline-figures-model';
import HeadlineFigureCard from '@/components/dashboard/HeadlineFigureCard';
import useDashboard from '@/helpers/state/useDashboard';
import { HeadlineFiguresContainer } from '@/theme/styled-components';

const HeadlineFigures: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { getHeadlineFigures },
    headlineFigures
  } = useDashboard();
  const [headlineFiguresView, setHeadlineFiguresView] =
    useState<HeadlineFiguresViewModel>(createEmptyHeadlineFiguresViewModel());

  useEffect(() => {
    getHeadlineFigures();
  }, [getHeadlineFigures]);

  useEffect(() => {
    setHeadlineFiguresView({
      cumulativeNetworkEmissions: createHeadlineFigureEntry(
        'co2Kg',
        <WorldIcon />,
        headlineFigures?.cumulativeNetworkEmissions
      ),
      cumulativeElectricityDraw: createHeadlineFigureEntry(
        'wattHour',
        <ThunderboltIcon />,
        headlineFigures?.cumulativeElectricityDraw
      ),
      avoidedEmissions: createHeadlineFigureEntry(
        'co2Kg',
        <CircleDashedIcon />,
        headlineFigures?.avoidedEmissions
      ),
      offsetEmissions: createHeadlineFigureEntry(
        'co2Kg',
        <LeafIcon />,
        headlineFigures?.offsetEmissions
      )
    });
  }, [headlineFigures]);

  useEffect(() => {
    const incrementRate: number | null =
      headlineFigures?.cumulativeNetworkEmissionsRate ?? null;
    if (incrementRate) {
      const intervalId = setInterval(() => {
        setHeadlineFiguresView((state) => {
          if (!state.cumulativeNetworkEmissions?.value) {
            return state;
          }
          return {
            ...state,
            cumulativeNetworkEmissions: {
              ...state.cumulativeNetworkEmissions,
              value: +state.cumulativeNetworkEmissions.value + incrementRate
            }
          };
        });
      }, 1000);

      return () => {
        clearInterval(intervalId);
      };
    }
  }, [headlineFigures]);

  return (
    <HeadlineFiguresContainer>
      {Object.entries(headlineFiguresView).map(
        (keyValue: [string, HeadlineFigureEntryModel | null]) => (
          <HeadlineFigureCard
            key={keyValue[0]}
            label={t(`dashboard.headlineFigures.${keyValue[0]}`)}
            icon={keyValue[1]?.icon}
            value={keyValue[1]?.value}
            unit={keyValue[1]?.unit}
          />
        )
      )}
    </HeadlineFiguresContainer>
  );
};

export default HeadlineFigures;
