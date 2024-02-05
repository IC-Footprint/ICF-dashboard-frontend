import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import LinkButton from '@/components/LinkButton';
import useResources from '@/helpers/state/useResources';
import { FeaturesInformationCard } from '@/theme/styled-components';

const GreenEnergy: FC = () => {
  const { t } = useTranslation();
  const {
    actions: { loadGlobalConfiguration },
    globalConfiguration
  } = useResources();

  useEffect(() => {
    if (!globalConfiguration) {
      loadGlobalConfiguration();
    }
  }, [globalConfiguration, loadGlobalConfiguration]);

  return (
    <>
      <h4>{t('checkout.greenEnergy.description')}</h4>
      <div className="grid grid-nogutter">
        <FeaturesInformationCard className="col-12">
          <div className="grid">
            <div className="col-6">
              <h5>{t('checkout.greenEnergy.environmentalLeadership.title')}</h5>
              <p>
                {t('checkout.greenEnergy.environmentalLeadership.description')}
              </p>
            </div>
            <div className="col-6">
              <h5>{t('checkout.greenEnergy.enhancedReputation.title')}</h5>
              <p>{t('checkout.greenEnergy.enhancedReputation.description')}</p>
            </div>
            <div className="col-6">
              <h5>{t('checkout.greenEnergy.globalImpact.title')}</h5>
              <p>{t('checkout.greenEnergy.globalImpact.description')}</p>
            </div>
            <div className="col-6">
              <h5>{t('checkout.greenEnergy.regulatoryCompliance.title')}</h5>
              <p>
                {t('checkout.greenEnergy.regulatoryCompliance.description')}
              </p>
            </div>
          </div>
        </FeaturesInformationCard>
        <div className="col-12 flex justify-content-end mt-3">
          <LinkButton
            url={globalConfiguration?.links.greenEnergyQuote}
            label={t('checkout.greenEnergy.getQuote')}
          />
        </div>
      </div>
    </>
  );
};

export default GreenEnergy;
