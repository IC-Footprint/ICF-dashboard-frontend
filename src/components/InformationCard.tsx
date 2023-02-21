import type { FC } from 'react';

import { InformationCardContainer } from '@/theme/styled-components';

interface InformationCardProps {
  image: string;
  title: string;
  content: string;
}

const InformationCard: FC<InformationCardProps> = ({
  content,
  title,
  image
}) => {
  return (
    <InformationCardContainer>
      <img src={image} alt={`${title} Image`} />
      <h4>{title}</h4>
      <p>{content}</p>
    </InformationCardContainer>
  );
};

export default InformationCard;
