import { EmailNotification } from 'components/icons';
import Button from 'components/lib/button';
import Seo from 'lib/seo';
import { useRouter } from 'next/router';
import routes from 'routes';
import { NextPageWithLayoutProps } from 'typings';

const EmailVerificationComplete: NextPageWithLayoutProps = () => {
  const router = useRouter();

  const goToLoginPage = () => {
    router.push(routes.LOGIN);
  };

  return (
    <>
      <Seo
        title="Email Verification Complete"
        description="Your account has been verified on our platform."
      />
      <div className="flex flex-col items-center bg-daabo-white pt-[10.188rem] pb-[10.813rem]">
        <div className="mb-[3.625rem]">
          <EmailNotification className="fill-[#CAC2F7]" />
        </div>
        <div className="mb-[3.375rem] space-y-[1.188rem]">
          <p className="text-center text-[1.313rem] font-[600] text-daabo-black">
            Your Account has been verified, welcome on board.
          </p>
          <p className="text-center text-daabo-grey">
            You can now log-in and access your dashboard. Thank you.
          </p>
        </div>
        <div>
          <Button onClick={goToLoginPage} className="h-[45px] w-[10.063rem]">
            Login
          </Button>
        </div>
      </div>
    </>
  );
};

EmailVerificationComplete.layoutProps = {
  hideSideBar: true,
};

export default EmailVerificationComplete;
