import React, {useContext} from 'react';
import lightColourUrl from '../assets/images/logo-inverse.png';
import darkColourUrl from '../assets/images/logo.png';
import {menuLinksHeader, themes} from '../data';
import Nav from './Nav';
import {Header, ThemeContext} from 'ui';

const HeaderWrapper = () => {
    const { theme, setTheme } = useContext(ThemeContext);
    const isProduction = process.env.NODE_ENV === 'production';
    let logoUrl = 'http://localhost:3003/';
    if ( isProduction ) {
        logoUrl = 'https://jaimin-pandya.netlify.app/';
    }
    return (
        <Header
            logoObject={{
                lightColourUrl,
                darkColourUrl
            }}
            logoUrl={logoUrl}
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
