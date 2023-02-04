import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useCallback, useState } from 'react';

type RemoveDeviceModalProps = {
  isOpen: boolean;
  closeModal: () => void;
  onRemove: () => void;
};

const RemoveDeviceModal: FC<RemoveDeviceModalProps> = ({ closeModal, isOpen, onRemove }) => {
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
            <div className="inline-block w-full max-w-md transform overflow-hidden rounded-xl bg-[#1e1e1e] px-14 py-9 align-middle text-white transition-all">
              <Dialog.Title as="div" className="flex justify-center">
                <h6 className="text-lg font-extrabold">Remove</h6>
              </Dialog.Title>
              <div className="mt-5 text-white [--tw-text-opacity:0.9]">
                You are attempting to permanently remove this device from the registry.
              </div>
              <div className="mt-14 flex justify-between">
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md border border-daabo-white px-7 py-3 text-xs font-bold focus:outline-none"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="inline-flex items-center justify-center rounded-md bg-daabo-white px-7 py-3 text-xs font-bold text-daabo-black focus:outline-none"
                  onClick={() => {
                    onRemove();
                    closeModal();
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

type UseRemoveDeviceModalOptions = {
  onRemove: (id: string) => void;
};

export const useRemoveDeviceModal = ({ onRemove }: UseRemoveDeviceModalOptions) => {
  const [isOpen, setIsOpen] = useState(false);
  const [id, setId] = useState<string>();
  const show = useCallback((id: string) => {
    setId(id);
    setIsOpen(true);
  }, []);
  const close = useCallback(() => setIsOpen(false), []);

  return {
    modal: (
      <RemoveDeviceModal
        closeModal={() => setIsOpen(false)}
        isOpen={isOpen && Boolean(id)}
        onRemove={id ? () => onRemove(id) : () => {}}
      />
    ),
    show,
    close,
  };
};

export default RemoveDeviceModal;
