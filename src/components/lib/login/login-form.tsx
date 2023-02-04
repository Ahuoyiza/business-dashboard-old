import Link from 'next/link';
import { SubmitHandler, useForm } from 'react-hook-form';
import PasswordField from 'components/lib/forms/password-field';
import routes from 'routes';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import EmailField from 'components/lib/forms/email-field';
import { useAuth } from '../auth';
import Button from 'components/lib/button';

interface Inputs {
  email: string;
  password: string;
}

const LoginForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { login, isLoggingIn } = useAuth();
  const router = useRouter();

  const loginSuccessHandler = () => {
    router.push(routes.DASHBOARD);
    toast.success('Login Successful');
  };

  const loginFailedHandler = (error?: Error) => {
    toast.error(error?.message || 'Login failed', {
      hideProgressBar: true,
    });
  };

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    const { email, password } = data;
    handleLogin(email, password);
  };

  const handleLogin = (email: string, password: string) => {
    if (!(email && password)) return;

    login(
      { email, password },
      {
        onSuccess: loginSuccessHandler,
        onError: loginFailedHandler,
      }
    );
  };

  return (
    <div className="flex flex-col items-center self-center">
      <form onSubmit={handleSubmit(onsubmit)} className="mt-[41px] self-center">
        <div className="relative mb-[37px] flex">
          <div>
            <EmailField
              placeholder="EMAIL ADDRESS"
              reactHookOptions={{
                register: register,
                options: {
                  required: true,
                  pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                },
                error: errors.email,
              }}
            />
          </div>
        </div>
        <div className="relative flex">
          <PasswordField
            reactHookOptions={{
              register: register,
              options: {
                required: true,
              },
              error: errors.password,
            }}
            placeholder="ENTER PASSWORD"
          />
        </div>
        <div className="mt-[13px] text-right text-daabo-grey">
          <Link href={routes.RESET_PASSWORD}>
            <a className="right-3">Forgot password?</a>
          </Link>
        </div>
        <div className="mt-[47px] self-center text-center">
          <Button
            type="submit"
            className="h-[2.813rem] w-[10.938rem] text-[15px]"
            loading={isLoggingIn}
          >
            Log in
          </Button>
        </div>
      </form>
      <div className="my-10 text-center">
        Don&apos;t have an account?{' '}
        <Link href="/signup">
          <a className="text-daabo-primary">Sign up</a>
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
