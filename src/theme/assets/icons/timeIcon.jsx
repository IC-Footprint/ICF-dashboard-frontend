import React from 'react';

function TimeIcon(props) {
    const fill = props.fill || 'currentColor';
    const secondaryfill = props.secondaryfill || fill;
    const strokewidth = props.strokewidth || 1;
    const width = props.width || '100%';
    const height = props.height || '100%';
    const title = props.title || "time";

    return (
        <svg height={height} width={width} viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <title>{title}</title>
            <g fill={fill}>
                <path d="M12,0C5.383,0,0,5.383,0,12s5.383,12,12,12s12-5.383,12-12S18.617,0,12,0z M12,22C6.486,22,2,17.514,2,12 S6.486,2,12,2s10,4.486,10,10S17.514,22,12,22z" />
                <path d="M15.707,14.293L13,11.586V6c0-0.552-0.448-1-1-1s-1,0.448-1,1v6c0,0.265,0.105,0.52,0.293,0.707l3,3 C14.488,15.902,14.744,16,15,16s0.512-0.098,0.707-0.293C16.098,15.316,16.098,14.684,15.707,14.293z" />
            </g>
        </svg>
    );
}

export default TimeIcon;
