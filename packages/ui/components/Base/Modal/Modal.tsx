import React, {useRef} from 'react';
import './modal.scss';
import {Fireworks} from '../../Animations';

export type ModalPropTypes = {
    modalKey: string,
    modalStyleClass?: string,
    modalZIndex: number,
    isOpen: boolean,
    modalHeader?: React.ReactNode | React.ReactElement | React.JSX.Element,
    modalBody?: React.ReactNode | React.ReactElement | React.JSX.Element,
    modalFooter?: React.ReactNode | React.ReactElement | React.JSX.Element,
    removeModal: Function,
    hasFireworksBg?: boolean,
};

export type ModalBodyWrapperPropTypes = {
    children: React.ReactNode | React.ReactElement | React.JSX.Element
};

export const ModalBodyWrapper = ({children}: ModalBodyWrapperPropTypes) => {
    return <div className={"modal-body"}>{children}</div>
}

export const Modal = (props: ModalPropTypes) => {
    const {
        isOpen, modalKey, modalHeader, modalBody, modalFooter, modalZIndex, removeModal, hasFireworksBg, modalStyleClass
    } = props;

    const modalRef = useRef<HTMLDivElement>(null);

    return (
        isOpen ? <div ref={modalRef} className={`modal-wrapper modal-id-${modalKey} ${modalStyleClass || ''} `} style={{
            zIndex: modalZIndex
        }} onClick={(e) => {
            const t = e.target;
            if (t !== null && (t as HTMLElement).classList.contains(`modal-id-${modalKey}`)) {
                removeModal(modalKey);
            }
        }} >
            {
                hasFireworksBg && <Fireworks numberOfExplosions={50} zIndex={-1} onClick={() => {
                    removeModal(modalKey);
                }} />
            }
            <div className={"modal"}>
                {modalHeader}
                {modalBody}
                {modalFooter}
            </div>
        </div> : null
    );
}

