import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import type { UnitType } from '@/models/unit-type';
import type { FC, ReactNode } from 'react';

import { gridCardBackground } from '@/theme/colors';
import { FlexColumnStyle, FlexRowCard } from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

export interface HeadlineFigureProps {
  label: string;
  icon?: ReactNode;
  unit?: UnitType;
  value?: number;
}

export const HeadlineFigureCardContainer = styled(FlexRowCard)`
  .p-card-body {
    padding-right: 0.5rem;
  }

  i {
    height: 2rem;
    color: var(--primary-color);
  }

  p {
    font-size: 1rem;
    font-weight: bold;
  }
`;

const HeadlineIconContainer = styled.span`
  background-color: ${gridCardBackground};
  padding: 0.75rem;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const HeadlineFigureCard: FC<HeadlineFigureProps> = ({
  unit = 'co2Kg',
  value,
  label,
  icon
}) => {
  const { t } = useTranslation();

  return (
    <HeadlineFigureCardContainer>
      <HeadlineIconContainer>
        <i>{icon}</i>
      </HeadlineIconContainer>
      <div className={css(FlexColumnStyle)}>
        <h5>{label}</h5>
        <p>
          {value !== undefined
            ? t(`common.unit.${unit}`, {
                value: NumberUtils.formatNumber(value)
              })
            : '-'}
        </p>
      </div>
    </HeadlineFigureCardContainer>
  );
};

export default HeadlineFigureCard;
