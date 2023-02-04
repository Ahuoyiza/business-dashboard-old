import { EmailNotification } from 'components/icons';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const EmailVerificationNotification: NextPageWithLayoutProps = () => {
  return (
    <>
      <Seo
        title="Email Verification Sent"
        description="Confirm your email to complete account setup"
      />
      <div className="flex flex-col items-center bg-daabo-white pt-[10.188rem] pb-[10.813rem]">
        <div className="mb-[3.625rem]">
          <EmailNotification className="fill-[#CAC2F7]" />
        </div>
        <div className="mb-[3.375rem] space-y-[1.188rem]">
          <p className="text-center text-[1.313rem] font-[600] text-daabo-black">
            Confirm your email to complete account setup
          </p>
          <p className="text-center text-daabo-grey">
            A verification email has been sent to your registered email
          </p>
        </div>
      </div>
    </>
  );
};

EmailVerificationNotification.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default EmailVerificationNotification;
