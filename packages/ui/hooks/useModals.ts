import React, {useCallback, useState} from 'react';
import {ModalPropTypes} from '../components/Base';

export const useModals = () => {

    const [modals, setModals] = useState<ModalPropTypes[]>([]);

    const addModal = useCallback((newModal:ModalPropTypes) => {
        setModals(prev => [...prev, newModal]);
    }, []);

    const removeModal = useCallback((removeModalKey: string) => {
        setModals(prev => prev.filter(({modalKey}) => modalKey !== removeModalKey));
    }, [modals]);

    return {
        addModal, removeModal, modals
    };
}
