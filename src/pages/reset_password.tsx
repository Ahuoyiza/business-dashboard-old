import AuthNavigation from 'components/lib/forms/auth-navigation';
import AuthIcon from 'components/lib/forms/auth-icon';
import ResetPasswordForm from 'components/reset-password/reset-password-form';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const ResetPassword: NextPageWithLayoutProps = () => {
  return (
    <>
      <Seo
        title="Reset Password"
        description="Enter your email and we'll send you a link to get back into your account."
      />
      <div className="flex flex-col bg-daabo-white pt-[40px] pb-[40px]">
        <AuthNavigation hideRestartButton />
        <AuthIcon />
        <ResetPasswordForm />
      </div>
    </>
  );
};

ResetPassword.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default ResetPassword;
