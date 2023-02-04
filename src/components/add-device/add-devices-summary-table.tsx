import { Menu, Transition } from '@headlessui/react';
import DaaboTable from 'components/lib/daabo-table';
import { FC, useMemo, Fragment } from 'react';
import { FaEllipsisH } from 'react-icons/fa';
import { Column } from 'react-table';
import { AddDeviceInfo } from 'typings';
import snakeCaseToCapitalized from 'utils/snakeCaseToCapitalized';
import { useViewAddDeviceModal } from './view-add-device-modal';

type AddDevicesSummaryTableProps = {
  data?: AddDeviceInfo[];
};

const AddDevicesSummaryTable: FC<AddDevicesSummaryTableProps> = ({ data = [] }) => {
  const { show: showViewDeviceModal, modal: viewDeviceModal } = useViewAddDeviceModal();

  const columns = useMemo<Column<AddDeviceInfo>[]>(
    () => [
      {
        Header: <div className="text-center">User</div>,
        accessor: 'user_fullname',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => <div className="text-center text-daabo-grey">{props.value}</div>,
      },
      {
        Header: <div className="text-center">User Email</div>,
        accessor: 'user_email',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => (
          <div className="whitespace-nowrap text-center text-daabo-grey">{props.value}</div>
        ),
      },
      {
        Header: <div className="text-center">Device Type</div>,
        accessor: 'device_type',
        minWidth: 30,
        width: 75,
        maxWidth: 200,
        Cell: (props) => (
          <div className="text-center text-daabo-grey">{snakeCaseToCapitalized(props.value)}</div>
        ),
      },
      {
        Header: <div className="text-center">Device Value</div>,
        accessor: 'cost_of_device',
        minWidth: 30,
        width: 70,
        maxWidth: 200,
        Cell: (props) => (
          <div className="text-center capitalize text-daabo-grey">
            {Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
              parseFloat(props.value)
            )}
          </div>
        ),
      },
      {
        Header: <div className="text-center">Actions</div>,
        id: 'actionsButton',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props: any) => (
          <AddDeviceSummaryTableAction
            onViewDevice={() => showViewDeviceModal(props.row.original)}
          />
        ),
      },
    ],
    [showViewDeviceModal]
  );

  return (
    <Fragment>
      <DaaboTable columns={columns} data={data} />
      {viewDeviceModal}
    </Fragment>
  );
};

type AddDeviceSummaryTableActionProps = {
  onViewDevice: () => void;
};

const AddDeviceSummaryTableAction: FC<AddDeviceSummaryTableActionProps> = ({ onViewDevice }) => {
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
          <Menu.Items className="divide-daabo-[#f3f3f3] absolute z-30 mt-1 flex flex-col items-center gap-3 rounded-md bg-[#fcfcfc] p-4 px-3 py-4 text-xs shadow-md">
            <Menu.Item className="w-max" as="button" onClick={() => onViewDevice()}>
              View Device
            </Menu.Item>
          </Menu.Items>
        </Transition>
      </div>
    </Menu>
  );
};

export default AddDevicesSummaryTable;
