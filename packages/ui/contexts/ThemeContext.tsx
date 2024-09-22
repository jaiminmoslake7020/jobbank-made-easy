import React, { createContext } from 'react';
import {useTheme} from '../hooks';

export interface ThemeContextType {
    theme: string;  // User could be null if not authenticated
    setTheme: (x: string, fromLocalStorage?: boolean) => void; // Function to update the user
}

// Create the context
export const ThemeContext: React.Context<ThemeContextType> = createContext({
    theme: 'light',
    setTheme: (x: string) => {}
});

// Create a provider component
export const ThemeProvider = ({ children }: { children : React.ReactNode } ) => {
    const { theme, setTheme } = useTheme();
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

