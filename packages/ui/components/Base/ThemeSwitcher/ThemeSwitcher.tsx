import React from 'react';
import './theme-switcher.scss';
import {FaIcon} from '../FaIcon/FaIcon';
import {ThemeType} from '../ColorThemeSelector';

export type ThemeSwitcherPropTypes = {
    theme: string,
    setTheme: Function
};

const ThemeSwitcher = (props: ThemeSwitcherPropTypes) => {
    const { theme, setTheme } = props;
    const p = theme === "light";
    const lightActive = p ? "active" : "";
    const darkActive = !p ? "active" : "";
    return (
        <div className={`theme-switcher-container ${lightActive ? 'light-active' : 'dark-active'} `} >
            <div role={"button"} className={` icon-wrapper sun-wrapper  ${lightActive} `} onClick={() => {
                setTheme("light");
            }} >
                <FaIcon icon={"sun"} />
            </div>
            <div role={"button"} className={` icon-wrapper moon-wrapper ${darkActive} `} onClick={() => {
                setTheme("dark");
            }}>
                <FaIcon icon={"moon"} />
            </div>
        </div>
    );
}

export default ThemeSwitcher;
