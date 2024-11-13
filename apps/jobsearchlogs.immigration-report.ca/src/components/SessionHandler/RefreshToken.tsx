import React, {useContext, useEffect, useState} from 'react';
import {Button} from 'ui';
import SessionContext from '../../contexts/SessionContext';
import {useLazyRefreshTokenQuery} from '../../store/services/api';
import {SessionResponseType} from 'types';
import {isExpired} from '../../utils/login';

export type RefreshTokenProps = {
    makeACall: boolean
};

const RefreshToken = (props: RefreshTokenProps) => {
    const {
        makeACall
    } = props;
    const { appSession, setAppSessionCall, removeSessionCall  } = useContext(SessionContext);
    const [trigger, { data, isError, error, isFetching, isLoading }] =
        useLazyRefreshTokenQuery();

    const [madeAcall, setMedACall] = useState<boolean>(false) ;

    useEffect(() => {
        if (!isLoading && !isFetching && data) {
            const { accessTokenExpiry, accessToken } = data as SessionResponseType;
            if (accessToken && accessTokenExpiry) {
                if (!isExpired(accessTokenExpiry)) {
                    setAppSessionCall(data);
                }
            }
        }
    }, [data, isFetching, isLoading, setAppSessionCall]);

    useEffect(() => {
        const mount = () => {
            if (makeACall && !madeAcall) {
                setMedACall(true);
                trigger(appSession.accessToken);
            }
        }
        return mount();
    }, [appSession.accessToken, madeAcall, makeACall, trigger])

    useEffect(() => {
        if (isError && error) {
            console.log("e", error);
            // @ts-ignore
            if (error?.status === 403) {
                removeSessionCall();
            }
        }
    }, [error, isError, removeSessionCall])

    return (
        appSession  ?
            <Button type={"button"} onClick={() => {
                trigger(appSession.accessToken);
            }}>Refresh Token</Button> : null
    );
}

export default RefreshToken;
