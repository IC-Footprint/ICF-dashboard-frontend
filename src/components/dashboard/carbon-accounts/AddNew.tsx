// dashboard-frontend/src/components/dashboard/carbon-accounts/AddNewItemButton.tsx

import { useTranslation } from 'react-i18next';

import { Button } from 'primereact/button';

import { PlusIcon } from '@heroicons/react/24/outline';

import type { FC } from 'react';

interface AddNewItemButtonProps {
  itemType: 'dao' | 'dapp' | 'nodeProvider' | 'node' |'individual';
  onClick: () => void;
}

const AddNewItemButton: FC<AddNewItemButtonProps> = ({ itemType, onClick }) => {
  const { t } = useTranslation();

  return (
    <div className="col-12 md:col-6 lg:col-4 xl:col-3 p-2">
      <Button
        icon={<PlusIcon />}
        label={t(`dashboard.carbonAccounts.addNew.${itemType}`) || ''}
        onClick={onClick}
        className="p-button-rounded p-button-outlined"
      />
    </div>
  );
};

export default AddNewItemButton;
