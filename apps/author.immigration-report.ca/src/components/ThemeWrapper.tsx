import React, {useContext} from 'react';
import {ModalsContext, ThemeContext} from 'ui';

export type ThemeWrapperPropTypes = {
    children: React.ReactNode
};

const ThemeWrapper = (props: ThemeWrapperPropTypes) => {
    const {
        children
    } = props;

    const { theme } = useContext(ThemeContext);
    const {
        modals
    } = useContext(ModalsContext);
    const hasModalsClass = modals.length > 0 ? 'body-modal-open' : '';

    return (
        <div data-theme={theme} className={`App ${hasModalsClass} `}>{children}</div>
    );
}

export default ThemeWrapper;
