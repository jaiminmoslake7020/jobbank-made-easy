import React, { createContext } from 'react';
import {AppSessionType, useAppSession} from '../hooks';
import {SessionResponseType} from 'types';

export interface SessionContextType {
    appSession: AppSessionType;  // User could be null if not authenticated
    removeSessionCall: () => void; // Function to update the user
    setAppSessionCall: (session: SessionResponseType) => void; // Function to update the user
}

// Create the context
export const SessionContext: React.Context<SessionContextType> = createContext({
    appSession: null as AppSessionType,
    removeSessionCall: () => {},
    setAppSessionCall: (session: SessionResponseType) => {}
});

// Create a provider component
export const SessionProvider = ({ children }: { children:React.ReactNode }) => {
    const { appSession, removeSessionCall, setAppSessionCall } = useAppSession();
    return (
        <SessionContext.Provider value={{ appSession, removeSessionCall, setAppSessionCall }}>
            {children}
        </SessionContext.Provider>
    );
};

