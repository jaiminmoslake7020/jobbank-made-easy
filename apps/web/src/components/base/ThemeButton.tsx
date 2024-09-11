import React from 'react';

export type ThemeButtonPropTypes = {
    currentTheme: string,
    btnLabel: string,
    btnTheme: string,
    setTheme: Function,

};

const ThemeButton = (props: ThemeButtonPropTypes) => {
    const {
        currentTheme,
        setTheme,
        btnLabel,
        btnTheme
    } = props;
    return (
        <button
            className={`btn btn-primary ${btnTheme === currentTheme ? "active" : ""} `}
            type={"button"}
            onClick={() => {
            setTheme(btnTheme);
        }} >
            {btnLabel}
        </button>
    );
}

export default ThemeButton;
