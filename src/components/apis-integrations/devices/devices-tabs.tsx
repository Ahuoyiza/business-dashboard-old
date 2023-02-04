import { FC } from 'react';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import { getDevices, removeDevice } from 'lib/requests';
import { useQueryClient, useQuery, useMutation } from 'react-query';
import { toast } from 'react-toastify';
import ActiveDevices from './active-devices/active-devices';
import InActiveDevices from './inactive-devices/inactive-devices';

const DevicesTabs: FC<{
  defaultTab?: 'active' | 'inactive';
}> = ({ defaultTab = 'active' }) => {
  let index = 0;

  switch (defaultTab) {
    case 'active':
      index = 1;
      break;
    case 'inactive':
      index = 0;
      break;
  }

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

  const activeDevices = data?.content.filter((device) => device.status === '1') || [];
  const inactiveDevices = data?.content.filter((device) => device.status !== '1') || [];

  return (
    <Tab.Group defaultIndex={index}>
      <Tab.List className="space-x-[2.688rem] border-b border-[#c4c4c4]">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-[2.75px] pb-[1.375rem] text-sm font-[500] outline-none sm:text-[0.938rem] ${
                selected
                  ? 'border-daabo-primary text-daabo-primary'
                  : 'border-[transparent] text-daabo-black'
              }`}
            >
              Active Devices
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-[2.75px] pb-[1.375rem] text-sm font-[500] outline-none sm:text-[0.938rem] ${
                selected
                  ? 'border-daabo-primary text-daabo-primary'
                  : 'border-[transparent] text-daabo-black'
              }`}
            >
              Inactive Devices
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="outline-none">
        <Tab.Panel className="outline-none">
          <ActiveDevices
            devices={activeDevices}
            isLoading={isLoading}
            removeDeviceMutation={removeDeviceMutation}
          />
        </Tab.Panel>
        <Tab.Panel>
          <InActiveDevices
            devices={inactiveDevices}
            isLoading={isLoading}
            removeDeviceMutation={removeDeviceMutation}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default DevicesTabs;
