import Link from 'next/link';
import SecurityShieldIcon from 'components/lib/forms/security-shield-icon';
import routes from 'routes';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const ResetPasswordSuccessful: NextPageWithLayoutProps = () => {
  return (
    <>
      <Seo title="Password Reset Successful" description="" />
      <div className="flex flex-col items-center bg-daabo-white pt-[90px] pb-[40px]">
        <SecurityShieldIcon />
        <h1 className="mt-[1.250rem] text-[1.313rem] font-bold text-daabo-black">
          Reset successful
        </h1>
        <p className="mt-[0.938rem] text-daabo-grey">
          You have successfully created a new password
        </p>
        <Link href={routes.LOGIN}>
          <a className="mt-[4.313rem] h-[2.813rem] w-[174px] rounded-[7px] bg-daabo-primary pt-3 text-center text-[15px] font-semibold uppercase text-white transition-opacity hover:opacity-90">
            Log in
          </a>
        </Link>
      </div>
    </>
  );
};

ResetPasswordSuccessful.layoutProps = {
  isAuthenticated: true,
  disableLogoutAfterTimeout: true,
};

export default ResetPasswordSuccessful;
