import React from 'react';

function Tag(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '100%';
	const height = props.height || '100%';
	const title = props.title || "tag";

	return (
		<svg height={height} width={width} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M57.4 16.3c0-2.3-1.9-4.1-4.2-4.2l-8.8-.1C40.2 5.6 32.7-.7 21.3 1.1c-1.2.2-2.1 1.3-1.9 2.6.2 1.2 1.3 2.1 2.6 1.9C30 4.3 35.4 8 38.7 12l-6.3-.1h-.1c-1.1 0-2.2.5-3 1.2L8.1 34.2c-1.2 1.2-1.8 2.7-1.8 4.4s.6 3.2 1.8 4.4l18.3 18.3c1.2 1.2 2.8 1.8 4.4 1.8s3.2-.6 4.4-1.8l21.2-21.2c.8-.8 1.3-1.9 1.2-3.1l-.2-20.7zM32.1 58.2c-.7.7-1.8.7-2.5 0L11.3 39.9c-.3-.3-.5-.8-.5-1.2 0-.5.2-.9.5-1.2l21.2-21.2 9.4.2c.4.8.7 1.5 1 2.1-1.7 1-2.8 2.9-2.8 5 0 3.2 2.6 5.8 5.8 5.8s5.8-2.6 5.8-5.8c0-2.7-1.8-4.9-4.3-5.6-.2-.4-.3-.9-.5-1.3l6 .1.4 20.4-21.2 21zm13.7-36.1c.7 0 1.3.6 1.3 1.3s-.6 1.3-1.3 1.3-1.3-.6-1.3-1.3.6-1.3 1.3-1.3z"/>
	</g>
</svg>
	);
};

export default Tag;