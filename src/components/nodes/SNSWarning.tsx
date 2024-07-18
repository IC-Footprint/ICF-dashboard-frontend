// SNSWarning.tsx
import { useTranslation } from 'react-i18next';
import { useEffect, useState, type FC } from 'react';
import { Button } from 'primereact/button';

import type { NodeStatusType } from '@/models/nodes/node-status-type';

import { cardBackgroundColor } from '@/theme/colors';

interface SNSWarningProps {
  status: NodeStatusType;
  id: string;
}

const SNSWarning: FC<SNSWarningProps> = ({ status, id }) => {
  const { t } = useTranslation();
  const [show, setShow] = useState(true);

  useEffect(() => {
    const storedShow = sessionStorage.getItem(`snsWarning_${id}`);
    setShow(storedShow !== 'false');
  }, [id]);

  const handleShow = () => {
    setShow(false);
    sessionStorage.setItem(`snsWarningShow_${id}`, 'false');
  };
  
  if (!show && status !== 'DOWN') {
    return null;
  }

  const warningMessage =
    status === 'DOWN'
      ? t('dashboard.carbonAccounts.warning.downMessage')
      : t('dashboard.carbonAccounts.warning.message');

  return (
    <div
      style={{
        position: 'sticky',
        top: '1rem',
        backgroundColor: `${cardBackgroundColor}80`,
        borderRadius: '1rem',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '1.5rem',
        backdropFilter: 'blur(4px)',
        boxShadow:
          '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)',
        zIndex: '20'
      }}
    >
      <div className="flex align-items-center">
        <i
          className="pi pi-exclamation-triangle mr-2 p-highlight"
          style={{ fontSize: '1.5rem' }}
        />
        <p className="mx-2">{warningMessage}</p>
      </div>

      {status !== 'DOWN' && (
        <Button
          onClick={handleShow}
          icon="pi pi-times"
          rounded
          text
          severity="info"
          aria-label="Cancel"
          size="small"
        />
      )}
    </div>
  );
};

export default SNSWarning;
