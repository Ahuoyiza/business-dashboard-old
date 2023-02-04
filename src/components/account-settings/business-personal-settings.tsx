import { useAuth } from 'components/lib/auth';
import { FC, useState } from 'react';
import PersonalInfo from './personal-info';
import UpdateBusinessInfoModal from './update-business-info-modal';

const BusinessPersonalSettings: FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user } = useAuth();

  const closeModal = (): void => {
    setIsOpen(false);
  };

  const openModal = (): void => {
    setIsOpen(true);
  };

  return (
    <>
      <div className="flex w-full flex-col rounded-lg bg-white">
        <PersonalInfo openModal={openModal} fieldName="Company/Business Name" value={user?.name} />
        <PersonalInfo openModal={openModal} fieldName="Phone Number" value={user?.phoneNumber} />
        <PersonalInfo openModal={openModal} fieldName="Address" value={user?.address} />
      </div>
      <div>
        <UpdateBusinessInfoModal isOpen={isOpen} closeModal={closeModal} />
      </div>
    </>
  );
};

export default BusinessPersonalSettings;
