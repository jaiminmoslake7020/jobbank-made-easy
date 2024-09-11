import React from 'react';
import ColorThemeButton from './ColorThemeButton';

export type ColorThemeSelectorPropTypes = {
    theme: string,
    setTheme: Function
};

const ColorThemeSelector = (props: ColorThemeSelectorPropTypes) => {
    const {
        setTheme,
        theme
    } = props;
    return (
        <div className={"color-theme-selector"}>
            <ColorThemeButton setTheme={setTheme} currentTheme={theme} btnLabel={"Light"} btnTheme={"light"} />
            <ColorThemeButton setTheme={setTheme} currentTheme={theme} btnLabel={"Dark"} btnTheme={"dark"} />
            <ColorThemeButton setTheme={setTheme} currentTheme={theme} btnLabel={"Blue"} btnTheme={"blue"} />
            <ColorThemeButton setTheme={setTheme} currentTheme={theme} btnLabel={"Green"} btnTheme={"green"} />
            <ColorThemeButton setTheme={setTheme} currentTheme={theme} btnLabel={"Purple"} btnTheme={"purple"} />
        </div>
    );
}

export default ColorThemeSelector;
