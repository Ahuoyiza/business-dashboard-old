import React, { FC } from 'react';

type DeviceReportCardProps = {
  title: string;
  insuredDevicesCount: number;
};

const DeviceReportCard: FC<DeviceReportCardProps> = ({ insuredDevicesCount, title }) => {
  return (
    <div className="flex h-[170px] flex-col justify-between rounded-[0.500rem] bg-white px-[1.313rem] py-[0.625rem] shadow-[0px_2px_7px_rgba(0,0,0,0.12)]">
      <div className="text-[1rem] font-bold text-daabo-black">{title}</div>
      <div className="text-[0.875rem] text-daabo-grey">in the last 30 days</div>
      <div className="text-[1rem] font-bold text-daabo-black">{insuredDevicesCount} Insured</div>
    </div>
  );
};

export default DeviceReportCard;
