import React, {useContext} from 'react';
import {ColorThemeSelector, SocialLinkType, ThemeType} from '../';
import { FaIcon } from '../FaIcon/FaIcon';
import {WebsiteInfo} from '../Footer/Footer';
import './sidebar.scss'
import { SocialLinks } from '../SocialiLinks/SocialLinks';
import {SidebarContext} from '../../../contexts';

export type SidebarPropTypes = {
    theme: string,
    setTheme: Function,
    nav: React.JSX.Element,
    themes: ThemeType[],
    socialLinks?: SocialLinkType[]
};

export const Sidebar = (props: SidebarPropTypes) => {
    const {
        theme,
        setTheme,
        nav,
        themes,
        socialLinks
    } = props;

    const { sidebar, showSidebar } = useContext(SidebarContext);

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
            { socialLinks && <SocialLinks socialLinks={socialLinks} /> }
            <WebsiteInfo />
        </aside>
    );
}
