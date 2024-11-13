import React, { createContext } from 'react';
import {useTheme} from '../hooks/useTheme';

export interface ThemeContextType {
    theme: string;  // User could be null if not authenticated
    setTheme: React.Dispatch<React.SetStateAction<string>>; // Function to update the user
}

// Create the context
const ThemeContext: React.Context<ThemeContextType> = createContext(null);

// Create a provider component
export const ThemeProvider = ({ children }) => {
    const { theme, setTheme } = useTheme();
    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
