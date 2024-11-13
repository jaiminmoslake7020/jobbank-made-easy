import React, {useContext} from 'react';
import {ThemeType} from '../';
import { FaIcon } from '../FaIcon/FaIcon';
import { Sidebar } from '../Sidebar/Sidebar';
import './header.scss'
import UserComponent, {UserComponentPropTypes} from '../UserComponent/UserComponent';
import {Logo, LogoObjectType} from '../Logo/Logo';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import {SidebarContext} from '../../../contexts';


export type HeaderPropTypes = {
    theme: string,
    setTheme: Function,
    nav: React.JSX.Element,
    themes: ThemeType[],
    userComponent?: UserComponentPropTypes,
    logoObject: LogoObjectType,
    logoUrl: string
};

export const Header = (props: HeaderPropTypes) => {
    const {
        setTheme,
        theme,
        nav,
        themes,
        userComponent,
        logoObject,
        logoUrl
    } = props;

    const { showSidebar } = useContext(SidebarContext);

    return (
        <>
            <header className={"main-header"} >
                <div className={"logo-wrapper"}>
                    <Logo logoObject={logoObject} logoUrl={logoUrl} />
                </div>
                <div className={"nav-wrapper"}>
                    {nav}
                </div>
                <div className={"theme-switcher-wrapper"}>
                    <ThemeSwitcher theme={theme} setTheme={setTheme} />
                </div>
                { userComponent && <UserComponent {...userComponent} /> }
                <button type={"button"} className={"btn sidebar-opener"}
                    onClick={() => {
                        showSidebar(true);
                    }}
                >
                    <FaIcon icon={"bars"} />
                </button>
            </header>
            <Sidebar themes={themes} theme={theme} setTheme={setTheme} nav={nav} userComponent={userComponent} />
        </>
    );
}

