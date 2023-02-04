import { FC, ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import ErrorFallback from './error-fallback';

type AppErrorBoundaryProps = {
  children: ReactNode;
};

const AppErrorBoundary: FC<AppErrorBoundaryProps> = ({ children }) => (
  <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
);

export default AppErrorBoundary;
