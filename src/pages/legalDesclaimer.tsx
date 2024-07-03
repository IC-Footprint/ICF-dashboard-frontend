import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import legalDisclaimer from '@/theme/assets/legal_disclaimer.pdf';

const LegalDisclaimer: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    window.open(legalDisclaimer, '_blank');
    navigate(-1);
  }, [navigate]);

  return null;
};

export default LegalDisclaimer;
