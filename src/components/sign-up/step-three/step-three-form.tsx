import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from 'components/lib/forms/input-field';
import PasswordField from 'components/lib/forms/password-field';
import { useSignUpForm } from 'components/sign-up/context';
import { useRouter } from 'next/router';
import { toast } from 'react-toastify';
import routes from 'routes';
import { useMutation } from 'react-query';
import { CompanySignUpData, signUp } from 'lib/requests/auth';
import { useAuth } from 'components/lib/auth';
import Button from 'components/lib/button';

interface Inputs {
  phoneNumber: string;
  password: string;
}

const StepThreeForm: FC = () => {
  const router = useRouter();
  const { formData } = useSignUpForm();
  const { logout } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const signupSuccessHandler = (data: any): void => {
    if (data && data.success) {
      logout();
      toast.success('Sign up successful');
      router.push(routes.EMAIL_VERIFICATION_NOTIFICATION);
    } else {
      let errorMessage = data?.message || 'Sign up Failed';
      toast.error('An error occurred: ' + errorMessage);
    }
  };

  const signupFailedHandler = (error: any): void => {
    toast.error(error.message || 'Sign up Failed', {
      hideProgressBar: true,
    });
  };

  const registerMutation = useMutation(signUp, {
    onSuccess: signupSuccessHandler,
    onError: signupFailedHandler,
  });

  const handleBusinessRegistration = async (userData: any) => {
    if (!formData) return;
    let data: CompanySignUpData = {
      isCompany: true,
      ...userData,
    };
    registerMutation.mutate(data);
  };

  const onsubmit: SubmitHandler<Inputs> = async (data) => {
    const userData = { ...formData, ...data };
    const formEntries = Object.entries(userData);
    if (formEntries.length < 7) {
      // if there are any missing properties redirect the user to the first step
      window.location.href = '/signup?step=3&type=business';
    } else {
      await handleBusinessRegistration(userData);
    }
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mt-[4.63rem] mb-[4.375rem]">
        <div className="flex flex-col space-y-[2.313rem]">
          <InputField
            type="tel"
            placeholder="PHONE NUMBER"
            defaultValue={formData.phone_number}
            name="phoneNumber"
            reactHookOptions={{
              register: register,
              options: {
                required: true,
                minLength: 11,
                maxLength: 15,
              },
              error: errors.phoneNumber,
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
              error: errors.password,
            }}
            placeholder="ENTER PASSWORD"
          />
        </div>
        <div className="mt-[1.438rem]">
          <p className="text-center text-[0.75rem]">
            By clicking “Create Account”, you accept the{' '}
            <a
              className="text-daabo-primary-500 underline"
              href="https://www.getdaabo.com.ng/terms-of-service"
              target="_blank"
              rel="noreferrer"
            >
              terms.
            </a>
          </p>
        </div>
      </div>
      <div className="self-center text-center">
        <Button
          type="submit"
          className="h-[2.813rem] w-[17.063rem] text-[15px]"
          loading={registerMutation.isLoading}
        >
          Create Account
        </Button>
      </div>
    </form>
  );
};

export default StepThreeForm;
