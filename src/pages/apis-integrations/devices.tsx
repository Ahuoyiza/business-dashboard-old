import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';
import DevicesTabs from 'components/apis-integrations/devices/devices-tabs';
import { useRouter } from 'next/router';

const Devices: NextPageWithLayoutProps = () => {
  const { query } = useRouter();

  return (
    <>
      <Seo title="Devices" description="Manage your devices" />
      <div>
        <div className="w-full py-12">
          <div className="mb-[2.750rem] flex flex-col items-start justify-between gap-y-3 sm:flex-row">
            <div className="flex flex-col gap-2">
              <h1 className="section-heading">Devices</h1>
              <span className="section-sub-heading">Here is a list of your devices.</span>
            </div>
          </div>
          <DevicesTabs defaultTab={query.tab as any} />
        </div>
      </div>
    </>
  );
};

Devices.layoutProps = {
  isAuthenticated: true,
};

export default Devices;
