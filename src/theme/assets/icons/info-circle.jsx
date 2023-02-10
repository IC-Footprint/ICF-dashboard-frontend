import React from 'react';

function InfoCircle(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '100%';
	const height = props.height || '100%';
	const title = props.title || "info circle";

	return (
		<svg height={height} width={width} viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M32.9 20.1h-.1c-1.2 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3h.1c1.2 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3z"/>
		<path d="M32.9 28c-1.2 0-2.3 1-2.3 2.3v15.4c0 1.2 1 2.3 2.3 2.3 1.2 0 2.3-1 2.3-2.3V30.2c0-1.2-1-2.2-2.3-2.2z"/>
		<path d="M32.9 2.8C16.2 2.8 2.6 16.3 2.6 33s13.6 30.3 30.3 30.3c16.7 0 30.2-13.6 30.2-30.3S49.6 2.8 32.9 2.8zm0 56C18.7 58.8 7.1 47.2 7.1 33c0-14.2 11.6-25.8 25.8-25.8S58.6 18.8 58.6 33c0 14.2-11.5 25.8-25.7 25.8z"/>
	</g>
</svg>
	);
};

export default InfoCircle;