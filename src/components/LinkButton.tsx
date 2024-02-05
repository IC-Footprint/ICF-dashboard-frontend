import type { FC } from 'react';

interface ButtonLinkProps {
  url?: string;
  label: string;
}

const LinkButton: FC<ButtonLinkProps> = ({ url, label }) => {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="p-button p-button-sm no-underline font-bold"
    >
      {label}
    </a>
  );
};

export default LinkButton;
