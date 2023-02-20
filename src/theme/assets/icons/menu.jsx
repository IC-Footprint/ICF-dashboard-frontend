import React from 'react';

function Menu(props) {
	const fill = props.fill || 'currentColor';
	const secondaryfill = props.secondaryfill || fill;
	const strokewidth = props.strokewidth || 1;
	const width = props.width || '100%';
	const height = props.height || '100%';
	const title = props.title || "menu";

	return (
		<svg height={height} width={width} viewBox="0 0 64 64" xmlns="http://www.w3.org/2000/svg">
	<title>{title}</title>
	<g fill={fill}>
		<path d="M60 29.8H4c-1.2 0-2.3 1-2.3 2.3 0 1.2 1 2.3 2.3 2.3h56c1.2 0 2.3-1 2.3-2.3 0-1.3-1.1-2.3-2.3-2.3z"/>
		<path d="M60 46.8H4c-1.2 0-2.3 1-2.3 2.3s1 2.3 2.3 2.3h56c1.2 0 2.3-1 2.3-2.3s-1.1-2.3-2.3-2.3z"/>
		<path d="M4 17.2h56c1.2 0 2.3-1 2.3-2.3s-1-2.3-2.3-2.3H4c-1.2 0-2.3 1-2.3 2.3s1.1 2.3 2.3 2.3z"/>
	</g>
</svg>
	);
};

export default Menu;