import AuthNavigation from 'components/lib/forms/auth-navigation';
import SecurityShieldIcon from 'components/lib/forms/security-shield-icon';
import CreateNewPasswordForm from 'components/create-password/create-password-form';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const CreateNewPassword: NextPageWithLayoutProps = () => {
  return (
    <>
      <Seo title="Create New Passord" />
      <div className="flex flex-col items-center bg-daabo-white pt-[40px] pb-[40px]">
        <AuthNavigation hideRestartButton />
        <SecurityShieldIcon />
        <CreateNewPasswordForm />
      </div>
    </>
  );
};

CreateNewPassword.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default CreateNewPassword;
