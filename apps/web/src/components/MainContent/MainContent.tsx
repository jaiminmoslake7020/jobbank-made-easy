import React, {useEffect, useState, ReactNode} from 'react';
import {Footer, Header} from '../base';

export type MainContentPropTypes = {
    pageNameClass: string,
    children: ReactNode
};

const MainContent = (props: MainContentPropTypes) => {
    const {
        pageNameClass, children
    } = props;

    const [theme, setTheme] = useState<string>('light');

    useEffect(() => {
        const mount = () => {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDarkScheme) {
                const x = localStorage.getItem('theme');
                if (x === 'light') {
                    setTheme('dark');
                    localStorage.setItem('theme', 'dark');
                } else if (x) {
                    setTheme(x);
                }
            } else {
                const x = localStorage.getItem('theme');
                if (x) {
                    setTheme(x);
                }
            }
        }
        return mount();
    }, [])

    return (
        <div data-theme={theme} className="App">
            <Header theme={theme} setTheme={(x:string) => {
                setTheme(x);
                localStorage.setItem('theme', x);
            }} />
            <main className={"main-content "+pageNameClass}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default MainContent;
