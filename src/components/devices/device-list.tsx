import { Laptop, Mobile } from 'components/icons';
import DevicesSkeleton from 'components/devices/devices-skeleton';
import { motion } from 'framer-motion';
import { FC } from 'react';

type DeviceListProps = {
  devices: any[];
  selected: string;
  isLoading?: boolean;
  onSelect: (selected: string) => void;
};

const DeviceList: FC<DeviceListProps> = ({ devices, selected, isLoading = false, onSelect }) => {
  if (isLoading) {
    return (
      <div className="order-2 mt-6 flex w-full flex-col gap-10">
        <DevicesSkeleton count={5} />
      </div>
    );
  }

  return (
    <div className="order-2 flex w-full flex-col gap-10">
      {devices?.map((device) => (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          aria-selected={device.id === selected}
          key={device.id}
          className={`relative cursor-pointer rounded-xl border-2 bg-[#fcfcfc] py-3 px-6 ${
            selected === device.id ? 'border-[#4caf50]' : 'border-[#c4c4c4]'
          } flex items-center gap-4 after:absolute after:bottom-4 after:right-4 after:h-[0.375rem] 
          after:w-[0.375rem] after:rounded-full after:bg-[#4caf50] after:[content:'']  ${
            device.status !== '1' && 'after:hidden'
          } hover:border-[#4caf50]`}
          onClick={() => onSelect(device.id)}
        >
          {device.deviceType?.deviceCategory === 'mobile' ? (
            <span className="p-[0.425rem]">
              <Mobile className="text-[2rem] text-daabo-black" />
            </span>
          ) : (
            <Laptop className="text-[2.85rem] text-daabo-black" />
          )}
          <div className="flex flex-col gap-y-1">
            <div className="mb-1 flex items-center justify-between">
              <div className="text-[0.838rem] font-semibold uppercase">{device.brand}</div>
              {/* device?.missingDevice && (
                <div className="absolute right-[4px] rounded-[4px] bg-[#C70101] px-[0.525rem] py-[0.175rem] text-[0.750rem] font-semibold uppercase text-white">
                  missing
                </div>
              ) */}
            </div>
            <span className="text-xs font-medium text-daabo-grey">{device.deviceModel}</span>
            <span className="text-xs font-medium text-daabo-grey">
              Device ID - {device.deviceHash}
            </span>
            <span className="text-xs font-medium text-[#4caf50]">
              {device.status === '1' ? 'Active' : <br />}
            </span>
          </div>
        </motion.div>
      ))}
    </div>
  );
};

export default DeviceList;
