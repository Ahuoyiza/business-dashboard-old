import { FC, useState } from 'react';
import { BusinessDevice } from 'typings';
import NoDevice from 'components/devices/no-device';
import InactiveDeviceTable from './inactive-device-table';
import { initiateDeviceSubscriptionPayment } from 'lib/requests/integrations';
import { useMutation, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';

interface InActiveDevicesProps {
  devices: BusinessDevice[];
  isLoading: boolean;
  removeDeviceMutation: any;
}

const InActiveDevices: FC<InActiveDevicesProps> = ({
  devices,
  isLoading,
  removeDeviceMutation,
}) => {
  const [active, setActive] = useState(false);

  const [selectedDevices, setSelectedDevices] = useState<any[]>([]);
  const queryClient = useQueryClient();

  const getSelectedDevices = (devices: any[]) => {
    setSelectedDevices(devices);
  };

  const enableDeviceSubscriptionBtn = (active: boolean) => {
    setActive(active);
  };

  const initiatePaymentMutation = useMutation(
    (deviecesHash: string[]) => initiateDeviceSubscriptionPayment(deviecesHash),
    {
      onSuccess: (data: any) => {
        if (data) {
          window.open(data.authorization_url, '_blank', 'popup');
        } else {
          toast.error('Error initiating payment');
        }
      },
      onError: () => {
        toast.error('Error initiating payment');
      },
    }
  );

  const handlePayment = () => {
    const devicesHash = selectedDevices.map((device) => device.original.deviceHash) || [];
    initiatePaymentMutation.mutate(devicesHash);
  };

  return (
    <div className="my-5">
      {devices.length == 0 ? (
        <NoDevice />
      ) : (
        <div className="grid gap-5 md:mt-0 md:grid-cols-1 md:gap-5">
          <div className="grid grid-cols-1 gap-4">
            <p className="my-3 text-xs text-daabo-grey sm:text-sm">
              Select the devices you need to pay for device insurance.
            </p>
            <div className="flex justify-end">
              <button
                onClick={handlePayment}
                disabled={!active}
                className={`h-[40px] w-[11rem] rounded-lg px-3 text-sm font-semibold text-white ${
                  !active
                    ? 'bg-slate-600 opacity-40 hover:bg-slate-600'
                    : 'ripple-button bg-daabo-primary'
                }`}
              >
                {initiatePaymentMutation.isLoading ? 'Loading...' : 'Complete Payment'}
              </button>
            </div>
            <InactiveDeviceTable
              data={devices}
              isLoading={isLoading}
              onRemoveDevice={(id) => removeDeviceMutation.mutate(id)}
              enableSubscriptionBtn={enableDeviceSubscriptionBtn}
              getSelectedDevices={getSelectedDevices}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default InActiveDevices;
