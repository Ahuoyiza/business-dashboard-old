import 'styles/globals.css';
import 'react-toastify/dist/ReactToastify.css';

import { ChakraProvider } from '@chakra-ui/react';
import type { AppProps } from 'next/app';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';
import { DefaultSeo } from 'next-seo';
import SEO from 'lib/seo/seo.config';
import AppErrorBoundary from 'components/errors/app-error-boundary';
import { NextComponentType } from 'next';
import { Layout } from 'components/lib';
import { LayoutProps } from 'components/lib/layout';
import theme from 'theme';

type CustomAppProps = AppProps & {
  Component: NextComponentType & { layoutProps?: LayoutProps };
};

const queryClient = new QueryClient();

function MyApp({ Component, pageProps }: CustomAppProps) {
  return (
    <ChakraProvider theme={theme}>
      <AppErrorBoundary>
        <DefaultSeo {...SEO} />
        <QueryClientProvider client={queryClient}>
          <Layout {...(Component.layoutProps || {})}>
            <Component {...pageProps} />
          </Layout>
          <ToastContainer hideProgressBar />
        </QueryClientProvider>
      </AppErrorBoundary>
    </ChakraProvider>
  );
}

export default MyApp;
