import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { FC } from 'react';

import { config } from '@/config';

const WhitePaper: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.open(config.whitepaperUrl, '_blank');
    navigate(-1);
  }, [navigate]);

  return null;
};

export default WhitePaper;
