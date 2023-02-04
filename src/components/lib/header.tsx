import { FC, Fragment, useState } from 'react';
import Image from 'next/image';
import routes from 'routes';
import { IconlyArrowDown, IconlyLogout, NotificationLine, Person } from 'components/icons';
import { Dialog, Menu, Transition } from '@headlessui/react';
import { useAuth } from './auth';

const Header: FC = () => {
  let [isOpen, setIsOpen] = useState(false);
  const authCtx = useAuth();

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <div className="sticky top-0 z-10 flex items-center justify-between bg-daabo-black py-4 px-gutter">
      <a href={routes.LANDING_PAGE}>
        <Image src="/images/daabo-logo.png" alt="Daabo logo" width={119} height={43} priority />
      </a>
      {authCtx.user && (
        <div className="flex items-center gap-16">
          <Menu as="div" className="relative">
            <div>
              <Menu.Button className="flex items-center">
                <Person className="fill-red-500 text-2xl" />
                <span className="ml-4 hidden font-medium text-daabo-white md:[display:initial]">
                  {authCtx.user?.name}
                </span>
                <IconlyArrowDown className="ml-2 hidden text-[0.375rem] md:[display:initial]" />
              </Menu.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-100"
                enterFrom="transform opacity-0 scale-95"
                enterTo="transform opacity-100 scale-100"
                leave="transition ease-in duration-75"
                leaveFrom="transform opacity-100 scale-100"
                leaveTo="transform opacity-0 scale-95"
              >
                <Menu.Items className="absolute right-0 mt-4 min-w-[12rem] divide-y divide-daabo-white rounded-md bg-white p-4 shadow-[0px_2px_7px_rgba(0,0,0,0.12)] md:w-[130%]">
                  <div className="pb-7">
                    <Menu.Item>
                      {() => (
                        <div className="flex flex-col gap-2">
                          <span className="text-xs font-medium">{authCtx.user?.name}</span>
                          <span className="text-[0.625rem] text-daabo-grey">
                            {authCtx.user?.email}
                          </span>
                          <a
                            href={routes.ACCOUNT_SETTINGS}
                            className="w-fit rounded-lg border-[1px] border-daabo-primary py-3 text-xs text-daabo-primary [padding-inline:1.25rem] hover:bg-daabo-primary hover:text-daabo-white focus:bg-daabo-primary focus:text-daabo-white"
                          >
                            My Profile
                          </a>
                        </div>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="flex w-full flex-col gap-4 py-4 text-xs">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={routes.HELP_SUPPORT}
                          className={`inline-block w-full rounded-md py-1 px-2 hover:bg-daabo-primary hover:text-daabo-white ${
                            active && 'bg-daabo-primary text-daabo-white'
                          }`}
                        >
                          Help & Support
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={routes.LOGIN_ACTIVITY}
                          className={`inline-block w-full rounded-md py-1 px-2 hover:bg-daabo-primary hover:text-daabo-white ${
                            active && 'bg-daabo-primary text-daabo-white'
                          }`}
                        >
                          Login Activity
                        </a>
                      )}
                    </Menu.Item>
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href={routes.SPREAD}
                          className={`inline-block w-full rounded-md py-1 px-2 hover:bg-daabo-primary hover:text-daabo-white ${
                            active && 'bg-daabo-primary text-daabo-white'
                          }`}
                        >
                          Spread the word
                        </a>
                      )}
                    </Menu.Item>
                  </div>
                  <div className="pt-7">
                    <button
                      type="button"
                      onClick={openModal}
                      className="flex items-center gap-[0.3rem]"
                    >
                      <IconlyLogout className="text-lg" />
                      <span className="text-xs">Log Out</span>
                    </button>
                  </div>
                </Menu.Items>
              </Transition>
            </div>
          </Menu>
          <Dialog
            open={isOpen}
            as="div"
            className="fixed inset-0 z-10 overflow-y-auto"
            onClose={closeModal}
          >
            <div className="flex min-h-screen items-center justify-center px-4 text-center">
              <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
              <div className="my-8 inline-block w-full max-w-xs transform overflow-hidden rounded-2xl bg-daabo-black px-4 py-8 align-middle text-daabo-white shadow-xl transition-all">
                <Dialog.Title as="h3" className="text-center text-base font-extrabold leading-6">
                  Log Out
                </Dialog.Title>
                <div className="mt-2">
                  <p className="text-center text-xs leading-5">Are you sure you want to log out?</p>
                </div>

                <div className="mt-9 flex justify-between px-3">
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md border border-daabo-white px-9 py-2 text-xs font-bold focus:outline-none"
                    onClick={closeModal}
                  >
                    Cancel
                  </button>
                  <button
                    type="button"
                    className="inline-flex items-center justify-center rounded-md bg-daabo-white px-8 py-2 text-xs font-bold text-daabo-black focus:outline-none"
                    onClick={() => {
                      closeModal();
                      authCtx.logout();
                    }}
                  >
                    Log Out
                  </button>
                </div>
              </div>
            </div>
          </Dialog>
          <button title="Notifications" className="hidden md:[display:initial]">
            <NotificationLine />
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
