import { Html, Head, Main, NextScript } from 'next/document';
import { getThemeInitScript } from '../../public/utils/theme-init';
export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <link rel="shortcut icon" href="/favicon.ico" />
      </Head>
      <body>
        <script dangerouslySetInnerHTML={{ __html: getThemeInitScript() }} />
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
