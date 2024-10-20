import type { AppProps } from "next/app";
import "../src/assets/scss/index.scss";
import {ModalsProvider, ThemeProvider, SidebarProvider} from 'ui';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
      <ThemeProvider>
          <ModalsProvider>
              <SidebarProvider>
                  <Component {...pageProps} />
              </SidebarProvider>
          </ModalsProvider>
      </ThemeProvider>
  );
}

export default MyApp;
