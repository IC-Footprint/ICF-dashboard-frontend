import { Card } from 'primereact/card';

import styled from '@emotion/styled';

import icBackground from '@/theme/assets/ic-background.png';
import { gridCardBackground } from '@/theme/colors';
import { LabelStyle, FlexRowCard } from '@/theme/styled-components';

export const AccountCard = styled(Card)`
  background-color: ${gridCardBackground};

  .p-card-content {
    display: flex;
    flex-direction: column;
    row-gap: 2rem;
    padding: 0.5rem;
  }
`;

export const AddNewItemCard = styled(Card)`
  background-color: rgb(255 255 255 / 0.04);
  height: 100%;
  border: 2px dotted rgb(255 255 255 / 0.2);
  color: #86e7d4;
  font-weight: bold;

  .p-card-body {
    height: 100%;
  }

  .p-card-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 20px;
    height: 100%;
  }
`;

export const AddNewItemIcon = styled.div`
  height: 32px;
  width: 32px;
  border-radius: 8px;
  border: 1px solid #86e7d4;
`;

export const InformationItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 0;

  h4 {
    ${LabelStyle};
  }

  p {
    font-weight: bold;
  }
`;

export const OperatorIcon = styled.img`
  flex-grow: 1;
  max-height: 2rem;
  max-width: 4rem;
`;

export const ModalContainer = styled.div`
  width: 720px;
  height: 96vh;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 28px;
  background-color: #141f31;
  border-radius: 16px;
  box-shadow: 0px 8px 24px rgba(0, 0, 0, 0.15);
  padding: 32px;
  position: relative;
`;

export const ModalSectionTitle = styled.h3`
  font-size: 18px;
  font-weight: normal;
`;

export const Socials = styled.div`
  display: flex;
  justify-content: 'space-between';
  align-items: center;
  gap: 24px;
`;

export const AccountsSectionButton = styled.button`
  padding: 8px;
  display: flex;
  border-radius: 8px;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  background-color: #353e4d;
  border: none;

  img {
    width: 20px;
    height: 20px;
  }
`;
export const CardContainer = styled(FlexRowCard)`
  height: 100%;
  .p-card-body {
    height: 100%;

    .p-card-content {
      height: 100%;
      justify-content: space-between;
    }
  }
`;
export const CardContainerWithBackground = styled(FlexRowCard)`
  height: 100%;
  background-image: url(${icBackground});
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;

  .p-card-body {
    height: 100%;

    .p-card-content {
      height: 100%;
    }
  }
`;
