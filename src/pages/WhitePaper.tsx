// import styled from '@emotion/styled';
// import { useTranslation } from 'react-i18next';

import { useNavigate } from 'react-router-dom';

import { useEffect, type FC } from 'react';

import whitepaper from '@/theme/assets/whitepaper.pdf';

// import gradientBackground from '@/theme/assets/gradient-background.png';
// import { FlexColumnContainer } from '@/theme/styled-components';

// const ColumnContainer = styled(FlexColumnContainer)`
//   background: url(${gradientBackground}) center;
//   background-size: cover;
//   border-radius: 1rem;
// `;

const WhitePaper: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.open(whitepaper, '_blank');
    navigate(-1);
  }, [navigate]);

  return null;
};

export default WhitePaper;
