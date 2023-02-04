import {
  AkarHome,
  CarbonSettings,
  CodiconTools,
  DeviceTabletSpeaker,
  FluentMyLocation,
  IconChevrownDown,
} from 'components/icons';
import { Transition } from '@headlessui/react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { FC, useState } from 'react';
import { BiCreditCardFront } from 'react-icons/bi';
import { MdClose, MdOutlineMenu } from 'react-icons/md';
import routes from 'routes';

const BusinessSideBar: FC = () => {
  const { route } = useRouter();
  const [isShowing, setIsShowing] = useState(false);

  const toggleShow = () => setIsShowing((prev) => !prev);

  return (
    <>
      <nav className="sticky top-8 mt-12 hidden h-full min-w-max gap-[4.375rem] py-3 pl-gutter font-medium lg:flex">
        <div className="flex flex-col gap-8">
          <Link href={routes.DASHBOARD} passHref>
            <a
              className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.DASHBOARD && 'text-daabo-primary'
              }`}
            >
              <AkarHome />
              <span>Dashboard</span>
            </a>
          </Link>
          <Link href={routes.DEVICES} passHref>
            <a
              className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.DEVICES && 'text-daabo-primary'
              }`}
            >
              <DeviceTabletSpeaker />
              <span>Devices</span>
            </a>
          </Link>
          <Link href={routes.PAYMENTS} passHref>
            <a
              className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.PAYMENTS && 'text-daabo-primary'
              }`}
            >
              <BiCreditCardFront />
              <span>Payments</span>
            </a>
          </Link>
          <div>
            <Link href={routes.API_INTEGRATIONS} passHref>
              <a
                className={`flex cursor-default flex-col gap-2 text-base hover:fill-daabo-primary hover:text-daabo-primary ${
                  route === routes.API_INTEGRATIONS && 'fill-daabo-primary text-daabo-primary'
                }`}
              >
                <div className="flex items-center gap-3">
                  <FluentMyLocation />
                  <span>API&apos;s & Integrations</span>
                  <span>
                    <IconChevrownDown className="fill-inherit" />
                  </span>
                </div>
              </a>
            </Link>
            <div
              className={`flex cursor-default flex-col gap-2 text-base hover:fill-daabo-primary hover:text-daabo-primary ${
                route === routes.AUDIT_LOGS && 'fill-daabo-primary text-daabo-primary'
              }`}
            >
              <Link href={routes.AUDIT_LOGS} passHref>
                <a className="ml-10 text-[0.850rem]">Audit Logs</a>
              </Link>
            </div>
            <div
              className={`flex cursor-default flex-col gap-2 text-base hover:fill-daabo-primary hover:text-daabo-primary ${
                route === routes.API_INTEGRATIONS_DEVICES && 'fill-daabo-primary text-daabo-primary'
              }`}
            >
              <Link href={routes.API_INTEGRATIONS_DEVICES} passHref>
                <a className="ml-10 text-[0.850rem]">Devices</a>
              </Link>
            </div>

            <div
              className={`flex cursor-default flex-col gap-2 text-base hover:fill-daabo-primary hover:text-daabo-primary ${
                route === routes.API_KEYS && 'fill-daabo-primary text-daabo-primary'
              }`}
            >
              <Link href={routes.API_KEYS} passHref>
                <a className="ml-10 text-[0.850rem]">API Keys</a>
              </Link>
            </div>
          </div>
          <Link href={routes.CLAIMS_REPAIRS} passHref>
            <a
              className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.CLAIMS_REPAIRS && 'text-daabo-primary'
              }`}
            >
              <CodiconTools />
              <span>Claims & Repairs</span>
            </a>
          </Link>
          <Link href={routes.ACCOUNT_SETTINGS} passHref>
            <a
              className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                route === routes.ACCOUNT_SETTINGS && 'text-daabo-primary'
              }`}
            >
              <CarbonSettings />
              <span>Account Settings</span>
            </a>
          </Link>
        </div>
        <div className="h-full border-r-[1px] border-[#c4c4c4]" />
      </nav>
      <div className="fixed bottom-0 right-0 z-50 lg:hidden" role="navigation">
        <button
          className="absolute bottom-24 right-6 z-10 rounded-md bg-daabo-black p-1"
          onClick={toggleShow}
        >
          {isShowing ? (
            <MdClose size="2rem" className="text-daabo-primary" />
          ) : (
            <MdOutlineMenu size="2rem" className="text-daabo-primary" />
          )}
        </button>
        <Transition
          show={isShowing}
          enter="transition-transform duration-200 ease-in"
          enterFrom="translate-y-96"
          enterTo="translate-y-0"
          leave="transition-transform duration-300 ease-out"
          leaveFrom="translate-y-0"
          leaveTo="translate-y-96"
        >
          <div className="fixed bottom-0 right-0 w-screen rounded-t-lg bg-daabo-black p-8 text-daabo-white">
            <div className="flex flex-col gap-8">
              <Link href={routes.DASHBOARD} passHref>
                <a
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.DASHBOARD && 'text-daabo-primary'
                  }`}
                >
                  <AkarHome />
                  <span>Dashboard</span>
                </a>
              </Link>
              <Link href={routes.DEVICES} passHref>
                <a
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.DEVICES && 'text-daabo-primary'
                  }`}
                >
                  <DeviceTabletSpeaker />
                  <span>Devices</span>
                </a>
              </Link>
              <Link href={routes.PAYMENTS} passHref>
                <a
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.PAYMENTS && 'text-daabo-primary'
                  }`}
                >
                  <BiCreditCardFront />
                  <span>Payments</span>
                </a>
              </Link>
              <div>
                <Link href={routes.API_INTEGRATIONS} passHref>
                  <a
                    className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                      route === routes.API_INTEGRATIONS && 'text-daabo-primary'
                    }`}
                  >
                    <FluentMyLocation />
                    <span>API&apos;s & Integrations</span>
                  </a>
                </Link>
                <div
                  className={`flex cursor-default flex-col gap-2 text-base hover:fill-daabo-primary hover:text-daabo-primary ${
                    route === routes.AUDIT_LOGS && 'fill-daabo-primary text-daabo-primary'
                  }`}
                >
                  <Link href={routes.AUDIT_LOGS} passHref>
                    <a className="ml-10 text-[0.850rem]">Audit Logs</a>
                  </Link>
                </div>
                <div
                  className={`flex cursor-default flex-col gap-2 text-base hover:fill-daabo-primary hover:text-daabo-primary ${
                    route === routes.API_KEYS && 'fill-daabo-primary text-daabo-primary'
                  }`}
                >
                  <Link href={routes.API_KEYS} passHref>
                    <a className="ml-10 text-[0.850rem]">API Keys</a>
                  </Link>
                </div>
              </div>
              <Link href={routes.CLAIMS_REPAIRS} passHref>
                <a
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.CLAIMS_REPAIRS && 'text-daabo-primary'
                  }`}
                >
                  <CodiconTools />
                  <span>Claims & Repairs</span>
                </a>
              </Link>
              <Link href={routes.ACCOUNT_SETTINGS} passHref>
                <a
                  className={`flex cursor-default items-center gap-3 text-base hover:text-daabo-primary ${
                    route === routes.ACCOUNT_SETTINGS && 'text-daabo-primary'
                  }`}
                >
                  <CarbonSettings />
                  <span>Account Settings</span>
                </a>
              </Link>
            </div>
          </div>
        </Transition>
      </div>
    </>
  );
};

export default BusinessSideBar;
