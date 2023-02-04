import { ErrorIllustration } from 'components/illustrations';
import { FC } from 'react';

const ErrorFallback: FC = () => {
  const goToDashboard = (): void => {
    window.location.href = '/';
  };

  return (
    <div role="alert" className="my-[3rem] flex flex-col items-center">
      <div>
        <ErrorIllustration className="h-[15rem] w-[22rem]" />
      </div>
      <div className="mt-[2rem] space-y-3 text-center">
        <h1 className="text-[1.8rem] font-bold">Oops! Something went wrong!</h1>
        <p className="mx-auto text-[0.98rem] lg:w-[50%]">
          An unexpected error occurred. Our technical team has been notified. We&#39;re sorry for
          any inconvenience this might have caused you.
        </p>
      </div>
      <button
        onClick={goToDashboard}
        className="daabo-primary-button my-10 py-[1rem] px-[3rem] text-[1rem] font-semibold uppercase"
      >
        Go to dashboard
      </button>
    </div>
  );
};

export default ErrorFallback;
