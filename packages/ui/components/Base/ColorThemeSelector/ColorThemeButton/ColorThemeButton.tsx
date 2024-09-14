import React from 'react';
import { FaIcon } from '../../';
import './color-theme-btn.scss';

export type ThemeButtonPropTypes = {
    currentTheme: string,
    btnLabel: string,
    btnTheme: string,
    setTheme: Function,
};

export const ColorThemeButton = (props: ThemeButtonPropTypes) => {
    const {
        currentTheme,
        setTheme,
        btnLabel,
        btnTheme
    } = props;

    return (
        <button
            className={`color-theme-btn ${btnTheme} ${btnTheme === currentTheme ? "active" : ""} `}
            type={"button"}
            name={btnLabel}
            onClick={() => {
            setTheme(btnTheme);
        }} >{
            btnTheme === currentTheme ? <FaIcon icon={"check"} /> : null
        }</button>
    );
}

