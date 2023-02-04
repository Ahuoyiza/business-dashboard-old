import { FC, useMemo } from 'react';
import { Column } from 'react-table';
import { BusinessDevice } from 'typings';
import { useViewDeviceModal } from 'components/devices/view-device-modal';
import { useRemoveDeviceModal } from 'components/devices/remove-device-modal';
import BaseDeviceTable from './base-device-table';
import InactiveDeviceTableAction from './inactive-device-table-action';

type DeviceTableProps = {
  data: BusinessDevice[];
  isLoading?: boolean;
  /**
   * @param id Id of the device
   */
  onRemoveDevice?: (id: string) => void;
  enableSubscriptionBtn: (active: boolean) => void;
  getSelectedDevices: (devices: any[]) => void;
};

const InactiveDeviceTable: FC<DeviceTableProps> = ({
  isLoading,
  data,
  onRemoveDevice = () => {},
  enableSubscriptionBtn,
  getSelectedDevices,
}) => {
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
          <InactiveDeviceTableAction
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
      <BaseDeviceTable
        getSelectedDevices={getSelectedDevices}
        enableSubscriptionBtn={enableSubscriptionBtn}
        columns={columns}
        data={data}
        isLoading={isLoading}
      />
      {viewDeviceModal}
      {removeDeviceModal}
    </>
  );
};

export default InactiveDeviceTable;
