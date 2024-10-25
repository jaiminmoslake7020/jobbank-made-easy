import {useCallback, useEffect, useState} from 'react';

export const useTheme = () => {

    const [theme, setThemeCall] = useState<string>('light');

    const setTheme = useCallback((x: string, fromLocalStorage: boolean = false) => {
        if (!fromLocalStorage) {
            localStorage.setItem('theme', x);
        }
        setThemeCall(x);
    }, [])

    useEffect(() => {
        const mount = () => {
            const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
            if (prefersDarkScheme) {
                const x = localStorage.getItem('theme');
                if (x === 'light') {
                    setTheme('dark');
                } else if (x) {
                    setTheme(x, true);
                }
            } else {
                const x = localStorage.getItem('theme');
                if (x) {
                    setTheme(x);
                }
            }
        }
        return mount();
    }, [setTheme]);

    return {
        theme, setTheme
    };
}
