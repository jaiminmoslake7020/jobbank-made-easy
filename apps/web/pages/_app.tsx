import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";
import "../src/styles/index.css";
import {ThemeProvider, SessionProvider} from '../src/contexts';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <Provider store={store}>
        <SessionProvider >
            <ThemeProvider>
                <Component {...pageProps} />
            </ThemeProvider>
        </SessionProvider>
    </Provider>
  );
}

export default MyApp;
