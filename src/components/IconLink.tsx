import styled from '@emotion/styled';

import type { IconModel } from '@/models/dashboard/dashboard-carousel-item-model';
import type { FC } from 'react';

export interface IconLinkProps {
  iconData: IconModel;
}

const IconImage = styled.img`
  width: 2rem;
`;

const IconLink: FC<IconLinkProps> = ({ iconData }) => {
  return (
    <a
      key={iconData.icon}
      href={iconData.url}
      target="_blank"
      rel="noopener noreferrer"
    >
      <IconImage src={iconData.icon} alt={iconData.name} />
    </a>
  );
};

export default IconLink;
