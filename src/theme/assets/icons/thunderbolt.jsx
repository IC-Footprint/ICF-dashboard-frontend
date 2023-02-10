import React from 'react';

function Thunderbolt(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '100%';
	const height = props.height || '100%';
	const title = props.title || "thunderbolt";

	return (
		<svg height={height} width={width} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M25.4 62.3c-.4 0-.8-.1-1.3-.2-1.5-.6-2.3-2-2.1-3.6l2.4-20.3-7.5 1.5c-1.4.3-2.8-.3-3.5-1.5-.8-1.2-.7-2.7.1-3.8L35.9 3.2c.9-1.3 2.6-1.7 4-1.2 1.5.6 2.3 2 2.1 3.6l-2.9 21 7.8-1.9c1.4-.4 2.8.2 3.6 1.4.8 1.2.8 2.7-.1 3.9L28.1 60.8c-.6 1-1.7 1.5-2.7 1.5zm.3-28.9c.9 0 1.7.3 2.3.9.8.7 1.2 1.8 1.1 2.9L27 54.8l18.1-25-6.4 1.6c-1.1.3-2.3 0-3.1-.8-.8-.8-1.2-1.9-1.1-3L37 9.4 18.7 34.7l6.3-1.2c.2-.1.5-.1.7-.1zM39.6 5.8z"/>
	</g>
</svg>
	);
};

export default Thunderbolt;