import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";
import "../src/styles/index.css";
import {ThemeProvider, SessionProvider} from '../src/contexts';
import {SidebarProvider} from 'ui';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
    <Provider store={store}>
        <SessionProvider >
            <ThemeProvider>
                <SidebarProvider>
                    <Component {...pageProps} />
                </SidebarProvider>
            </ThemeProvider>
        </SessionProvider>
    </Provider>
  );
}

export default MyApp;
