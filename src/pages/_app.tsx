import '../styles/globals.scss'
import '../styles/tailwind.scss'
import '../styles/theme.scss'
import type { AppProps } from 'next/app';
import type { ReactElement, ReactNode } from 'react';
import type { NextPage } from 'next';
import getConfig from 'next/config';
const { publicRuntimeConfig } = getConfig();
// const basePath = publicRuntimeConfig?.basePath || '';

type NextPageWithLayout = NextPage & {
  getLayout?: (page: ReactElement) => ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

const MyApp = ({ Component, pageProps }: AppPropsWithLayout) => {
  // Use the layout defined at the page level, if available
  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(
    <>
      <Component {...pageProps} />
    </>
  );
};

if (typeof window !== 'undefined' && 'paintWorklet' in CSS) {
  (CSS as any).paintWorklet.addModule('../utils/squircle.min.js');
}

export default MyApp;
