import DaaboTable from 'components/lib/daabo-table';
import { FC, Fragment, useMemo } from 'react';
import { Column } from 'react-table';
import { BusinessDevice } from 'typings';
import { FaEllipsisH } from 'react-icons/fa';
import { Menu, Transition } from '@headlessui/react';
import { useViewDeviceModal } from './view-device-modal';
import { useRemoveDeviceModal } from './remove-device-modal';

type DeviceTableProps = {
  data: BusinessDevice[];
  isLoading?: boolean;
  /**
   * @param id Id of the device
   */
  onRemoveDevice?: (id: string) => void;
};

const DeviceTable: FC<DeviceTableProps> = ({ isLoading, data, onRemoveDevice = () => {} }) => {
  const { modal: viewDeviceModal, show: showViewDeviceModal } = useViewDeviceModal();
  const { show: showRemoveDeviceModal, modal: removeDeviceModal } = useRemoveDeviceModal({
    onRemove: onRemoveDevice,
  });

  const columns = useMemo<Column<BusinessDevice>[]>(
    () => [
      {
        Header: <div className="text-center">Device ID</div>,
        accessor: 'deviceHash',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => <div className="text-center text-daabo-grey">{props.value}</div>,
      },
      {
        Header: <div className="text-center">Date</div>,
        accessor: 'dateCreated',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => (
          <div className="whitespace-nowrap text-center text-daabo-grey">
            {Intl.DateTimeFormat('en-NG').format(new Date(props.value))}
          </div>
        ),
      },
      {
        Header: <div className="text-center">User</div>,
        accessor: 'userFullName',
        minWidth: 30,
        width: 75,
        maxWidth: 200,
        Cell: (props) => <div className="text-center text-daabo-grey">{props.value}</div>,
      },
      {
        id: 'deviceType',
        Header: <div className="text-center">Device Type</div>,
        accessor: (row) => row.deviceType.typeName,
        minWidth: 30,
        width: 70,
        maxWidth: 200,
        Cell: (props: { value: string }) => (
          <div className="text-center capitalize text-daabo-grey">{props.value}</div>
        ),
      },
      {
        Header: <div className="text-center">Actions</div>,
        id: 'actionsButton',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props: any) => (
          <DeviceTableAction
            onViewDevice={() => showViewDeviceModal(props.row.original)}
            onRemoveDevice={() => showRemoveDeviceModal(props.row.original.id)}
          />
        ),
      },
      {
        Header: () => null,
        id: 'deviceStatus',
        Cell: (props: any) => <div />,
        minWidth: 30,
        width: 50,
        maxWidth: 100,
      },
    ],
    [showViewDeviceModal, showRemoveDeviceModal]
  );

  return (
    <>
      <DaaboTable columns={columns} data={data} isLoading={isLoading} />
      {viewDeviceModal}
      {removeDeviceModal}
    </>
  );
};

type DeviceTableActionProps = {
  onViewDevice: () => void;
  onRemoveDevice: () => void;
};

const DeviceTableAction: FC<DeviceTableActionProps> = ({ onRemoveDevice, onViewDevice }) => {
  return (
    <Menu as="div" className="relative mx-auto w-min">
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
          <Menu.Items className="divide-daabo-[#f3f3f3] z-30 mt-1 flex flex-col items-center gap-3 rounded-md bg-[#fcfcfc] p-4 px-3 py-4 text-xs shadow-md">
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

export default DeviceTable;
