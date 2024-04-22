import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import gradientBackground from '@/theme/assets/gradient-background.png';
import { FlexColumnContainer } from '@/theme/styled-components';

const ColumnContainer = styled(FlexColumnContainer)`
  background: url(${gradientBackground}) center;
  background-size: cover;
  border-radius: 1.5rem;
`;

const WhitePaper: FC = () => {
  const { t } = useTranslation();

  return (
    <FlexColumnContainer>
      <h3>{t('whitePaper.title')}</h3>
      <ColumnContainer className="justify-content-center align-items-center flex-grow-1 row-gap-3 mt shadow-5">
        <h1 className="font-bold">{t('common.featureStatus.comingSoon')}</h1>
        <p>{t('common.featureStatus.wipMessage')}</p>
      </ColumnContainer>
    </FlexColumnContainer>
  );
};

export default WhitePaper;
