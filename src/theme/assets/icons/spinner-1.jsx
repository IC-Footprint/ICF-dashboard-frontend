import React from 'react';

function Spinner1(props) {
  const fill = props.fill || 'currentColor';
  const secondaryfill = props.secondaryfill || fill;
  const strokewidth = props.strokewidth || 1;
  const width = props.width || '100%';
  const height = props.height || '100%';
  const title = props.title || 'spinner 1';

  return (
    <svg
      height={height}
      width={width}
      viewBox="0 0 64 64"
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>{title}</title>
      <g fill={fill}>
        <path d="M32 1.8c-1.2 0-2.3 1-2.3 2.3v15.6c0 1.2 1 2.3 2.3 2.3 1.2 0 2.3-1 2.3-2.3V4c0-1.2-1.1-2.2-2.3-2.2z" />
        <path d="M32 42.1c-1.2 0-2.3 1-2.3 2.3V60c0 1.2 1 2.3 2.3 2.3 1.2 0 2.3-1 2.3-2.3V44.4c0-1.3-1.1-2.3-2.3-2.3z" />
        <path d="M21.9 32c0-1.2-1-2.3-2.3-2.3H4c-1.2 0-2.3 1-2.3 2.3 0 1.2 1 2.3 2.3 2.3h15.6c1.3 0 2.3-1.1 2.3-2.3z" />
        <path d="M60 29.8H44.4c-1.2 0-2.3 1-2.3 2.3 0 1.2 1 2.3 2.3 2.3H60c1.2 0 2.3-1 2.3-2.3 0-1.3-1.1-2.3-2.3-2.3z" />
        <path d="M40.8 25.5c.6 0 1.2-.2 1.6-.7l11-11c.9-.9.9-2.3 0-3.2-.9-.9-2.3-.9-3.2 0l-11 11c-.9.9-.9 2.3 0 3.2.4.5 1 .7 1.6.7z" />
        <path d="M21.7 39.2l-11 11c-.9.9-.9 2.3 0 3.2.4.4 1 .7 1.6.7s1.2-.2 1.6-.7l11-11c.9-.9.9-2.3 0-3.2-.9-.9-2.4-.9-3.2 0z" />
        <path d="M42.3 39.2c-.9-.9-2.3-.9-3.2 0s-.9 2.3 0 3.2l11 11c.4.4 1 .7 1.6.7s1.2-.2 1.6-.7c.9-.9.9-2.3 0-3.2l-11-11z" />
        <path d="M13.8 10.6c-.9-.9-2.3-.9-3.2 0-.9.9-.9 2.3 0 3.2l11 11c.4.4 1 .7 1.6.7s1.2-.2 1.6-.7c.9-.9.9-2.3 0-3.2l-11-11z" />
      </g>
    </svg>
  );
}

export default Spinner1;
