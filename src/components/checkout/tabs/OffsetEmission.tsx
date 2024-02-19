import styled from '@emotion/styled';
import { useTranslation } from 'react-i18next';

import type { FC } from 'react';

import CheckoutForm from '@/components/checkout/CheckoutForm';
import { disabledColor } from '@/theme/colors';
import { FeaturesInformationCard } from '@/theme/styled-components';

interface OffsetEmissionProps {
  isPaymentUnsupported?: boolean;
}

const MessageOverlayContainer = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 0;
  z-index: 1000;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${disabledColor};
  margin: 0 -1rem -1rem -1rem;
  border-radius: 0.675rem;
  pointer-events: none;
`;

const OffsetEmission: FC<OffsetEmissionProps> = ({ isPaymentUnsupported }) => {
  const { t } = useTranslation();
  return (
    <>
      <h4>{t('checkout.calculateOffset')}</h4>
      <div className="grid grid-nogutter">
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
        <div className="col-12 lg:col-6 lg:col-offset-1 relative">
          <CheckoutForm />
          {isPaymentUnsupported ? (
            <MessageOverlayContainer>
              <h2 className="text-primary">
                {t('common.featureStatus.comingSoon')}
              </h2>
            </MessageOverlayContainer>
          ) : null}
        </div>
      </div>
    </>
  );
};

export default OffsetEmission;
