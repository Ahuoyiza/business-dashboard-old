import { useContext } from 'react';
import AuthActionContext from './auth-action-context';
import AuthStateContext from './auth-state-context';

export const useAuth = () => {
  const authState = useContext(AuthStateContext);
  const authAction = useContext(AuthActionContext);

  return {
    user: authState.user,
    isLoggingIn: authState.isLoggingIn,
    error: authState.error,
    login: authAction.login,
    logout: authAction.logout,
  };
};
