import React from 'react';

function Cube(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '100%';
	const height = props.height || '100%';
	const title = props.title || "cube";

	return (
		<svg height={height} width={width} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M59.7 14.9c0-.1-.1-.1-.1-.2-.7-1-1.7-1.9-2.9-2.4L35.1 2.4c-2-.9-4.2-.9-6.2 0L7.4 12.3c-1.2.5-2.1 1.4-2.9 2.3l-.3.3c0 .1-.1.1-.1.2C3.4 16.3 3 17.6 3 19v25c0 2.8 1.6 5.4 4.1 6.6l21.5 10.8c1 .5 2.2.8 3.3.8 1.1 0 2.3-.3 3.3-.8l21.5-10.8c2.5-1.3 4.1-3.8 4.1-6.6V19c.2-1.5-.3-2.9-1.1-4.1zM30.8 6.5c.4-.2.8-.3 1.2-.3.4 0 .8.1 1.2.3l20.2 9.3L32 26.3 10.6 15.8l20.2-9.3zM9.1 46.6c-1-.5-1.6-1.5-1.6-2.6V19.3l22.2 10.9V57L9.1 46.6zm45.8 0L34.2 57V30.2l22.2-10.9V44c.1 1.1-.6 2.1-1.5 2.6z"/>
	</g>
</svg>
	);
};

export default Cube;