import React, {useContext, useEffect} from 'react';
import {ModalPropTypes, ModalsContext, ModalsContextType} from 'ui';


const ModalApp = (props: ModalPropTypes) => {
    const {
        isOpen, modalKey, modalStyleClass,
        modalZIndex, modalHeader, modalFooter,
        modalBody, removeModal
    } = props;

    const {
        upsertModal,
    } = useContext(ModalsContext as React.Context<ModalsContextType>);

    useEffect(() => {
        upsertModal({
            isOpen,
            modalKey,
            modalStyleClass,
            modalZIndex,
            removeModal,
            modalHeader,
            modalFooter,
            modalBody
        });
    }, [isOpen, modalBody, modalFooter, modalHeader, modalKey, modalStyleClass, modalZIndex, removeModal, upsertModal]);
    // not adding upsertModal as we are doing it on useEffect and useEffect will get re-render if

    return (
        <div className={"modal-added-here"}></div>
    );
}

export default ModalApp;
