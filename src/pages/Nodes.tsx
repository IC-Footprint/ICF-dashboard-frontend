import { Button } from 'primereact/button';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

const Nodes: FC = () => {
  const { t } = useTranslation();

  return (
    <main>
      <h1>{t('nodes')}</h1>
      <Button label="Click me" />
    </main>
  );
};

export default Nodes;
