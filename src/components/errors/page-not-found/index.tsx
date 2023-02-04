import { FC } from 'react';
import { PageNotFoundIllustration } from 'components/illustrations';

const PageNotFound: FC = () => {
  const goToDashboard = (): void => {
    window.location.href = '/';
  };

  return (
    <div role="alert" className="my-[3rem] flex flex-col items-center">
      <div>
        <PageNotFoundIllustration className="h-[15rem] w-[22rem]" />
      </div>
      <div className="mt-[2rem] space-y-3 text-center">
        <h1 className="text-[1.8rem] font-bold">Page not found!</h1>
        <p className="mx-auto text-[0.98rem]">
          Sorry we couldn&#39;t find the page you are looking for.
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

export default PageNotFound;
