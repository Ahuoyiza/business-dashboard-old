import { FC, useMemo } from 'react';
import { Column } from 'react-table';
import DaaboTable from 'components/lib/daabo-table';
import { ApiLog } from 'typings';

type ApiCallsTableProps = {
  data: ApiLog[];
  isLoading?: boolean;
};

const ApiCallsTable: FC<ApiCallsTableProps> = ({ data, isLoading = false }) => {
  const columns = useMemo<Column<ApiLog>[]>(
    () => [
      {
        Header: <div className="text-center">Endpoint</div>,
        accessor: 'route',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => <div className="text-center text-daabo-grey">{props.value}</div>,
      },
      {
        Header: <div className="text-center">Time</div>,
        accessor: 'date',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => (
          <div className="text-center text-daabo-grey">
            {Intl.DateTimeFormat('en-NG', { dateStyle: 'short' }).format(props.value)}
          </div>
        ),
      },
      {
        Header: <div className="text-center">Status</div>,
        accessor: 'status',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => <div className="text-center text-daabo-grey">{props.value}</div>,
      },
      {
        Header: <div className="text-center">Host</div>,
        accessor: 'host',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => <div className="text-center text-daabo-grey">{props.value}</div>,
      },
      {
        Header: <div className="text-center">IP Address</div>,
        accessor: 'ipAddress',
        minWidth: 30,
        width: 50,
        maxWidth: 100,
        Cell: (props) => <div className="text-center text-daabo-grey">{props.value}</div>,
      },
    ],
    []
  );

  return (
    <div>
      <DaaboTable columns={columns} data={data} isLoading={isLoading} />
    </div>
  );
};

export default ApiCallsTable;
