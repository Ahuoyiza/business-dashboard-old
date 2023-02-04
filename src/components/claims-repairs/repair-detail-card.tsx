import { Dialog } from '@headlessui/react';
import { IconlyMessage, IconlyPaperDownload, IconlyTimeCircle } from 'components/icons';
import { FC, useState } from 'react';
import { BiX } from 'react-icons/bi';

type RepairDetailCardProps = {
  id: string;
};

const RepairDetailCard: FC<RepairDetailCardProps> = ({ id }) => {
  const [isOpen, setIsOpen] = useState(false);

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <>
      <button className="daabo-secondary-button" onClick={openModal}>
        View
      </button>
      <Dialog
        open={isOpen}
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        onClose={closeModal}
      >
        <div className="flex min-h-screen items-center justify-center px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
          <div className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-[#fcfcfc] pb-20 align-middle transition-all">
            <Dialog.Title
              as="div"
              className="flex justify-between border border-[#dadada] px-[2.5rem] pt-5 pb-4"
            >
              <h6 className="font-semibold">Repair</h6>
              <button onClick={closeModal}>
                <BiX className="cursor-pointer text-2xl" />
              </button>
            </Dialog.Title>
            <div className="mt-8 flex w-full flex-col gap-8 px-[2.5rem]">
              <div className="flex flex-col items-start">
                <span className="justify-start font-medium">Samsung SJ40</span>
                <span className="text-xs text-daabo-grey">15 Oct, 2019 09:45 PM</span>
              </div>
              <div className="flex flex-col items-start">
                <span className="justify-start font-medium">Claim/Repair Info</span>
                <div className="grid grid-cols-2 gap-8 text-xs text-daabo-grey">
                  <div className="flex flex-col items-start">
                    <span>Order ID</span>
                    <span>YWLX52JG73</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span>Device Id</span>
                    <span>NIY9TB2JG73YWLXPYM2U8HR</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span>Reason</span>
                    <span>Screen Damage</span>
                  </div>
                  <div className="flex flex-col items-start">
                    <span>Plan</span>
                    <span>Monthly</span>
                  </div>
                </div>
                <div className="mt-8 flex flex-col items-start">
                  <span className="justify-start font-medium">Claim/Repair Details</span>
                  <div className="grid grid-cols-2 gap-8 text-left text-xs text-daabo-grey">
                    <div className="flex flex-col items-start">
                      <span>Date of Incidence</span>
                      <span className="font-medium">12/09/2021</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span>Has this occured to this device before?</span>
                      <span className="font-medium">No</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span>Has this device been fixed before?</span>
                      <span className="font-medium">Yes</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span>Where did the incident happen?</span>
                      <span className="font-medium">Alabama, USA</span>
                    </div>
                    <div className="flex flex-col items-start">
                      <span>Your current location:</span>
                      <span className="font-medium">Ikeja, Lagos</span>
                    </div>
                  </div>
                  <div className="mt-8 flex flex-col items-start text-xs text-daabo-grey">
                    <span>Details:</span>
                    <p className="font-medium">I was going some where and it fell on the floor</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Dialog>
    </>
  );
};

export default RepairDetailCard;
