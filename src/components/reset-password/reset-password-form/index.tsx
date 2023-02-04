import Button from 'components/lib/button';
import EmailField from 'components/lib/forms/email-field';
// import { resetPassword } from 'lib/business/requests/auth';
import { useRouter } from 'next/router';
import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import routes from 'routes';

interface Inputs {
  email: string;
}

const ResetPasswordForm: FC = () => {
  const router = useRouter();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();

  const onSuccess = (): void => {
    router.push(routes.EMAIL_SENT);
  };

  const onError = (error: Error): void => {
    toast.error(error.message || 'Password Reset Failed');
  };

  const { mutate, isLoading } = useMutation(
    'reset_password',
    async (email: string) => {
      // await resetPassword(email);
    },
    {
      onError: onError,
      onSuccess: onSuccess,
    }
  );

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    const { email } = data;
    sessionStorage.setItem('resetPasswordEmail', email);
    mutate(email);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col items-center self-center">
      <div className="mt-[2.063rem] text-center">
        <p className="text-[1.313rem] font-semibold">Reset Password</p>
        <h1 className="mx-auto mt-[0.813rem] w-[15.625rem] text-[1.313rem] font-semibold text-daabo-grey sm:mx-0 sm:w-full sm:text-[21px]">
          A verification link would be sent to the email linked with this account.
        </h1>
      </div>
      <div className="mt-[41px] self-center">
        <div className="relative mb-[37px] flex">
          <EmailField
            placeholder="EMAIL"
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
      <div className="mt-[41px] self-center">
        <Button
          type="submit"
          loading={isLoading}
          className="h-[2.813rem] w-[10.938rem] text-[15px]"
        >
          submit
        </Button>
      </div>
    </form>
  );
};

export default ResetPasswordForm;
