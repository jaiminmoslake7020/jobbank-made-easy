import React, {ReactNode, ReactElement, useContext} from 'react';
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
import { menuLinksFooter, menuLinksHeader, themes } from '../../data';
import { ModalsListWrapper } from './ModalsListWrapper'
import {LoginRequiredModal} from './LoginRequiredModal';

export type MainContentPropTypes = {
    pageNameClass: string,
    children: ReactNode | ReactElement
};

const MainContent = (props: MainContentPropTypes) => {
    const {
        pageNameClass, children
    } = props;

    const { theme, setTheme } = useContext(ThemeContext);
    const { appSession, removeSessionCall } = useContext(SessionContext);
    const isDev = process.env.NODE_ENV !== 'production';
    const needsToBeAuthenticated = pageNameClass.includes('authenticated-page');
    return (
        <div data-theme={theme} className="App">
            <Header
                logoUrl={ isDev ? 'http://localhost:3005/' : 'https://joblogs.immigration-report.ca' }
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
                {
                    appSession === null && needsToBeAuthenticated ?
                        <div className={"w-screen min-h-[80vh] flex justify-center items-center"}>
                            <p>Please Login!</p>
                        </div>
                        : <>
                            {children}
                        </>
                }
            </main>
            <Footer nav={<Nav menuLinks={menuLinksFooter} />} />
            <ModalsListWrapper />
            <LoginRequiredModal />
        </div>
    );
}

export default MainContent;
