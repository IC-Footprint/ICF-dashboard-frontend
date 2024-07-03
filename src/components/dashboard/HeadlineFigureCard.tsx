import { css } from '@emotion/css';
import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import { useMemo, type FC, type ReactNode } from 'react';

import type { UnitType } from '@/models/unit-type';

import { gridCardBackground } from '@/theme/colors';
import { FlexColumnStyle, FlexRowCard } from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

export interface HeadlineFigureProps {
  label: string;
  icon?: ReactNode;
  unit?: UnitType;
  value?: number | string | undefined;
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

  const formattedValue = useMemo(() => {
    if (typeof value === 'number') {
      return NumberUtils.formatNumber(value);
    }
    return value;
  }, [value]);

  return (
    <HeadlineFigureCardContainer>
      <HeadlineIconContainer>
        <i>{icon}</i>
      </HeadlineIconContainer>
      <div className={css(FlexColumnStyle)}>
        <h5>{label}</h5>
        <p>
          {value !== undefined
            ? unit === 'date'
              ? formattedValue
              : t(`common.unit.${unit}`, {
                  value: formattedValue
                })
            : '-'}
        </p>
      </div>
    </HeadlineFigureCardContainer>
  );
};

export default HeadlineFigureCard;
