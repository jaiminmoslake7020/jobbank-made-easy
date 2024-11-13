import React, {useContext} from 'react';
import {ModalsContext, ModalsContextType} from 'ui';
import {ModalsList} from 'ui/components/Base/Modal';

export const ModalsListWrapper = () => {
    const {
        modals
    } = useContext(ModalsContext as React.Context<ModalsContextType>);
    return <ModalsList modals={modals} />;
}
