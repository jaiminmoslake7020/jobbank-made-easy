import React from 'react';
import FaIcon from '../FaIcon/FaIcon';
import './alert.scss'

export type AlertType = 'error' | 'info' | 'warning' | 'success';
export type AlertPropTypes = {
    type: AlertType,
    message: string,
    error?: any
};

export const getIcon= (type: AlertType) => {
    switch (type){
        case 'error':
            return 'xmark';
        case 'info':
            return 'circle-exclamation';
        case 'warning':
            return 'triangle-exclamation';
        case 'success':
            return 'check';
        default:
           return 'xmark';
    }
    return 'xmark';
}

const Alert = (props: AlertPropTypes) => {
    const {
        type,
        message
    } = props;
    return (
        <div className={`alert alert-${type} `}>
            <div className={"icon-box"}>
                <FaIcon icon={getIcon(type)} />
            </div>
            <div className={"message"}>
                <p>{message}</p>
            </div>
        </div>
    );
}

export default Alert;
