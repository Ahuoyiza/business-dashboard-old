import Button from 'components/lib/button';
import SearchBar from 'components/lib/forms/search-bar';
import { batchAddDevice, getDeviceSubscriptions } from 'lib/requests';
import { useRouter } from 'next/router';
import Papa from 'papaparse';
import { FC, useEffect, useState } from 'react';
import { MdOutlineClose } from 'react-icons/md';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import routes from 'routes';
import { AddDeviceInfo } from 'typings';
import AddDevicesSummary from './add-devices-summary';
import AddDevicesSummaryTable from './add-devices-summary-table';

type AddDevicesPreviewProps = {
  data: AddDeviceInfo[];
};

const stringToFileCsv = (str: string, filename: string): File => {
  const blob = new Blob([str], { type: 'text/csv' });
  const file = new File([blob], filename, { type: 'text/csv' });
  return file;
};

const AddDevicesPreview: FC<AddDevicesPreviewProps> = ({ data }) => {
  const router = useRouter();
  const [subscriptionId, setSubscriptionId] = useState('');
  const queryClient = useQueryClient();
  const { data: deviceSubscriptions } = useQuery(['business', 'plan'], () =>
    getDeviceSubscriptions().then((data) =>
      data?.content?.filter((sub) => sub.userType === 'company')
    )
  );

  useEffect(() => {
    setSubscriptionId(deviceSubscriptions?.at(0)?.id || '');
  }, [deviceSubscriptions]);

  const addDeviceMutation = useMutation(
    (deviceData: Parameters<typeof batchAddDevice>[0]) => batchAddDevice(deviceData),
    {
      onSuccess: (data) => {
        if (data.authorization_url) {
          window.open(data.authorization_url, '_blank', 'popup');
        } else {
          toast.success('Device added');
        }
        router.push(routes.DEVICES);
        queryClient.invalidateQueries('business-devices');
      },
      onError: () => {
        toast.error('Error adding device');
      },
    }
  );

  const deviceValueCount = data.reduce<[number, number, number, number]>(
    (arr, curr) => {
      if (parseFloat(curr.cost_of_device) < 100_001) arr[0]++;
      else if (parseFloat(curr.cost_of_device) < 350_001) arr[1]++;
      else if (parseFloat(curr.cost_of_device) < 600_001) arr[2]++;
      else arr[3]++;

      return arr;
    },
    [0, 0, 0, 0]
  );

  return (
    <div className="relative w-[74%] rounded-lg bg-[#fcfcfc] px-[4.25rem] py-14">
      <button
        className="absolute top-4 right-4"
        aria-label="Go back to devices"
        onClick={() => router.back()}
      >
        <MdOutlineClose />
      </button>
      <h4 className="section-heading">Add Devices</h4>
      <div className="mt-7 flex gap-16 font-semibold">
        <label className="flex items-center gap-4">
          <span>Subscription</span>
          <select
            value={subscriptionId}
            onChange={(ev) => setSubscriptionId(ev.target.value)}
            className="w-full rounded-lg border border-daabo-grey bg-transparent px-4 py-2 focus-visible:outline-daabo-primary"
          >
            {deviceSubscriptions?.map((sub) => (
              <option key={sub.id} value={sub.id || ''}>
                {`${sub.plan?.planName} - ${sub.subscriptionName}`}
              </option>
            ))}
          </select>
        </label>
      </div>
      <AddDevicesSummary total={data.length} deviceValueCount={deviceValueCount} />
      <SearchBar className="bg-[#f3f3f3]" />
      <div className="mt-9">
        <AddDevicesSummaryTable data={data} />
      </div>
      <div className="mt-16 flex justify-center">
        <Button
          className="px-32 py-4 text-base font-medium capitalize"
          loading={addDeviceMutation.isLoading}
          onClick={() => {
            const csv = Papa.unparse(data);
            const file = stringToFileCsv(csv, 'devices.csv');
            addDeviceMutation.mutate({
              companyDevicesPath: file,
              subscriptionId: subscriptionId,
            });
          }}
        >
          Submit
        </Button>
      </div>
    </div>
  );
};

export default AddDevicesPreview;
