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
import useNodes from '@/helpers/state/useNodes';

interface NodeStatsParams {
  nodeId: string
}

const NodeStats: FC<NodeStatsParams> = ({ nodeId }) => {
  const { t } = useTranslation();
  const {
    actions: { getNodeStats },
    nodeStats
  } = useNodes();
  
  const [headlineFiguresView, setHeadlineFiguresView] =
    useState<HeadlineFiguresViewModel>(createEmptyHeadlineFiguresViewModel());

  useEffect(() => {
    getNodeStats(nodeId);
  }, [getNodeStats, nodeId]);

  useEffect(() => {
    setHeadlineFiguresView({
      cumulativeNetworkEmissions: createHeadlineFigureEntry(
        'co2Kg',
        <WorldIcon />,
        nodeStats?.cumulativeNetworkEmissions
      ),
      cumulativeElectricityDraw: createHeadlineFigureEntry(
        'wattHour',
        <ThunderboltIcon />,
        nodeStats?.cumulativeElectricityDraw
      ),
      avoidedEmissions: createHeadlineFigureEntry(
        'co2Kg',
        <CircleDashedIcon />,
        nodeStats?.avoidedEmissions
      ),
      offsetEmissions: createHeadlineFigureEntry(
        'co2Kg',
        <LeafIcon />,
        nodeStats?.offsetEmissions
      )
    });
  }, [nodeStats]);

  return (
    <div className="grid">
      {Object.entries(headlineFiguresView).map(
        (keyValue: [string, HeadlineFigureEntryModel | null]) => (
          <div key={keyValue[0]} className="col-12 lg:col-6">
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
