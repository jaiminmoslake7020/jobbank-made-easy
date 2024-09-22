import React, {useContext} from 'react';
import lightColourUrl from '../assets/images/logo-inverse.png';
import darkColourUrl from '../assets/images/logo.png';
import {menuLinksHeader, themes} from '../data';
import Nav from './Nav';
import {Header, ThemeContext} from 'ui';

const HeaderWrapper = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    return (
        <Header
            logoObject={{
                lightColourUrl,
                darkColourUrl
            }}
            themes={themes}
            theme={theme}
            setTheme={(x:string) => {
                setTheme(x);
            }}
            nav={<Nav menuLinks={menuLinksHeader} /> }
        />
    );
}

export default HeaderWrapper;
