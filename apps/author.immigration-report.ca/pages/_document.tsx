import { Html, Head, Main, NextScript } from 'next/document'
import {inDevEnvironment} from '../src/utils/utils';

export default function Document() {
    return (
        <Html lang="en">
            <Head>
                <link rel="stylesheet"
                      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.6.0/css/all.min.css"
                      integrity="sha512-Kc323vGBEqzTmouAECnVceyQqyqdsSiqLQISBL29aUW4U/M7pSPA/gEUZQqv1cwx4OnYxTxve5UMg5GT6L4JJg=="
                      crossOrigin="anonymous" referrerPolicy="no-referrer"/>
                {
                    !inDevEnvironment && <script dangerouslySetInnerHTML={{
                        __html: `(function (w, d, s, l, i) {
                    w[l] = w[l] || []; w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' });
                    var f = d.getElementsByTagName(s)[0], j = d.createElement(s), dl = l != 'dataLayer' ? '&l=' + l : '';
                    j.async = true; j.src = 'https://www.googletagmanager.com/gtm.js?id=' + i + dl; f.parentNode.insertBefore(j, f);
                })(window, document, 'script', 'dataLayer', 'GTM-PLQDTLSG');`
                    }}></script>
                }
            </Head>
            <body>
            <Main />
            <NextScript />
            {
                !inDevEnvironment && <noscript dangerouslySetInnerHTML={{
                    __html: `<iframe src="https://www.googletagmanager.com/ns.html?id=GTM-PLQDTLSG" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
                }}></noscript>
            }
            </body>
        </Html>
    )
}
