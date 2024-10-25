"use client";

import {useContext, useEffect} from "react";
import { useLazySessionQuery } from "../src/store/services/api";
import { SessionBodyDto } from "types";
import {useRouter} from 'next/router';
import SessionContext from '../src/contexts/SessionContext';
import {Loading} from 'ui';

const check = () => {
  // Parse query string to see if page request is coming from OAuth 2.0 server.
  var fragmentString = location.search.substring(1);
  var params = {};
  var regex = /([^&=]+)=([^&]*)/g,
    m;
  while ((m = regex.exec(fragmentString))) {
    params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  console.log("accesstoken", params);
  return params;
};

export default function LoginReturn() {
  const [trigger, { data, error, isFetching, isLoading }] =
    useLazySessionQuery();

  const router = useRouter();

  const { appSession, setAppSessionCall } = useContext(SessionContext);

  useEffect(() => {
    const mount = () => {
      const params = check();
      trigger(params as SessionBodyDto);
    };
    return mount();
  }, [setAppSessionCall, trigger]);

  useEffect(() => {
    const mount = () => {
      if (data && data.accessToken) {
          setAppSessionCall(data);
      }
    };
    return mount();
  }, [data, setAppSessionCall]);

  useEffect(() => {
    const mount = () => {
      if (appSession && appSession.accessToken) {
        router.push('/');
      }
    };
    return mount();
  }, [appSession, router]);

  return <div className={" w-screen min-h-screen bg-bkg flex items-center justify-center "}>
    <Loading loadingIconClass={" !text-6xl "} />
  </div>;
}
