import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";
import "../src/styles/index.css";
import { SessionProvider } from "next-auth/react"

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <Provider store={store}>
        <SessionProvider session={session} basePath={'http://localhost:5003'} >
            <Component {...pageProps} />
        </SessionProvider>
    </Provider>
  );
}

export default MyApp;
