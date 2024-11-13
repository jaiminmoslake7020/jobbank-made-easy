import React, {createContext, useEffect, useState} from 'react';
import {NextComponentType} from 'next';

export interface SidebarContextType {
    sidebar: boolean;
    showSidebar: React.Dispatch<React.SetStateAction<boolean>>;
}

// Create the context
// @ts-ignore
export const SidebarContext: React.Context<SidebarContextType> = createContext({
    sidebar: false,
    showSidebar: (x) => {}
});

// Create a provider component
export const SidebarProvider = ({ children }: { children : React.ReactNode | React.ReactElement | React.JSX.Element | any } ) => {
    const [sidebar, showSidebar] = useState<boolean>(false);

    useEffect(() => {
        if (sidebar) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }
    }, [sidebar])

    return (
        <SidebarContext.Provider value={{ sidebar, showSidebar }}>
            {children}
        </SidebarContext.Provider>
    );
};

