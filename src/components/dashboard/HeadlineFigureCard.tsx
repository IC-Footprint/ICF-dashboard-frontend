import { css } from '@emotion/css';
import { useTranslation } from 'react-i18next';

import type { FC, ReactNode } from 'react';
import type { UnitType } from '@/models/unit-type';

import {
  HeadlineFigureCardContainer,
  FlexColumnStyle
} from '@/theme/styled-components';

export interface HeadlineFigureProps {
  label: string;
  icon?: ReactNode;
  unit?: UnitType;
  value?: number;
}

const HeadlineFigureCard: FC<HeadlineFigureProps> = ({
  unit = 'co2Kg',
  value,
  label,
  icon
}) => {
  const { t } = useTranslation();

  return (
    <HeadlineFigureCardContainer>
      <i>{icon}</i>
      <div className={css(FlexColumnStyle)}>
        <span>{label}</span>
        <h3>
          {value !== undefined
            ? t(`common.unit.${unit}`, {
                value: value.toLocaleString(undefined, {
                  maximumFractionDigits: 3,
                  minimumFractionDigits: 3,
                })
              })
            : '-'}
        </h3>
      </div>
    </HeadlineFigureCardContainer>
  );
};

export default HeadlineFigureCard;
