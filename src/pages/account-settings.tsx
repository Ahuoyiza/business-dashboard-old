import SettingsTabs from 'components/account-settings/settings-tabs';
import { useRouter } from 'next/router';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';

const BusinessAccountSettings: NextPageWithLayoutProps = () => {
  const { query } = useRouter();

  return (
    <>
      <Seo title="Account Settings" description="Manage your account" />
      <div className="w-full py-12">
        <div className="mb-[3.313rem] space-y-[0.500rem]">
          <h1 className="text-[1.125rem] font-[600] leading-[1.688rem]">Settings</h1>
          <p className="text-[0.750rem]">
            You have full control to manage your own account setting.
          </p>
        </div>
        <SettingsTabs defaultTab={query.tab as any} />
      </div>
    </>
  );
};

BusinessAccountSettings.layoutProps = {
  isAuthenticated: true,
};

export default BusinessAccountSettings;
