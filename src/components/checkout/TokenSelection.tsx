import styled from '@emotion/styled';
import { Button } from 'primereact/button';
import { OverlayPanel } from 'primereact/overlaypanel';
import { useRef, useMemo } from 'react';
import { useTranslation } from 'react-i18next';

import type { MenuItem } from 'primereact/menuitem';
import type { FC, MutableRefObject } from 'react';
import type { TokenType } from '@/models/payment/payment-data-model';

import { emptyPaymentModel } from '@/models/payment/payment-data-model';
import usePayment from '@/helpers/state/usePayment';
import cawaTechLogo from '@/theme/assets/tokens-logos/cawa-tech-logo.png';

const StyledOverlayPanel = styled(OverlayPanel)`
  margin: 0;
  background-color: #16263d;
  border: none;

  .p-overlaypanel-content {
    padding: 0;
  }
`;

const OverlayItemContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 1rem;
  column-gap: 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #2b3d56;
    border-radius: 0.5rem;
  }

  &.active-token {
    color: var(--primary-color);
  }
`;

interface TokenSelectionProps {
  disabled?: boolean;
}

const TokenSelection: FC<TokenSelectionProps> = ({ disabled }) => {
  const { t } = useTranslation();
  const {
    actions: { setPayment },
    payment
  } = usePayment();
  const overlayRef: MutableRefObject<OverlayPanel | null> = useRef(null);

  // TODO: Replace with real tokens list
  const tokensList = useMemo((): MenuItem[] => {
    return [
      {
        id: 'CAWATECH',
        label: 'CAWA TECH',
        icon: cawaTechLogo
      }
    ];
  }, []);

  const currentToken = useMemo(() => {
    return tokensList.find((token) => token.id === payment?.tokenType) ?? null;
  }, [tokensList, payment?.tokenType]);

  const updateToken = (token: MenuItem) => {
    const paymentData = payment ?? emptyPaymentModel();
    setPayment({ ...paymentData, tokenType: token.id as TokenType });
    overlayRef.current?.hide();
  };

  return (
    <>
      <Button
        className="focus:shadow-none border-noround-left"
        type="button"
        text
        onClick={(e) => overlayRef.current?.toggle(e)}
        disabled={disabled}
      >
        {currentToken?.label}
        <i className="pi pi-chevron-down ml-2 text-xs"></i>
      </Button>
      <StyledOverlayPanel ref={overlayRef}>
        {tokensList.map((token) => (
          <OverlayItemContainer
            className={`p-3 cursor-pointer ${
              token.id === currentToken?.id ? 'active-token' : ''
            }`}
            key={token.label}
            onClick={() => updateToken(token)}
          >
            <img className="w-1rem" src={token.icon} alt={token.label}></img>
            <span>{token.label}</span>
          </OverlayItemContainer>
        ))}
        <a
          href=""
          target="_blank"
          rel="noopener noreferrer"
          className="text-color no-underline"
        >
          <OverlayItemContainer>
            <i className="pi pi-plus-circle"></i>
            <span>{t('checkout.form.addNewToken.label')}</span>
          </OverlayItemContainer>
        </a>
      </StyledOverlayPanel>
    </>
  );
};

export default TokenSelection;
