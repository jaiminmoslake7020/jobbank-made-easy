import React from 'react';
import {
    FontAwesomeIconProps
} from '@fortawesome/react-fontawesome';

const FaIcon = (props: FontAwesomeIconProps) => {
    const {
        icon,
        className,
        size
    } = props;

    let iconClass = '' ;
    if (Array.isArray(icon)) {
        if (icon.includes('fab')) {
            iconClass += ` fa-brands `;
        }
        iconClass += `fa-${icon[1]}`;
    } else {
        iconClass = `fas fa-${icon}`
    }

    const sizeClass = size ? `fa-${size}` : '';

    return (
        <i className={iconClass+' '+className+' '+sizeClass} ></i>
    );
}

export default FaIcon;
