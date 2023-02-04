import { FC } from 'react';
import StepTwoForm from './step-two-form';

const CreateBusinessAccountStepTwo: FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-[2.25rem] text-center">
        <h1 className="text-[1.313rem] text-daabo-black">Create Account</h1>
        <p className="text-[1.313rem] text-daabo-grey">Glad to welcome you</p>
      </div>
      <StepTwoForm />
    </div>
  );
};

export default CreateBusinessAccountStepTwo;
