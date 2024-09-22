import type { AppProps } from "next/app";
import "../src/assets/scss/index.scss";
import {ModalsProvider, ThemeProvider} from 'ui';

function MyApp({ Component, pageProps: { session, ...pageProps }, }: AppProps) {
  return (
      <ThemeProvider>
          <ModalsProvider>
              <Component {...pageProps} />
          </ModalsProvider>
      </ThemeProvider>
  );
}

export default MyApp;
