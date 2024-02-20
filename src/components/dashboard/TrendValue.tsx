import styled from '@emotion/styled';
import { useMemo } from 'react';

import type { FC } from 'react';

import { primary } from '@/theme/colors';
import { FlexRowContainer } from '@/theme/styled-components';
import { NumberUtils } from '@/utils/number-utils';
import { StringUtils } from '@/utils/string-utils';

export interface TrendProps {
  differenceValue?: number;
  size?: 'small' | 'large';
  iconAlignment?: 'left' | 'right';
  isPercentage?: boolean;
}

const StyledFlexRowContainer = styled(FlexRowContainer)`
  column-gap: 0.25rem;
  justify-content: start;
  color: ${primary};
`;

const TrendValue: FC<TrendProps> = ({
  differenceValue,
  size,
  iconAlignment = 'left',
  isPercentage
}) => {
  const trendIcon = useMemo(() => {
    if (!differenceValue) {
      return null;
    }

    let iconStyle: string;
    if (differenceValue > 0) {
      iconStyle = 'pi-arrow-up';
    } else {
      iconStyle = 'pi-arrow-down';
    }

    if (size === 'small') {
      iconStyle += ' text-xs';
    }

    return <i className={`pi font-bold ${iconStyle}`}></i>;
  }, [differenceValue, size]);

  const value = isPercentage
    ? StringUtils.toDifferencePercentage(differenceValue)
    : NumberUtils.formatNumber(differenceValue, 2);

  return (
    <StyledFlexRowContainer
      className={iconAlignment === 'right' ? 'flex-row-reverse' : ''}
    >
      {trendIcon}
      <p>{value ?? '-'}</p>
    </StyledFlexRowContainer>
  );
};

export default TrendValue;
