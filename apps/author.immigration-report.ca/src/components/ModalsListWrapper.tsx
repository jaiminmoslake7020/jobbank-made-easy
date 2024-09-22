import React, {useContext} from 'react';
import {ModalsContext} from 'ui';
import {ModalsList} from 'ui/components/Base/Modal';

export const ModalsListWrapper = () => {
    const {
        modals
    } = useContext(ModalsContext);
    return <ModalsList modals={modals} />;
}
