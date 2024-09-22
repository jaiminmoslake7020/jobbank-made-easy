import React from 'react';
import {Button} from '../Button/Button';
import {FaIcon} from '../FaIcon/FaIcon';

export type ModalFooterPropTypes = {
    onCloseClick: () =>  void,
    title: string
};

export type ModalFooterWrapperPropTypes = {
    children: React.ReactNode
};


export const ModalFooterWrapper = (props: ModalFooterWrapperPropTypes) => {
    const {
        children
    } = props;
    return (
        <div className={"modal-footer"}>
            {children}
        </div>
    );
}

export const ModalFooterWithCloseButton = (props: ModalFooterWrapperPropTypes) => {
    const {
        children
    } = props;
    return (
        <ModalFooterWrapper>
            {children}
        </ModalFooterWrapper>
    );
}


export const ModalFooter = (props: ModalFooterPropTypes) => {
    const {
        title, onCloseClick
    } = props;
    return (
        <ModalFooterWrapper>
            <div className={"modal-title"}>
                <h4>{title}</h4>
            </div>
            <div className={"modal-close-wrapper"}>
                <Button type={"button"} onClick={onCloseClick}>
                    <FaIcon icon={"times"} />
                </Button>
                <Button type={"button"} onClick={onCloseClick}>
                    <FaIcon icon={"times"} />
                </Button>
            </div>
        </ModalFooterWrapper>
    );
}
