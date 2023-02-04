import { FC } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import InputField from 'components/lib/forms/input-field';
import { useRouter } from 'next/router';
import { useSignUpForm } from 'components/sign-up/context';
import ListBox from 'components/lib/forms/list-box';
import { delayFunctionCall } from 'utils';
import Button from 'components/lib/button';

interface Inputs {
  businessTypeId: string;
  address: string;
  cacNumber: string;
}

const StepTwoForm: FC = () => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Inputs>();
  const router = useRouter();

  const goToNextPage = (): void => {
    router.push('/signup', {
      query: {
        step: 3,
      },
    });
  };

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    updateFormData(data);
    delayFunctionCall(goToNextPage, 1000);
  };

  const { updateFormData, formData, businessTypes } = useSignUpForm();

  return (
    <form onSubmit={handleSubmit(onsubmit)}>
      <div className="mt-[4.63rem] mb-[4.375rem] flex flex-col space-y-[2.313rem]">
        <InputField
          reactHookOptions={{
            register: register,
            options: {
              required: true,
            },
            error: errors.address,
          }}
          name="address"
          defaultValue={formData.address}
          type="street"
          placeholder="ADDRESS"
        />
        <ListBox
          items={businessTypes}
          name="businessTypeId"
          defaultValue={formData.businessTypeId}
          reactHookOptions={{
            register: register,
            options: {
              required: true,
            },
            error: errors.businessTypeId,
          }}
        />
        <InputField
          reactHookOptions={{
            register: register,
            error: errors.cacNumber,
          }}
          type="text"
          placeholder="CAC NUMBER"
          name="cacNumber"
          defaultValue={formData.cacNumber}
          descriptiveName="cac number"
        />
      </div>
      <div className="self-center text-center">
        <Button type="submit" className="h-[2.813rem] w-[10.938rem] text-[15px]">
          Next
        </Button>
      </div>
    </form>
  );
};

export default StepTwoForm;
