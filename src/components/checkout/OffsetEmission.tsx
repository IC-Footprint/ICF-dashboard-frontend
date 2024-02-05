import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import CheckoutForm from '@/components/checkout/CheckoutForm';
import { FeaturesInformationCard } from '@/theme/styled-components';

const OffsetEmission: FC = () => {
  const { t } = useTranslation();
  return (
    <>
      <h4 className="py-3">{t('checkout.calculateOffset')}</h4>
      <div className="grid mt-3">
        <FeaturesInformationCard className="col-12 lg:col-5">
          <div>
            <h5>{t('checkout.offsetEmission.additionality.title')}</h5>
            <p>{t('checkout.offsetEmission.additionality.description')}</p>
          </div>
          <div>
            <h5>{t('checkout.offsetEmission.addToken.title')}</h5>
            <p>{t('checkout.offsetEmission.addToken.description')}</p>
          </div>
        </FeaturesInformationCard>
        <div className="col-12 lg:col-6 lg:col-offset-1">
          <CheckoutForm />
        </div>
      </div>
    </>
  );
};

export default OffsetEmission;
