import { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import useResources from '@/helpers/state/useResources';
import { FeaturesInformationCard } from '@/theme/styled-components';

const PriorCommitment: FC = () => {
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
      <h4>{t('checkout.priorCommitment.description')}</h4>
      <div className="grid grid-nogutter">
        <FeaturesInformationCard className="col-12">
          <div className="grid">
            <div className="col-6">
              <h5>
                {t('checkout.priorCommitment.renewableEnergyPurchases.title')}
              </h5>
              <p>
                {t(
                  'checkout.priorCommitment.renewableEnergyPurchases.description'
                )}
              </p>
            </div>
            <div className="col-6">
              <h5>{t('checkout.priorCommitment.other.title')}</h5>
              <p>{t('checkout.priorCommitment.other.description')}</p>
            </div>
          </div>
        </FeaturesInformationCard>
        <div className="col-12 flex justify-content-end mt-3">
          <a
            href={globalConfiguration?.links.priorCommitmentForm}
            target="_blank"
            rel="noopener noreferrer"
            className="p-button p-button-sm no-underline font-bold"
          >
            {t('checkout.priorCommitment.startForm')}
          </a>
        </div>
      </div>
    </>
  );
};

export default PriorCommitment;
