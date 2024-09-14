"use client";

import JobSearchApp from '../src/components/JobSearch/JobSearchApp';
import MainContent from '../src/components/MainContent/MainContent';

import { useSession, signIn, signOut } from "next-auth/react"

export function Component() {
    const { data: session } = useSession()
    if (session) {
        return (
            <>
                Signed in as {session.user.email} <br />
                <button onClick={() => signOut()}>Sign out</button>
            </>
        )
    }
    return (
        <>
            Not signed in <br />
            <button onClick={() => signIn()}>Sign in</button>
        </>
    )
}

export default function Login() {
  return (
      <MainContent pageNameClass={"login-page"} >
          <Component />
      </MainContent>
  );
}
