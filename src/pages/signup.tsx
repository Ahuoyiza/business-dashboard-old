import { useRouter } from 'next/router';
import AuthIcon from 'components/lib/forms/auth-icon';
import AuthNavigation from 'components/lib/forms/auth-navigation';
import BusinessAccountIcon from 'components/sign-up/icon';
import CreateBusinessAccountStepOne from 'components/sign-up/step-one';
import CreateBusinessAccountStepTwo from 'components/sign-up/step-two';
import CreateBusinessAccountStepThree from 'components/sign-up/step-three';
import SignupProvider from 'components/sign-up/context';
import Seo from 'lib/seo';
import { getSearchParams } from 'utils';
import { NextPageWithLayoutProps } from 'typings';

const components = [
  null, // empty placeholder for index 0
  <CreateBusinessAccountStepOne key="1" />,
  <CreateBusinessAccountStepTwo key="2" />,
  <CreateBusinessAccountStepThree key="3" />,
];

const SignUp: NextPageWithLayoutProps = () => {
  const router = useRouter();
  const query = getSearchParams(router.asPath);

  const step = parseInt(query.get('step') || '1');
  const component = components[step];

  return (
    <>
      <Seo title="Sign up" description="Create your Daabo account" />
      <div className="flex flex-col items-center bg-daabo-white pt-[2.5rem] pb-[2.5rem]">
        <AuthNavigation hidePreviousButton={step === 1} hideRestartButton={step === 1} />
        {step <= 2 && <AuthIcon />}
        <BusinessAccountIcon />
        <SignupProvider>{component}</SignupProvider>
      </div>
    </>
  );
};

SignUp.layoutProps = {
  hideSideBar: true,
  disableLogoutAfterTimeout: true,
};

export default SignUp;
