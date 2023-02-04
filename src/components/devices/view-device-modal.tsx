import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useCallback, useState } from 'react';
import { BusinessDevice } from 'typings';

type ViewDeviceProps = {
  isOpen: boolean;
  closeModal: () => void;
  data?: BusinessDevice;
};

const ViewDeviceModal: FC<ViewDeviceProps> = ({ closeModal, isOpen, data }) => {
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
                  <span className="font-medium">ID</span>
                  <span>{data?.deviceHash}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Description</span>
                  <span>
                    {data?.brand} {data?.deviceModel}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Amount</span>
                  <span>
                    {Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
                      parseFloat(data?.costOfDevice || '0')
                    )}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Status</span>
                  <span>{data?.status === '1' ? 'Active' : 'Inactive'}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Date</span>
                  <span>
                    {data?.dateCreated &&
                      Intl.DateTimeFormat('en-NG').format(Date.parse(data?.dateCreated))}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Device User</span>
                  <span>{data?.userFullName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="font-medium">Email</span>
                  <span>{data?.userEmail}</span>
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

export const useViewDeviceModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [data, setData] = useState<BusinessDevice>();
  const show = useCallback((data: BusinessDevice) => {
    setData(data);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    modal: (
      <ViewDeviceModal
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen && Boolean(data)}
        data={data}
      />
    ),
    show,
    close,
  };
};

export default ViewDeviceModal;
