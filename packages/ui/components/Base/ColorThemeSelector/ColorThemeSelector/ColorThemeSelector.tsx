import React from 'react';
import {ColorThemeButton, ThemeType} from '../ColorThemeButton/ColorThemeButton';
import './color-theme-selector.scss'

export type ColorThemeSelectorPropTypes = {
    theme: string,
    setTheme: Function,
    themes: ThemeType[]
};

export const ColorThemeSelector = (props: ColorThemeSelectorPropTypes) => {
    const {
        setTheme,
        theme,
        themes
    } = props;
    return (
        <div className={"color-theme-selector"}>
            {
                themes.map(({btnTheme, btnLabel}) => <ColorThemeButton key={btnTheme} setTheme={setTheme} currentTheme={theme} btnLabel={btnLabel} btnTheme={btnTheme} />)
            }
        </div>
    );
}
