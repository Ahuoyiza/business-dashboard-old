import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useCallback, useState } from 'react';
import { AddDeviceInfo } from 'typings';
import snakeCaseToCapitalized from 'utils/snakeCaseToCapitalized';

type ViewAddDeviceProps = {
  isOpen: boolean;
  closeModal: () => void;
  data?: AddDeviceInfo;
};

const ViewAddDeviceModal: FC<ViewAddDeviceProps> = ({ closeModal, isOpen, data }) => {
  return (
    <Transition as={Fragment} show={isOpen}>
      <Dialog as="div" className="fixed inset-0 z-10 overflow-y-auto" onClose={closeModal}>
        <div className="flex min-h-screen items-center justify-center px-4 text-center">
          <Dialog.Overlay className="fixed inset-0 bg-black backdrop-blur [--tw-bg-opacity:0.3] [--tw-backdrop-blur:blur(21px)]" />
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-[#fcfcfc] px-14 py-14 align-middle transition-all">
              <Dialog.Title as="div" className="flex justify-center">
                <h6 className="font-semibold">View Device</h6>
              </Dialog.Title>
              <div className="mt-8 flex flex-col gap-8 pl-1 text-daabo-grey">
                <div className="flex justify-between">
                  <span className="font-medium">User</span>
                  <span>{data?.user_fullname}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">User Email</span>
                  <span>{data?.user_email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">User Phone Number</span>
                  <span>{data?.user_phone_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Device Type</span>
                  <span>{snakeCaseToCapitalized(data?.device_type || '')}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Brand</span>
                  <span>{data?.brand}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Model</span>
                  <span>{data?.device_model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">IMEI/Serial Number</span>
                  <span>{data?.imei_number}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Motherboard</span>
                  <span>{data?.motherboard}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">RAM</span>
                  <span>{data?.ram}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Device Value</span>
                  <span>
                    {Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                      parseFloat(data?.cost_of_device || '0')
                    )}
                  </span>
                </div>
                <div className="flex flex-col items-start text-left">
                  <span className="font-medium">Device Condition</span>
                  <span>{data?.device_condition}</span>
                </div>
              </div>
              <div className="mt-9 flex justify-center">
                <button
                  type="button"
                  className="daabo-secondary-button flex items-center gap-1 px-12"
                  onClick={closeModal}
                >
                  <span>Close</span>
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export const useViewAddDeviceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<AddDeviceInfo>();
  const show = useCallback((data: AddDeviceInfo) => {
    setData(data);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    modal: (
      <ViewAddDeviceModal
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen && Boolean(data)}
        data={data}
      />
    ),
    show,
    close,
  };
};

export default ViewAddDeviceModal;
