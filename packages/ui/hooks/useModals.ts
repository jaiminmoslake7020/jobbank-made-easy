import React, {useCallback, useState} from 'react';
import {ModalPropTypes} from '../components/Base';

export const useModals = () => {

    const [modals, setModals] = useState<ModalPropTypes[]>([]);

    const addModal = useCallback((newModal:ModalPropTypes) => {
        setModals(prev => [...prev, newModal]);
    }, []);

    const upsertModal = useCallback((newModal:ModalPropTypes) => {
        setModals(prev => {
            const isModalExistsInner = prev.filter((item) => item.modalKey === newModal.modalKey).length > 0
            if (isModalExistsInner) {
                return prev;
            } else {
                return [...prev, newModal];
            }
        });
    }, []);

    const removeModal = useCallback((removeModalKey: string) => {
        setModals(prev => prev.filter(({modalKey}) => modalKey !== removeModalKey));
    }, []);

    return {
        addModal, removeModal, modals, upsertModal
    };
}
