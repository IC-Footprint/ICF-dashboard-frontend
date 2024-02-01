import styled from '@emotion/styled';
import { Tag } from 'primereact/tag';
import { useTranslation } from 'react-i18next';

import type { UnitType } from '@/models/unit-type';
import type { FC } from 'react';

import TrendValue from '@/components/dashboard/TrendValue';
import icBackground from '@/theme/assets/ic-background.png';
import { primary, primaryLight } from '@/theme/colors';
import {
  FlexColumnContainer,
  FlexRowCard,
  FlexRowContainer
} from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';

interface DashboardOutstandingCarbonDebitProps {
  carbonDebit?: number;
  weekDifferencePercentage?: number;
  unit?: UnitType;
}

const LightTag = styled(Tag)`
  padding: 0.5rem 1rem;
  color: ${primary};
  background: ${primaryLight};
`;

const CardContainer = styled(FlexRowCard)`
  height: 100%;
  background-image: url(${icBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .p-card-body {
    height: 100%;

    .p-card-content {
      height: 100%;
    }
  }
`;

const Home: FC<DashboardOutstandingCarbonDebitProps> = ({
  carbonDebit,
  weekDifferencePercentage,
  unit = 'co2Kg'
}) => {
  const { t } = useTranslation();

  return (
    <CardContainer>
      <FlexColumnContainer>
        <h4 className="opacity-60 font-normal">
          {t('dashboard.carbonDebit.title')}
        </h4>
        <h1 className="font-bold text-color">
          {NumberUtils.formatNumber(carbonDebit) ?? '-'}
          <span className="text-lg font-normal">
            {t(`common.unit.${unit}`, {
              value: ' '
            })}
          </span>
        </h1>
      </FlexColumnContainer>
      <LightTag>
        <FlexRowContainer>
          <TrendValue
            differenceValue={weekDifferencePercentage ?? 0}
            isPercentage
          />
          <span>{`${t('dashboard.carbonDebit.timeDifference')}`}</span>
        </FlexRowContainer>
      </LightTag>
    </CardContainer>
  );
};

export default Home;
