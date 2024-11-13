import React, { createContext } from 'react';
import {useAppSession} from '../hooks';
import {SessionResponseType} from 'types';

export interface SessionContextType {
    appSession: SessionResponseType | null;  // User could be null if not authenticated
    removeSessionCall: () => void; // Function to update the user
    setAppSessionCall: (session: SessionResponseType) => void; // Function to update the user
}

// Create the context
const SessionContext: React.Context<SessionContextType> = createContext(null);

// Create a provider component
export const SessionProvider = ({ children }) => {
    const { appSession, removeSessionCall, setAppSessionCall } = useAppSession();
    return (
        <SessionContext.Provider value={{ appSession, removeSessionCall, setAppSessionCall }}>
            {children}
        </SessionContext.Provider>
    );
};

export default SessionContext;
