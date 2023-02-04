import { IconlyShield } from 'components/icons';
import { FC } from 'react';

type TotalInsuredDevicesCardProps = {
  devicesCount: number;
};

const TotalInsuredDevicesCard: FC<TotalInsuredDevicesCardProps> = ({ devicesCount }) => {
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-6 rounded-lg bg-daabo-black py-7 px-3 text-daabo-white shadow-[0px_2px_7px_rgba(0,0,0,0.12)] md:flex-row md:gap-12 md:px-6 lg:px-11">
      <IconlyShield className="text-[2rem] md:text-[3.875rem] lg:text-[4.8rem]" />
      <div className="w-full text-center md:text-left">
        <h5 className="text-lg font-semibold">Total Devices Insured</h5>
        <p className="mt-3 text-xs text-[1.4rem] text-daabo-white">
          {Number(devicesCount).toLocaleString() || 0}
        </p>
      </div>
    </div>
  );
};

export default TotalInsuredDevicesCard;
