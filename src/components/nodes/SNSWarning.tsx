import { useTranslation } from 'react-i18next';

import { useEffect, useState, type FC } from 'react';

import { Button } from 'primereact/button';

import { FlexRowCard } from '@/theme/styled-components';

const SNSWarning: FC = () => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const storedShow = localStorage.getItem('snsWarningShow');

    if (storedShow === 'false') {
      setShow(false);
    }

    return () => {
      localStorage.setItem('snsWarningShow', show.toString());
    };
  }, [show]);

  const handleShow = () => setShow(false);

  if (!show) {
    return null;
  }

  return (
    <FlexRowCard>
      <div
        style={{
          position: 'sticky',
          top: '1rem'
        }}
        className="flex align-items-center justify-content-between"
      >
        <div className="flex align-items-center">
          <i
            className="pi pi-exclamation-triangle mr-2 p-highlight"
            style={{ fontSize: '1.5rem' }}
          />
          <p className="mx-2">
            {t('dashboard.carbonAccounts.warning.message')}
          </p>
        </div>

        <Button
          onClick={handleShow}
          icon="pi pi-times"
          rounded
          text
          severity="info"
          aria-label="Cancel"
          size="small"
        />
      </div>
    </FlexRowCard>
  );
};

export default SNSWarning;
