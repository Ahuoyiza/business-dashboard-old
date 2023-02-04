import AuthStateContext from './auth-state-context';
import AuthActionContext, { TAuthAction } from './auth-action-context';
import { FC, ReactNode, useEffect, useState } from 'react';
import { Business } from './types';
import { getBusinessInfo } from 'lib/requests';
import { loginWithEmail } from 'lib/requests/auth';

type AuthProviderProps = {
  children: ReactNode;
};

const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<Business | undefined>();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState<Error | null | undefined>();

  useEffect(() => {
    setIsLoggingIn(true);
    if (localStorage.getItem('business-token'))
      getBusinessInfo()
        .then((user) => {
          setUser(user);
        })
        .finally(() => {
          setIsLoggingIn(false);
        });
    else setIsLoggingIn(false);
  }, []);

  const loginFn: TAuthAction['login'] = async (credential, opts) => {
    setIsLoggingIn(true);
    let token: string;
    try {
      token = await loginWithEmail(credential.email, credential.password);

      localStorage.setItem('business-token', token);
      const user = await getBusinessInfo();
      setUser(user);
      setIsLoggingIn(false);
      opts?.onSuccess(user);
      return user;
    } catch (err: any) {
      const error =
        process.env.NODE_ENV == 'development'
          ? err
          : new Error('Login failed. Check your details.');
      setError(error);
      setIsLoggingIn(false);
      if (opts?.onError) opts.onError(error);
      else throw error;
    }
  };
  const logout: TAuthAction['logout'] = async () => {
    setUser(undefined);
    localStorage.removeItem('business-token');
  };

  return (
    <AuthActionContext.Provider value={{ login: loginFn, logout: logout }}>
      <AuthStateContext.Provider value={{ user, isLoggingIn, error }}>
        {children}
      </AuthStateContext.Provider>
    </AuthActionContext.Provider>
  );
};

export { useAuth } from './hooks';

export default AuthProvider;
