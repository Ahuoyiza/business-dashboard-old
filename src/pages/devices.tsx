import { BsPlusSquareFill } from 'react-icons/bs';
import NoDevice from 'components/devices/no-device';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { getDevices, removeDevice } from 'lib/requests';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';
import DeviceSummary from 'components/devices/device-summary';
import SearchBar from 'components/lib/forms/search-bar';
import DeviceTable from 'components/devices/device-table';
import { useRouter } from 'next/router';
import routes from 'routes';
import { toast } from 'react-toastify';

const Devices: NextPageWithLayoutProps = () => {
  const router = useRouter();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery('business-devices', () => getDevices());
  const removeDeviceMutation = useMutation((deviceId: string) => removeDevice(deviceId), {
    onSuccess: () => {
      toast.success('Device removed successfully');
      queryClient.invalidateQueries('business-devices');
    },
    onError: () => {
      toast.error('Error removing device');
    },
  });

  const devices = data?.content || [];

  const devicesCount = devices.reduce(
    (acc, device) => {
      switch (device.subscription.planId) {
        case 'Device Insurance':
          acc.insurancePlan++;
          break;
        case 'Device Security':
          acc.securityPlan++;
          break;
      }

      switch (device.status) {
        case '1':
          acc.activeDevices++;
          break;
        case '0':
          acc.inactiveDevices++;
          break;
      }

      return acc;
    },
    {
      devices: devices.length,
      securityPlan: 0,
      insurancePlan: 0,
      activeDevices: 0,
      inactiveDevices: 0,
    }
  );

  return (
    <>
      <Seo title="Devices" description="Manage your devices" />
      <div>
        <div className="w-full py-12">
          <div className="mb-[2.750rem] flex flex-col items-start justify-between gap-y-3 sm:flex-row">
            <div className="flex flex-col gap-2">
              <h1 className="section-heading">Devices</h1>
              <span className="section-sub-heading">
                Here is list of devices that you have protected.
              </span>
            </div>
            <button
              className="daabo-primary-button flex items-center justify-center gap-[0.375rem]"
              onClick={() => router.push(routes.ADD_DEVICE)}
            >
              <BsPlusSquareFill className="text-base" />
              <span>Add device</span>
            </button>
          </div>
          {devices.length == 0 ? (
            <NoDevice />
          ) : (
            <div className="mt-4 grid gap-5 md:mt-0 md:grid-cols-1 md:gap-5">
              <DeviceSummary counts={devicesCount} />
              <SearchBar />
              <div className="grid grid-cols-1 gap-4">
                <h3 className="section-heading">Registered Devices</h3>
                <DeviceTable
                  data={devices}
                  isLoading={isLoading}
                  onRemoveDevice={(id) => removeDeviceMutation.mutate(id)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

Devices.layoutProps = {
  isAuthenticated: true,
};

export default Devices;
