import React from 'react';
import ColorThemeSelector, {ThemeType} from '../ColorThemeSelector/ColorThemeSelector';
import FaIcon from '../FaIcon/FaIcon';
import {WebsiteInfo} from '../Footer/Footer';
import './sidebar.scss'

export type SidebarPropTypes = {
    sidebar: boolean,
    showSidebar: Function,
    theme: string,
    setTheme: Function,
    nav: React.JSX.Element,
    themes: ThemeType[]
};

const Sidebar = (props: SidebarPropTypes) => {
    const {
        sidebar,
        showSidebar,
        theme,
        setTheme,
        nav,
        themes
    } = props;
    return (
        <aside className={`sidebar ${sidebar ? 'open' : ''} `}>
            <div className={"sidebar-control-wrapper"}>
                <button type={"button"} className={"btn sidebar-closer"}
                    onClick={() => {
                        showSidebar(false);
                    }}
                >
                    <FaIcon icon={"close"} />
                </button>
            </div>
            {nav}
            <ColorThemeSelector themes={themes} theme={theme} setTheme={setTheme} />
            <WebsiteInfo />
        </aside>
    );
}

export default Sidebar;
