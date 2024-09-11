import React, {useEffect, useState, ReactNode} from 'react';
import Nav from './Nav'
import {
    Header, Footer
} from "ui";

export type MainContentPropTypes = {
    pageNameClass: string,
    children: ReactNode
};

const menuLinks = [
    {
        label: "Job Search",
        href: "/",
    },
];

const themes = [
    {
        btnLabel: 'Light',
        btnTheme: 'light'
    },
    {
        btnLabel: 'Dark',
        btnTheme: 'dark'
    }
];

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
            <Header
                themes={themes}
                theme={theme}
                setTheme={(x:string) => {
                    setTheme(x);
                    localStorage.setItem('theme', x);
                }}
                nav={<Nav menuLinks={menuLinks} /> }
            />
            <main className={"main-content "+pageNameClass}>
                {children}
            </main>
            <Footer />
        </div>
    );
}

export default MainContent;
