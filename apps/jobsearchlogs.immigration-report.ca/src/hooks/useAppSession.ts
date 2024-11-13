import {useCallback, useEffect, useState} from 'react';
import {SessionResponseType} from 'types';

export const getLocalSession = () : null | SessionResponseType =>{
    if (typeof window !== 'undefined') {
        const appSession = localStorage.getItem('appSession');
        let appSessionObject = null ;
        try {
            appSessionObject = appSession === null ? null : JSON.parse(appSession);
        } catch (e) {
            console.error(e);
        }
        return appSessionObject;
    }
    return null;
}


export const useAppSession = () => {
    const [appSession, setAppSession] = useState<SessionResponseType | null>(null);

    const setAppSessionCall = useCallback((o:SessionResponseType) => {
        if (Object.hasOwn(o,'accessToken')) {
            localStorage.setItem('appSession', JSON.stringify(o));
            setAppSession(o);
        }
    }, []);

    const removeSessionCall = useCallback(() => {
        localStorage.removeItem('appSession');
        setAppSession(null);
    }, []);

    useEffect(() => {
        setAppSession(getLocalSession());
    }, [])

    return {
        appSession,
        setAppSessionCall,
        removeSessionCall
    };
}
