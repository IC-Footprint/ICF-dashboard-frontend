import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import type { FC } from 'react';

import { config } from '@/config';

const LegalDisclaimer: FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.open(config.legalDisclaimerUrl, '_blank');
    navigate(-1);
  }, [navigate]);

  return null;
};

export default LegalDisclaimer;
