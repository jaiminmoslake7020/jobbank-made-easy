import React, {useState} from 'react';
import Nav from './Nav';
import ColorThemeSelector from './ColorThemeSelector';
import FaIcon from './FaIcon';
import Sidebar from './Sidebar';

export type HeaderPropTypes = {
    theme: string,
    setTheme: Function
};

const Header = (props: HeaderPropTypes) => {
    const {
        setTheme,
        theme
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
                <Nav />
                <ColorThemeSelector theme={theme} setTheme={setTheme} />
                <button type={"button"} className={"btn sidebar-opener"}
                    onClick={() => {
                        showSidebar(true);
                    }}
                >
                    <FaIcon icon={"bars"} />
                </button>
            </header>
            <Sidebar sidebar={sidebar} showSidebar={showSidebar} theme={theme} setTheme={setTheme} />
        </>
    );
}

export default Header;
