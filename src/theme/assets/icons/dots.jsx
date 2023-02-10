import React from 'react';

function Dots(props) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '100%';
  const height = props.height || '100%';
  const title = props.title || 'dots';

  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill={fill}>
        <path d="M32 31.9c-7.7 0-13.9-6.2-13.9-13.9S24.3 4.1 32 4.1 45.9 10.3 45.9 18 39.7 31.9 32 31.9zm0-23.3c-5.2 0-9.4 4.2-9.4 9.4s4.2 9.4 9.4 9.4 9.4-4.2 9.4-9.4-4.2-9.4-9.4-9.4z" />
        <path d="M48.3 59.9c-7.7 0-13.9-6.2-13.9-13.9s6.2-13.9 13.9-13.9 14 6.2 14 13.9-6.3 13.9-14 13.9zm0-23.3c-5.2 0-9.4 4.2-9.4 9.4s4.2 9.4 9.4 9.4 9.4-4.2 9.4-9.4-4.2-9.4-9.4-9.4z" />
        <path d="M15.7 59.9C8 59.9 1.8 53.7 1.8 46S8 32.1 15.7 32.1 29.6 38.3 29.6 46s-6.2 13.9-13.9 13.9zm0-23.3c-5.2 0-9.4 4.2-9.4 9.4s4.2 9.4 9.4 9.4 9.4-4.2 9.4-9.4-4.2-9.4-9.4-9.4z" />
      </g>
    </svg>
  );
}

export default Dots;
