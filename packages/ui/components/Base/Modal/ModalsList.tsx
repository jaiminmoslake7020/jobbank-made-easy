import React from 'react';
import {Modal, ModalPropTypes} from './Modal';

export type ModalsListPropTypes = {
    modals: ModalPropTypes[]
};

export const ModalsList = (props: ModalsListPropTypes) => {
    const {
        modals
    } = props;
    return (
        <>{modals.map(({ modalKey ,...modalData}) => <Modal key={modalKey} modalKey={modalKey} {...modalData} />)}</>
    );
}

