import { FC } from 'react';
import StepOneForm from './step-one-form';

const CreateBusinessAccountStepOne: FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-[2.25rem] text-center">
        <h1 className="text-[1.313rem] text-daabo-black">Create Account</h1>
        <p className="text-[1.313rem] text-daabo-grey">Let’s get to know you a bit</p>
      </div>
      <StepOneForm />
    </div>
  );
};

export default CreateBusinessAccountStepOne;
