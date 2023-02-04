//import AuthNavigation from 'components/lib/forms/auth-navigation';
import BusinessLoginForm from 'components/lib/login/login-form';
//import AuthIcon from 'components/lib/forms/auth-icon';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const Login: NextPageWithLayoutProps = () => {
  return (
    <>
      <Seo title="Login" description="Login to your Daabo account" />
      <div className="flex flex-col bg-daabo-white pt-[40px] pb-[40px]">
        <AuthIcon />
        <div className="mt-8 text-center">
          
          <h1 className="mx-auto mt-[13px] w-[250px] text-[18px] font-semibold text-daabo-grey sm:mx-0 sm:w-full sm:text-[21px]">
            Enter your account details to log in
          </h1>
        </div>
        <BusinessLoginForm />
      </div>
    </>
  );
};

Login.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default Login;
