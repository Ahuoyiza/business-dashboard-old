import { FC } from 'react';
import PasswordField from 'components/lib/forms/password-field';
import routes from 'routes';
import { toast } from 'react-toastify';
import { useMutation } from 'react-query';
import { SubmitHandler, useForm } from 'react-hook-form';
// import { changePassword } from 'lib/business/requests/auth';
import Button from 'components/lib/button';

interface Inputs {
  password: string;
  confirm_password: string;
}

const CreateNewPasswordForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();
  const otp = sessionStorage.getItem('otp') || '';
  const email = sessionStorage.getItem('resetPasswordEmail') || '';

  const onSuccess = (data: any): void => {
    if (data && data.status) {
      sessionStorage.removeItem('otp');
      sessionStorage.removeItem('resetPasswordEmail');
      toast.success('Password Changed!');
      window.location.href = routes.LOGIN;
    } else {
      toast.error(data?.message || 'Failed to change password');
    }
  };

  const onError = (error: Error): void => {
    toast.error(error.message || 'An unexpected error occurred');
  };

  const { mutate, isLoading } = useMutation(
    'reset_password',
    // async (password: string) => await changePassword(password, email, otp),
    async (someString: string) => {},
    {
      onError: onError,
      onSuccess: onSuccess,
    }
  );

  const createNewPassword = (password: string, confirm_password: string): void => {
    if (password !== confirm_password) {
      toast.error('Both passwords must match');
      return;
    }
    if (!(email && otp)) {
      toast.error('Restart reset password procedure');
      return;
    }
    mutate(password);
  };

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    const { password, confirm_password } = data;
    createNewPassword(password, confirm_password);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)} className="flex flex-col items-center self-center">
      <div className="mt-[2.063rem] text-center">
        <p className="text-[1.313rem] font-bold">Create new password</p>
        <h1 className="mx-auto mt-[0.813rem] w-[15.625rem] text-[1.313rem] font-semibold text-daabo-grey sm:mx-0 sm:w-full sm:text-[21px]">
          Your new password must be different from previously used passwords
        </h1>
      </div>
      <div className="mt-[41px] mb-[37px] self-center">
        <div className="relative flex flex-col space-y-[2.313rem]">
          <PasswordField
            placeholder="ENTER PASSWORD"
            reactHookOptions={{
              register: register,
              options: {
                required: true,
                minLength: 8,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
              },
              error: errors.password,
            }}
          />
          <PasswordField
            reactHookOptions={{
              register: register,
              options: {
                required: true,
                minLength: 8,
                pattern: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$/,
              },
              error: errors.confirm_password,
            }}
            placeholder="CONFIRM PASSWORD"
            name="confirm_password"
          />
        </div>
        <p className="mt-[0.813rem] ml-[2px] text-[0.750rem] text-daabo-grey">
          Both passwords must match
        </p>
      </div>
      <div className="mt-[41px] self-center">
        <Button
          type="submit"
          className="h-[2.813rem] w-[10.938rem] text-[15px]"
          loading={isLoading}
        >
          reset
        </Button>
      </div>
    </form>
  );
};

export default CreateNewPasswordForm;
