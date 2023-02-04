import AuthNavigation from 'components/lib/forms/auth-navigation';
import { MessageSent } from 'components/icons';
import EmailConfirmation from 'components/email-sent/email-confirmation';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const EmailSent: NextPageWithLayoutProps = () => {
  return (
    <>
      <Seo title="Email Sent" />
      <div className="flex flex-col items-center bg-daabo-white pt-[40px] pb-[40px]">
        <AuthNavigation hideRestartButton />
        <MessageSent />
        <EmailConfirmation />
      </div>
    </>
  );
};

EmailSent.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default EmailSent;
