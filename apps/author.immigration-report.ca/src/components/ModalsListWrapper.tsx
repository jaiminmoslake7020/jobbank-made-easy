import React, {useContext} from 'react';
import {ModalsContext} from 'ui';
import dynamic from 'next/dynamic';

const ModalsListWithNoSSR = dynamic(() => import('ui/components/Base/Modal/ModalsList'), {
    ssr: false,
});

export const ModalsListWrapper = () => {
    const {
        modals
    } = useContext(ModalsContext);
    return <ModalsListWithNoSSR modals={modals} />;
}
