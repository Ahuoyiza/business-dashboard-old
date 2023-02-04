import { RouterContext } from 'next/dist/shared/lib/router-context';
import * as NextImage from 'next/image';
import { initialize, mswDecorator } from 'msw-storybook-addon';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ToastContainer } from 'react-toastify';

import 'styles/globals.css';

const OriginalNextImage = NextImage.default;

/**
 * Use next-image in unoptimized mode.
 * This removes the need to run a next server.
 */
Object.defineProperty(NextImage, 'default', {
  configurable: true,
  value: (props) => <OriginalNextImage {...props} unoptimized />,
});

// Initialize MSW
initialize();

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/,
    },
  },
  nextRouter: {
    Provider: RouterContext.Provider,
  },
  backgrounds: {
    default: 'light',
  },
};

const queryClient = new QueryClient();

export const decorators = [
  (Story) => (
    <QueryClientProvider client={queryClient}>
      <div className="[--gutter:1rem] sm:[--gutter:2rem] md:[--gutter:6rem] xl:[--gutter:9.4rem]">
        <Story />
      </div>
      <ToastContainer hideProgressBar />
    </QueryClientProvider>
  ),
  mswDecorator,
];
