import EmailField from 'components/lib/forms/email-field';
import InputField from 'components/lib/forms/input-field';
import { useSignUpForm } from 'components/sign-up/context';
import { useRouter } from 'next/router';
import { useForm, SubmitHandler } from 'react-hook-form';
import { FC } from 'react';
import { delayFunctionCall } from 'utils';
import Button from 'components/lib/button';

interface Inputs {
  companyName: string;
  email: string;
}

const StepOneForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();
  const router = useRouter();
  const goToNextPage = () => {
    router.push('/signup', {
      query: {
        step: 2,
      },
    });
  };

  const { updateFormData, formData } = useSignUpForm();

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    updateFormData(data);
    delayFunctionCall(goToNextPage, 1000);
  };

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mt-[4.63rem] mb-[4.375rem] flex flex-col space-y-[2.313rem]">
        <InputField
          reactHookOptions={{
            register: register,
            options: {
              required: true,
              minLength: 3,
            },
            error: errors.companyName,
          }}
          type="text"
          placeholder="BUSINESS NAME"
          name="companyName"
          defaultValue={formData.companyName}
        />
        <EmailField
          placeholder="EMAIL ADDRESS"
          defaultValue={formData.email}
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
      <div className="self-center text-center">
        <Button type="submit" className="h-[2.813rem] w-[10.938rem] text-[15px]">
          next
        </Button>
      </div>
    </form>
  );
};

export default StepOneForm;
