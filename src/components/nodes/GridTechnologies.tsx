import { Tooltip } from 'primereact/tooltip';
import { useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC, ReactNode } from 'react';
import type { GridTechnologyType } from '@/models/nodes/grid-technology-type';

import { gridTechnologyColorMap } from '@/models/nodes/grid-technology-type';
import { textColor } from '@/theme/colors';
import {
  ColoredChip,
  GridTechnologiesContainer
} from '@/theme/styled-components';

export interface GridTechnologiesProps {
  id: string;
  technologies: GridTechnologyType[];
  maximumVisibleTechnologies: number;
}

const GridTechnologies: FC<GridTechnologiesProps> = ({
  technologies,
  maximumVisibleTechnologies,
  id
}) => {
  const { t } = useTranslation();
  const tooltipId: string = useMemo(() => `custom-chip-tooltip-${id}`, [id]);
  const technologiesTemplate: ReactNode[] = technologies.map(
    (technology: GridTechnologyType) => (
      <ColoredChip
        key={technology}
        label={t(
          `common.gridTechnologyType.${technology.toLowerCase()}`
        ).toString()}
        $color={gridTechnologyColorMap[technology]}
      ></ColoredChip>
    )
  );

  if (technologiesTemplate.length > maximumVisibleTechnologies) {
    return (
      <GridTechnologiesContainer>
        {technologiesTemplate[0]}
        <Tooltip target={`#${tooltipId}`} position="top" />
        <ColoredChip
          id={tooltipId}
          label={`+${technologies.length - 1}`}
          $color={textColor}
          data-pr-tooltip={technologies
            .slice(1)
            .map((technology: GridTechnologyType) =>
              t(`common.gridTechnologyType.${technology.toLowerCase()}`)
            )
            .join(', ')}
        ></ColoredChip>
      </GridTechnologiesContainer>
    );
  }

  return (
    <GridTechnologiesContainer>
      {technologiesTemplate}
    </GridTechnologiesContainer>
  );
};

export default GridTechnologies;
