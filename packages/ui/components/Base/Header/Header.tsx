import React, {useState} from 'react';
import {ColorThemeSelector, ThemeType} from '../';
import { FaIcon } from '../FaIcon/FaIcon';
import { Sidebar } from '../Sidebar/Sidebar';
import './header.scss'
import UserComponent, {UserComponentPropTypes} from '../UserComponent/UserComponent';
import {Logo, LogoObjectType} from '../Logo/Logo';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';


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

    const [sidebar, showSidebar] = useState<boolean>(false);

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
            <Sidebar themes={themes} sidebar={sidebar} showSidebar={showSidebar} theme={theme} setTheme={setTheme} nav={nav} />
        </>
    );
}

