import { FC } from 'react';
import BusinessPersonalSettings from './business-personal-settings';

const Personal: FC = () => {
  return (
    <div className="space-y-[1.813rem] py-[1.563rem]">
      <div className="space-y-[0.750rem]">
        <h2 className="text-[1.125rem] font-[500] text-daabo-black">Personal Information</h2>
        <p className="text-[0.750rem] text-[#5f5f5f]">Basic info, like your name and address.</p>
      </div>
      <BusinessPersonalSettings />
    </div>
  );
};

export default Personal;
