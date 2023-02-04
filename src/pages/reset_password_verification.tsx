import AuthNavigation from 'components/lib/forms/auth-navigation';
import SecurityShieldIcon from 'components/lib/forms/security-shield-icon';
import ResetPasswordVerifcationForm from 'components/reset-password-verifcation/reset-password-verification-form';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const ResetPasswordVerification: NextPageWithLayoutProps = () => {
  return (
    <>
      <Seo title="Reset Password Verification" />
      <div className="flex flex-col items-center bg-daabo-white pt-[40px] pb-[40px]">
        <AuthNavigation hideRestartButton />
        <SecurityShieldIcon />
        <ResetPasswordVerifcationForm />
      </div>
    </>
  );
};

ResetPasswordVerification.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default ResetPasswordVerification;
