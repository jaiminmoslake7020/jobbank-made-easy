import React from 'react';
import Nav from './Nav';
import ColorThemeSelector from './ColorThemeSelector';
import FaIcon from './FaIcon';
import SocialLinks from './SocialLinks';
import {WebsiteInfo} from './Footer';

export type SidebarPropTypes = {
    sidebar: boolean,
    showSidebar: Function,
    theme: string,
    setTheme: Function
};

const Sidebar = (props: SidebarPropTypes) => {
    const {
        sidebar,
        showSidebar,
        theme,
        setTheme
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
            <Nav showSidebar={showSidebar} />
            <ColorThemeSelector theme={theme} setTheme={setTheme} />
            <SocialLinks />
            <WebsiteInfo />
        </aside>
    );
}

export default Sidebar;
