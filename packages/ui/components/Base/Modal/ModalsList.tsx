'use client';
import React from 'react';
import {Modal, ModalPropTypes} from './Modal';
import ReactDOM from 'react-dom';

export type ModalsListPropTypes = {
    modals: ModalPropTypes[]
};

export const ModalsList = (props: ModalsListPropTypes) => {
    const {
        modals
    } = props;

    let modalRoot = document.getElementById('modal-root');
    if (modalRoot === null) {
        const el = document.createElement('div');
        el.id = 'modal-root';
        document.body.appendChild(el);
        modalRoot = document.getElementById('modal-root');
    } else {
        modalRoot = document.getElementById('modal-root');
    }

    return (
        <>{modals.map(({ modalKey ,...modalData}) => ReactDOM.createPortal(<Modal key={modalKey} modalKey={modalKey} {...modalData} />, modalRoot as Element))}</>
    );
}

export default ModalsList;
