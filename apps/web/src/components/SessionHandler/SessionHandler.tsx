import React, {useContext, useEffect, useRef, useState} from "react";
import { SessionResponseType } from "types";
import SessionContext from '../../contexts/SessionContext';
import RefreshToken from './RefreshToken';
import {isExpired} from '../../utils/login';

export type RemainingTimeProps = {
    remainingTime: number;
};

const RemainingTime = (props:RemainingTimeProps) => {
    const {
        remainingTime
    } = props;

    const pref = useRef<HTMLParagraphElement>(null);
    const [time, SetTime] = useState<number>(remainingTime);

    let onlyOnce = true;
    useEffect(() => {
        const mount = () => {
            if (onlyOnce) {
                // eslint-disable-next-line react-hooks/exhaustive-deps
                onlyOnce = false;
                setInterval(() => {
                    SetTime(prev => prev -  1);
                }, 1000);
            }
        }
        return mount();
    }, []);

    return <>
        { time < 200 ? <RefreshToken makeACall={true} /> : null }
        <p ref={pref} >{time}</p>
    </>
}

const SessionHandler = () => {
  const { appSession, removeSessionCall } = useContext(SessionContext);
  const [remainingTime, setRemainingTime] = useState<number>(0);

  useEffect(() => {
    const mount = () => {
      if (appSession) {
        const { accessTokenExpiry } = appSession as SessionResponseType;
        const time =
          Number(accessTokenExpiry) -
          parseInt(String(new Date().getTime() / 1000));
        if (!isExpired(accessTokenExpiry)) {
            setRemainingTime(time);
        } else {
            removeSessionCall();
        }
      }
    };
    return mount();
  }, [appSession, removeSessionCall]);

  return <>
      {appSession && remainingTime > 0 ? <RemainingTime remainingTime={remainingTime} /> : <></>}
  </>;
};

export default SessionHandler;
