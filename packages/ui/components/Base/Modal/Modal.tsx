import React, {useEffect, useRef} from 'react';
import './modal.scss';

export type ModalPropTypes = {
    modalKey: string,
    modalZIndex: number,
    isOpen: boolean,
    modalHeader?: React.ReactNode,
    modalBody?: React.ReactNode,
    modalFooter?: React.ReactNode,
    removeModal: Function
};

export type ModalBodyWrapperPropTypes = {
    children: React.ReactNode
};

export const ModalBodyWrapper = ({children}: ModalBodyWrapperPropTypes) => {
    return <div className={"modal-body"}>{children}</div>
}

export const Modal = (props: ModalPropTypes) => {
    const {
        isOpen, modalKey, modalHeader, modalBody, modalFooter, modalZIndex, removeModal
    } = props;

    const modalRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleEsc = (event: any) => {
            if (event.key === "Escape") {
                console.log("Escape key pressed!");
                removeModal(modalKey);
                // Perform the desired action, like closing a modal
            }
        };

        // Attach the event listener when the component mounts
        window.addEventListener("keydown", handleEsc);

        // Cleanup the event listener when the component unmounts
        return () => {
            window.removeEventListener("keydown", handleEsc);
        };
    }, [])

    return (
        isOpen ? <div ref={modalRef} className={`modal-wrapper modal-id-${modalKey} `} style={{
            zIndex: modalZIndex
        }} onClick={(e) => {
            const t = e.target;
            if (t !== null && (t as HTMLElement).classList.contains(`modal-id-${modalKey}`)) {
                removeModal(modalKey);
            }
        }} >
            <div className={"modal"}>
                {modalHeader}
                {modalBody}
                {modalFooter}
            </div>
        </div> : null
    );
}

