import { FC } from 'react';

type AddDevicesSummaryProps = {
  total: number;
  deviceValueCount: [number, number, number, number];
};

const AddDevicesSummary: FC<AddDevicesSummaryProps> = ({ total, deviceValueCount }) => {
  return (
    <div className="boder-[#c4c4c4] mt-6 mb-9 flex items-center gap-12 rounded-lg border px-7 py-2">
      <span className="font-medium">Summary</span>
      <div className="flex flex-grow flex-col items-center">
        <div className="text-xs font-medium text-daabo-grey">Total Devices</div>
        <span className="text-[2.5rem] font-semibold">{total}</span>
      </div>
      <div className="flex flex-grow flex-col items-center">
        <div className="flex flex-col items-center text-xs font-medium text-daabo-grey">
          <span>Device Value</span>
          <span>(0 - 100,000)</span>
        </div>
        <span className="text-[2.5rem] font-semibold">{deviceValueCount[0]}</span>
      </div>
      <div className="flex flex-grow flex-col items-center">
        <div className="flex flex-col items-center text-xs font-medium text-daabo-grey">
          <span>Device Value</span>
          <span>(100,001 - 350,000)</span>
        </div>
        <span className="text-[2.5rem] font-semibold">{deviceValueCount[1]}</span>
      </div>
      <div className="flex flex-grow flex-col items-center">
        <div className="flex flex-col items-center text-xs font-medium text-daabo-grey">
          <span>Device Value</span>
          <span>(350,001 - 600,000)</span>
        </div>
        <span className="text-[2.5rem] font-semibold">{deviceValueCount[2]}</span>
      </div>
      <div className="flex flex-grow flex-col items-center">
        <div className="flex flex-col items-center text-xs font-medium text-daabo-grey">
          <span>Device Value</span>
          <span>(600,001 - above)</span>
        </div>
        <span className="text-[2.5rem] font-semibold">{deviceValueCount[3]}</span>
      </div>
    </div>
  );
};

export default AddDevicesSummary;
