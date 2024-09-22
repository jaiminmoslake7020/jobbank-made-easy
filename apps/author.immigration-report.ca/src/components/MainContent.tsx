import React, {ReactNode} from 'react';
import {
    Footer
} from "ui";
import {
    socialLinks
} from '../data'
import {ModalsListWrapper} from './ModalsListWrapper';
import HeaderWrapper from './HeaderWrapper';
import ThemeWrapper from './ThemeWrapper';

export type MainContentPropTypes = {
    pageNameClass: string,
    children: ReactNode
};

// eslint-disable-next-line react/display-name
const MainContent = (props: MainContentPropTypes) => {
    const {
        pageNameClass, children
    } = props;
    return (
        <ThemeWrapper>
            <HeaderWrapper />
            <main className={"main-content "+pageNameClass}>
                {children}
            </main>
            <Footer socialLinks={socialLinks} />
            <ModalsListWrapper />
        </ThemeWrapper>
    );
};

export default MainContent;
