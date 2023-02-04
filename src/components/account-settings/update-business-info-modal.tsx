import { FC, Fragment } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import InputField from 'components/lib/forms/input-field';
import { useMutation } from 'react-query';
import { toast } from 'react-toastify';
import { SubmitHandler, useForm } from 'react-hook-form';
import { updateUserData } from 'lib/requests';
import { useAuth } from 'components/lib/auth';
import Button from 'components/lib/button';

interface Props {
  isOpen: boolean;
  closeModal: () => void;
}

interface Inputs {
  company_name: string;
  phone_number: string;
  address: string;
}

const UpdateBusinessInfoModal: FC<Props> = ({ closeModal, isOpen }) => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();
  const { user } = useAuth();
  const { mutate, isLoading } = useMutation(updateUserData, {
    onError: () => {
      toast.error('Failed to update profile');
    },
    onSuccess: (data) => {
      if (data && data.status) window.location.reload();
      else {
        toast.error(data?.message || 'Failed to update profile');
      }
    },
  });

  const handleUpdate = (userData: Inputs) => {
    const formData = new FormData();
    let isEmpty = true;
    Object.entries(userData).forEach((entry) => {
      if (entry[1] !== '') {
        formData.append(entry[0], entry[1]);
        isEmpty = false;
      }
    });

    if (!isEmpty) mutate(formData);
  };

  const onsubmit: SubmitHandler<Inputs> = (data) => {
    handleUpdate(data);
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto bg-black bg-opacity-50"
        onClose={closeModal}
      >
        <div className="min-h-screen px-4 text-center">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0" />
          </Transition.Child>

          {/* This element is to trick the browser into centering the modal contents. */}
          <span className="inline-block h-screen align-middle" aria-hidden="true">
            &#8203;
          </span>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <form
              onSubmit={handleSubmit(onsubmit)}
              className="my-4 inline-block transform overflow-hidden rounded-xl bg-white py-6 px-5 text-left align-middle shadow-xl transition-all md:my-8 md:py-10 md:px-10"
            >
              <Dialog.Title
                as="h3"
                className="text-xl font-medium leading-6 text-daabo-black sm:text-2xl"
              >
                Update Profile
              </Dialog.Title>

              <div className="my-5 md:my-7">
                <div className="grid gap-2 md:grid-cols-1">
                  <div>
                    <InputField
                      reactHookOptions={{
                        register: register,
                        options: {
                          minLength: 6,
                          pattern:
                            /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/,
                        },
                        error: errors.company_name,
                      }}
                      type="text"
                      name="company_name"
                      placeholder="Business/Company Name"
                      ClassName="w-full bg-white pl-3 pr-7 h-[50px] lg:w-[400px] rounded-[7px] text-[13px] border-2 border-daabo-light-grey placeholder-daabo-grey focus:border-daabo-primary outline-none transition-all duration-100 ease-in font-bold"
                      defaultValue={user?.name}
                      descriptiveName="business name"
                    />
                  </div>
                  <div>
                    <InputField
                      reactHookOptions={{
                        register: register,
                        options: {
                          minLength: 11,
                          maxLength: 15,
                        },
                        error: errors.phone_number,
                      }}
                      name="phone_number"
                      type="tel"
                      placeholder="Phone Number"
                      ClassName="w-full bg-white pl-3 pr-7 h-[50px] lg:w-[400px] rounded-[7px] text-[13px] border-2 border-daabo-light-grey placeholder-daabo-grey focus:border-daabo-primary outline-none transition-all duration-100 ease-in font-bold"
                      defaultValue={user?.phoneNumber}
                    />
                  </div>
                  <div>
                    <InputField
                      reactHookOptions={{
                        register: register,
                        error: errors.address,
                      }}
                      type="text"
                      placeholder="Address"
                      name="address"
                      ClassName="w-full bg-white pl-3 pr-7 h-[50px] lg:w-[400px] rounded-[7px] text-[13px] border-2 border-daabo-light-grey placeholder-daabo-grey outline-none focus:border-daabo-primary transition-all duration-100 ease-in font-bold"
                      defaultValue={user?.address}
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4 flex items-center space-x-2 lg:space-x-4">
                <Button
                  type="submit"
                  loading={isLoading}
                  className="h-[42px] w-[9.063rem] normal-case"
                >
                  Update Profile
                </Button>
                <button
                  type="button"
                  className="inline-flex justify-center rounded-md border border-transparent bg-white px-4 py-2 text-xs font-medium text-daabo-primary focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 md:text-sm"
                  onClick={closeModal}
                >
                  Cancel
                </button>
              </div>
            </form>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateBusinessInfoModal;
