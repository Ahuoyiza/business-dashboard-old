import { FC } from 'react';
import StepThreeForm from './step-three-form';

const CreateBusinessAccountStepThree: FC = () => {
  return (
    <div className="flex flex-col justify-center">
      <div className="mt-[2.25rem] text-center">
        <h1 className="text-[1.313rem] text-daabo-black">Create Account</h1>
        <p className="text-[1.313rem] text-daabo-grey">Glad to welcome you</p>
      </div>
      <StepThreeForm />
    </div>
  );
};

export default CreateBusinessAccountStepThree;
