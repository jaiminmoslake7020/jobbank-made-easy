import React, {useRef} from 'react';
import './modal.scss';

export type ModalPropTypes = {
    modalKey: string,
    modalZIndex: number,
    isOpen: boolean,
    modalHeader?: React.ReactNode,
    modalBody?: React.ReactNode,
    modalFooter?: React.ReactNode,
};

export type ModalBodyWrapperPropTypes = {
    children: React.ReactNode
};

export const ModalBodyWrapper = ({children}: ModalBodyWrapperPropTypes) => {
    return <div className={"modal-body"}>{children}</div>
}

export const Modal = (props: ModalPropTypes) => {
    const {
        isOpen, modalKey, modalHeader, modalBody, modalFooter, modalZIndex
    } = props;

    const modalRef = useRef<HTMLDivElement>(null);

    return (
        isOpen ? <div ref={modalRef} className={`modal-wrapper modal-id-${modalKey} `} style={{
            zIndex: modalZIndex
        }}  >
            <div className={"modal"}>
                {modalHeader}
                {modalBody}
                {modalFooter}
            </div>
        </div> : null
    );
}

