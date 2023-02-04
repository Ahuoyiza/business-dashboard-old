import { FC } from 'react';
import { FiChevronsDown } from 'react-icons/fi';

type DeviceSummaryProps = {
  counts: {
    devices: number;
    securityPlan: number;
    insurancePlan: number;
    activeDevices: number;
    // renewDevices: number;
    inactiveDevices: number;
  };
};

const DeviceSummary: FC<DeviceSummaryProps> = ({ counts }) => {
  return (
    <div className="grid grid-cols-2 overflow-auto rounded-lg border-[1.2px] border-[#c4c4c4] bg-[#fcfcfc] px-6 py-5 sm:flex lg:px-9">
      <div className="flex flex-grow flex-col items-center gap-4">
        <span className="text-xs font-medium text-daabo-grey">Devices</span>
        <span className="text-[2.5rem] font-semibold leading-6">{counts.devices}</span>
        <FiChevronsDown className="text-2xl text-daabo-grey" />
      </div>
      <div className="flex flex-grow flex-col items-center gap-4">
        <span className="text-xs font-medium text-daabo-grey">Security Plan</span>
        <span className="text-[2.5rem] font-semibold leading-6">{counts.securityPlan}</span>
        <FiChevronsDown className="text-2xl text-daabo-grey" />
      </div>
      <div className="flex flex-grow flex-col items-center gap-4">
        <span className="text-xs font-medium text-daabo-grey">Device Insurance Plan</span>
        <span className="text-[2.5rem] font-semibold leading-6">{counts.insurancePlan}</span>
        <FiChevronsDown className="text-2xl text-daabo-grey" />
      </div>
      <div className="flex flex-grow flex-col items-center gap-4">
        <span className="text-xs font-medium text-daabo-grey">Active Devices</span>
        <span className="text-[2.5rem] font-semibold leading-6">{counts.activeDevices}</span>
        <FiChevronsDown className="text-2xl text-daabo-grey" />
      </div>
      {/*  <div className="flex flex-grow flex-col items-center gap-4">
        <span className="text-xs font-medium text-daabo-grey">Renew Devices</span>
        <span className="text-[2.5rem] font-semibold leading-6">{counts.renewDevices}</span>
        <FiChevronsDown className="text-2xl text-daabo-grey" />
      </div> */}
      <div className="flex flex-grow flex-col items-center gap-4">
        <span className="text-xs font-medium text-daabo-grey">Inactive Devices</span>
        <span className="text-[2.5rem] font-semibold leading-6">{counts.inactiveDevices}</span>
        <FiChevronsDown className="text-2xl text-daabo-grey" />
      </div>
    </div>
  );
};

export default DeviceSummary;
