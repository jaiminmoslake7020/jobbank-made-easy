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
    const [time, setTime] = useState<number>(remainingTime);

    useEffect(() => {
        const timeout = setTimeout(() => {
            if (time >= 0) {
                setTime(prev => prev -  1);
            }
        }, 1000);
        return () => {
            clearTimeout(timeout);
        };
    }, [time]);

    return <>
        { time < 200 ? <RefreshToken makeACall={true} /> : null }
        <div className={"w-container flex justify-end"}>
            <p ref={pref} className={""} >{time}</p>
        </div>
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
