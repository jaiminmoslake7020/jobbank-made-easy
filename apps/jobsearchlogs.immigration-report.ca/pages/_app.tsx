import type { AppProps } from "next/app";
import { Provider } from "react-redux";
import store from "../src/store";
import "../src/styles/index.scss";
import {ThemeProvider, SessionProvider} from '../src/contexts';
import {ModalsProvider, SidebarProvider} from 'ui';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
    return (
    <Provider store={store}>
        <SessionProvider >
            <ThemeProvider>
                <ModalsProvider>
                    <SidebarProvider>
                        <Component {...pageProps} />
                    </SidebarProvider>
                </ModalsProvider>
            </ThemeProvider>
        </SessionProvider>
    </Provider>
  );
}

export default MyApp;
