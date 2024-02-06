import { useTranslation } from 'react-i18next';

import type {
  HeadlineFigureEntryModel,
  HeadlineFiguresModel
} from '@/models/dashboard/headline-figures-model';
import type { FC } from 'react';

import HeadlineFigureCard from '@/components/dashboard/HeadlineFigureCard';
import { createHeadlineFigureEntry } from '@/models/dashboard/headline-figures-model';
import CircleDashedIcon from '@/theme/assets/icons/circle-dashed';
import LeafIcon from '@/theme/assets/icons/leaf-alt-3';
import ThunderboltIcon from '@/theme/assets/icons/thunderbolt';
import WorldIcon from '@/theme/assets/icons/world-2';

interface NodeStatsProps {
  stats: HeadlineFiguresModel | null;
}

const NodeStats: FC<NodeStatsProps> = ({ stats }) => {
  const { t } = useTranslation();

  const headlineFigures = {
    cumulativeNetworkEmissions: createHeadlineFigureEntry(
      'co2Kg',
      <WorldIcon />,
      stats?.cumulativeNetworkEmissions
    ),
    cumulativeElectricityDraw: createHeadlineFigureEntry(
      'wattHour',
      <ThunderboltIcon />,
      stats?.cumulativeElectricityDraw
    ),
    avoidedEmissions: createHeadlineFigureEntry(
      'co2Kg',
      <CircleDashedIcon />,
      stats?.avoidedEmissions
    ),
    offsetEmissions: createHeadlineFigureEntry(
      'co2Kg',
      <LeafIcon />,
      stats?.offsetEmissions
    )
  };

  return (
    <div className="grid">
      {Object.entries(headlineFigures).map(
        (keyValue: [string, HeadlineFigureEntryModel | null]) => (
          <div key={keyValue[0]} className="col-12 md:col-6 xl:col-3">
            <HeadlineFigureCard
              label={t(`dashboard.headlineFigures.${keyValue[0]}`)}
              icon={keyValue[1]?.icon}
              value={keyValue[1]?.value}
              unit={keyValue[1]?.unit}
            />
          </div>
        )
      )}
    </div>
  );
};

export default NodeStats;
