import DeviceTable from 'components/devices/device-table';
import NoDevice from 'components/devices/no-device';
import { FC } from 'react';
import { BusinessDevice } from 'typings';

interface ActiveDevicesProps {
  devices: BusinessDevice[];
  isLoading: boolean;
  removeDeviceMutation: any;
}

const ActiveDevices: FC<ActiveDevicesProps> = ({ devices, isLoading, removeDeviceMutation }) => {
  return (
    <div className="my-5">
      {devices.length == 0 ? (
        <NoDevice />
      ) : (
        <div className="grid gap-5 md:mt-0 md:grid-cols-1 md:gap-5">
          {/* <DeviceSummary counts={devicesCount} /> */}
          {/* <SearchBar /> */}
          <div className="grid grid-cols-1 gap-4">
            <DeviceTable
              data={devices}
              isLoading={isLoading}
              onRemoveDevice={(id) => removeDeviceMutation.mutate(id)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default ActiveDevices;
