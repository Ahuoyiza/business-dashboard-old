import { Menu, Transition } from '@headlessui/react';
import { FC, Fragment } from 'react';
import { FaEllipsisH } from 'react-icons/fa';

type InactiveDeviceTableActionProps = {
  onViewDevice: () => void;
  onRemoveDevice: () => void;
};

const InactiveDeviceTableAction: FC<InactiveDeviceTableActionProps> = ({
  onRemoveDevice,
  onViewDevice,
}) => {
  return (
    <Menu as="div" className="absolute mx-auto w-min">
      <div>
        <Menu.Button className="flex">
          <FaEllipsisH />
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
          <Menu.Items className="divide-daabo-[#f3f3f3] absolute z-30 mt-1 flex flex-col items-center gap-3 rounded-md bg-[#fcfcfc] p-4 px-3 py-4 text-xs shadow-md">
            <Menu.Item className="w-max" as="button" onClick={() => onViewDevice()}>
              View Device
            </Menu.Item>
            <hr className="border-[#f3f3f3]" />
            <Menu.Item className="w-max" as="button" onClick={() => onRemoveDevice()}>
              Remove Device
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

export default InactiveDeviceTableAction;
