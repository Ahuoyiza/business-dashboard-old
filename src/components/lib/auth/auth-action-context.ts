import { createContext } from 'react';
import { Business } from './types';

type LoginCredential = {
  email: string;
  password: string;
};

export type TAuthAction = {
  /**
   * Login with email and password or social login token
   * @param credential
   * @returns The user if login is successful else it returns null
   */
  login: (
    credential: LoginCredential,
    loginOptions?: {
      onSuccess: (user?: Business) => void;
      onError: (error?: Error) => void;
    }
  ) => Promise<Business | undefined>;
  /**
   * Logout the user
   */
  logout: () => Promise<void>;
};

export default createContext<TAuthAction>({
  login: async () => {
    throw new Error('Not implemented');
  },
  logout: async () => {
    throw new Error('Not implemented');
  },
});
