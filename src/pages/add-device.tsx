import AddDevicesInput from 'components/add-device/add-devices-input';
import AddDevicesPreview from 'components/add-device/add-devices-preview';
import { useState } from 'react';
import { AddDeviceInfo, NextPageWithLayoutProps } from 'typings';

const AddDevice: NextPageWithLayoutProps = () => {
  const [deviceInfo, setDeviceInfo] = useState<AddDeviceInfo[] | null>(null);

  return (
    <div className="flex min-h-full justify-center py-28">
      {!deviceInfo || deviceInfo.length === 0 ? (
        <AddDevicesInput onInput={setDeviceInfo} />
      ) : (
        <AddDevicesPreview data={deviceInfo} />
      )}
    </div>
  );
};

AddDevice.layoutProps = {
  hideSideBar: true,
  isAuthenticated: true,
};

export default AddDevice;
