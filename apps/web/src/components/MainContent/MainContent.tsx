import React, {useEffect, useState, ReactNode, useContext} from 'react';
import Nav from './Nav'
import {
    Header, Footer
} from "ui";
import {getLoginHref} from '../../utils/login';
import SessionHandler from '../SessionHandler/SessionHandler';
import SessionContext from '../../contexts/SessionContext';
import ThemeContext from '../../contexts/ThemeContext';
import darkColourUrl from '../../assets/logo/job.png';
import lightColourUrl from '../../assets/logo/job-inverse.png';

export type MainContentPropTypes = {
    pageNameClass: string,
    children: ReactNode
};

const menuLinksHeader = [
    {
        label: "Home",
        href: "/",
    },
];

const menuLinksFooter = [
    {
        label: "Privacy",
        href: "/privacy-policy",
    },
    {
        label: "Terms Of Service",
        href: "/terms-of-service",
    },
];

const themes = [
    {
        btnLabel: 'Light',
        btnTheme: 'light'
    },
    {
        btnLabel: 'Dark',
        btnTheme: 'dark'
    }
];

const MainContent = (props: MainContentPropTypes) => {
    const {
        pageNameClass, children
    } = props;

    const { theme, setTheme } = useContext(ThemeContext);
    const { appSession, removeSessionCall } = useContext(SessionContext);

    return (
        <div data-theme={theme} className="App">
            <Header
                logoObject={{
                    lightColourUrl,
                    darkColourUrl
                }}
                themes={themes}
                theme={theme}
                setTheme={(x:string) => {
                    setTheme(x);
                }}
                nav={<Nav menuLinks={menuLinksHeader} /> }
                userComponent={
                    {
                        user: appSession ? {
                            name: appSession.name,
                            email: appSession.email
                        } : undefined,
                        loginHref: getLoginHref(),
                        onLogout: removeSessionCall
                    }
                }
            />
            <main className={"main-content "+pageNameClass}>
                <SessionHandler />
                {children}
            </main>
            <Footer nav={<Nav menuLinks={menuLinksFooter} />} />
        </div>
    );
}

export default MainContent;
