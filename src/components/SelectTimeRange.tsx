import { useState } from 'react';
import { useTranslation } from 'react-i18next';

import type { SelectItem } from 'primereact/selectitem';
import type { FC } from 'react';
import type { RangeType } from '@/models/range-type';

import {
  SelectTimeRangeContainer,
  StyledSelectButton
} from '@/theme/styled-components';

export interface SelectTimeRangeProps {
  range: RangeType;
  setRange: (range: RangeType) => void;
  disabled?: boolean;
}

function createSelectItemOption(label: string, value: RangeType): SelectItem {
  return {
    value,
    label
  };
}

const SelectTimeRange: FC<SelectTimeRangeProps> = ({
  range,
  setRange,
  disabled
}) => {
  const { t } = useTranslation();
  const [options] = useState<SelectItem[]>([
    // createSelectItemOption(t('common.timeRange.halfAnHour'), 'HALF_AN_HOUR'),
    createSelectItemOption(t('common.timeRange.oneDay'), 'ONE_DAY'),
    createSelectItemOption(t('common.timeRange.sevenDays'), 'SEVEN_DAYS'),
    createSelectItemOption(t('common.timeRange.oneMonth'), 'ONE_MONTH'),
    createSelectItemOption(t('common.timeRange.threeMonths'), 'THREE_MONTHS'),
    createSelectItemOption(t('common.timeRange.oneYear'), 'ONE_YEAR')
  ]);

  return (
    <SelectTimeRangeContainer>
      <StyledSelectButton
        value={range}
        onChange={(e) => setRange(e.value)}
        options={options}
        optionValue="value"
        disabled={disabled}
        unselectable={false}
      />
    </SelectTimeRangeContainer>
  );
};

export default SelectTimeRange;
