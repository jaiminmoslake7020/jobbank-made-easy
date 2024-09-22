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
    const { appSession, setAppSessionCall  } = useContext(SessionContext);
    const [trigger, { data, error, isFetching, isLoading }] =
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

    let oneTimeOnly = true;
    useEffect(() => {
        const mount = () => {
            if (makeACall && !madeAcall && oneTimeOnly) {
                oneTimeOnly = false;
                setMedACall(true);
                trigger(appSession.accessToken);
            }
        }
        return mount();
    }, [madeAcall, makeACall])

    return (
        appSession  ?
            <Button type={"button"} onClick={() => {
                trigger(appSession.accessToken);
            }}>Refresh Token</Button> : null
    );
}

export default RefreshToken;
