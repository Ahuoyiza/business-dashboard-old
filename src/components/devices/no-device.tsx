import { FluentPhoneLaptop } from 'components/icons';
import { FC } from 'react';

const NoDevice: FC = () => {
  return (
    <div className="mt-[5.5rem] flex flex-col items-center gap-4">
      <FluentPhoneLaptop className="text-7xl" />
      <span className="section-sub-heading text-base">No device registered yet</span>
    </div>
  );
};

export default NoDevice;
