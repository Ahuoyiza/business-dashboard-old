import { FC } from 'react';
import { ServerErrorIllustration } from 'components/illustrations';

const ServerError: FC = () => {
  const contactUs = (): void => {
    const mailLink: string = 'mailto:support@getdaabo.com';
    window.open(mailLink, '_blank')?.focus();
  };

  return (
    <div role="alert" className="my-[3rem] flex flex-col items-center">
      <div>
        <ServerErrorIllustration className="h-[15rem] w-[22rem]" />
      </div>
      <div className="mt-[2rem] space-y-3 text-center">
        <h1 className="text-[1.8rem] font-bold">Internal Server Error</h1>
        <p className="mx-auto text-[0.98rem]">
          Sorry, there were some technical issues while processing your request.
        </p>
      </div>
      <button
        onClick={contactUs}
        className="daabo-primary-button my-10 py-[1rem] px-[3rem] text-[1rem] font-semibold uppercase"
      >
        contact us
      </button>
    </div>
  );
};

export default ServerError;
