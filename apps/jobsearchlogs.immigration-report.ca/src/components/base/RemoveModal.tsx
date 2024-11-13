import React, {useContext, useEffect} from 'react';
import {ModalsContext, ModalsContextType} from 'ui';

export type RemoveModalPropTypes = {
    modalKey: string
};

const RemoveModal = (props: RemoveModalPropTypes) => {
    const {
        modalKey
    } = props;

    const {
        removeModal
    } = useContext(ModalsContext as React.Context<ModalsContextType>);

    useEffect(() => {
        const mount = () => {
            removeModal(modalKey);
        }
        return mount();
    }, [modalKey, removeModal])

    return (
        <div className={"removeModal"}></div>
    );
}

export default RemoveModal;
