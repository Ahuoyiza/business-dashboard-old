import { Dialog, Transition } from '@headlessui/react';
import { FC, Fragment, useState } from 'react';
import { PaymentDetail } from 'typings';

type PaymentDetailCardProps = {
  details: PaymentDetail;
};

const PaymentDetailCard: FC<PaymentDetailCardProps> = ({ details }) => {
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
                <Dialog.Title as="div" className="flex justify-between">
                  <h6 className="font-semibold">Details</h6>
                </Dialog.Title>
                <div className="mt-8 flex flex-col gap-8 pl-1 text-daabo-grey">
                  <div className="flex justify-between">
                    <span className="font-medium">Reference Number</span>
                    <span>{details.referenceNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Amount</span>
                    <span>
                      {Intl.NumberFormat('en-NG', { currency: 'NGN', style: 'currency' }).format(
                        parseFloat(details.amount)
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Status</span>
                    <span>{details.paymentStatus === '1' ? 'Successful' : 'Failed'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date</span>
                    <span>{new Date(details.dateCreated).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Method</span>
                    <span>{details.paymentMethod || 'N/A'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Email</span>
                    <span>{details.userEmail}</span>
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
    </>
  );
};

export default PaymentDetailCard;
