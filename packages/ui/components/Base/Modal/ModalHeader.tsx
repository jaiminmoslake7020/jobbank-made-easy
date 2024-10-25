import React from 'react';
import {Button, CloseButton} from '../Button/Button';
import {FaIcon} from '../FaIcon/FaIcon';

export type ModalHeaderPropTypes = {
    onCloseClick: () =>  void,
    title?: string
};

export type ModalHeaderWrapperPropTypes = {
    children: React.ReactNode
};

export const ModalHeaderWrapper = (props: ModalHeaderWrapperPropTypes) => {
    const {
        children
    } = props;
    return (
        <div className={"modal-header"}>
            {children}
        </div>
    );
}

export const ModalHeader = (props: ModalHeaderPropTypes) => {
    const {
        title, onCloseClick
    } = props;
    return (
        <ModalHeaderWrapper>
            {
                title ? <div className={"modal-title"}>
                    <h4>{title}</h4>
                </div> : null
            }
            <div className={"modal-close-wrapper"}>
                <CloseButton size={"sm"} round onClick={onCloseClick} />
            </div>
        </ModalHeaderWrapper>
    );
}

