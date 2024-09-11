import React, {useState} from 'react';
import ColorThemeSelector, {ThemeType} from '../ColorThemeSelector/ColorThemeSelector';
import FaIcon from '../FaIcon/FaIcon';
import Sidebar from '../Sidebar/Sidebar';
import './header.scss'


export type HeaderPropTypes = {
    theme: string,
    setTheme: Function,
    nav: React.JSX.Element,
    themes: ThemeType[]
};

const Header = (props: HeaderPropTypes) => {
    const {
        setTheme,
        theme,
        nav,
        themes
    } = props;

    const [sidebar, showSidebar] = useState<boolean>(false);

    return (
        <>
            <header className={"main-header"} >
                <div className={"logo"}>
                    <a className={"logo-box"} href={"https://jaimin-pandya.netlify.app/"}>
                        <h1>Logo</h1>
                    </a>
                </div>
                {nav}
                <ColorThemeSelector themes={themes} theme={theme} setTheme={setTheme} />
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

export default Header;
