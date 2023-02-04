import { createContext } from 'react';
import { Business } from './types';

export type TAuthState = {
  user?: Business;
  isLoggingIn: boolean;
  error?: Error | null;
};

const AuthStateContext = createContext<TAuthState>({
  isLoggingIn: false,
});

export default AuthStateContext;
