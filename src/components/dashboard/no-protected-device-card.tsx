import { IconlyShield } from 'components/icons';
import Link from 'next/link';
import { FC } from 'react';
import routes from 'routes';

type NoProtectedDeviceCardProps = {
  devicesRoute?: string;
};

const NoProtectedDeviceCard: FC<NoProtectedDeviceCardProps> = ({
  devicesRoute = routes.DEVICES,
}) => {
  return (
    <div className="mt-8 flex w-full flex-col items-center gap-6 rounded-lg bg-daabo-black py-7 px-3 text-daabo-white shadow-[0px_2px_7px_rgba(0,0,0,0.12)] md:flex-row md:gap-12 md:px-6 lg:px-11">
      <IconlyShield className="text-[2rem] md:text-[3.875rem]" />
      <div className="w-full text-center md:text-left">
        <h5 className="text-lg font-semibold">Start your device protection journey now! </h5>
        <p className="mt-3 text-xs">
          With our protection plans, any loss, accidents, or damage done to your device is
          financially covered by us.
        </p>
      </div>
      <Link href={devicesRoute}>
        <a className="daabo-primary-button inline-flex justify-center md:w-[30%]">Start Here</a>
      </Link>
    </div>
  );
};

export default NoProtectedDeviceCard;
