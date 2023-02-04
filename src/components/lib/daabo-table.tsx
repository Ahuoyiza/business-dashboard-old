import { motion } from 'framer-motion';
import { useMemo } from 'react';
import { useTable, PluginHook, TableOptions } from 'react-table';
import DaaboTableLoader from './daabo-table-loader';

interface DaaboTableProps<D extends {}> extends TableOptions<D> {
  plugins?: PluginHook<D>[];
  isLoading?: boolean;
}

const DaaboTable = <D extends {}>(props: DaaboTableProps<D>) => {
  const isLoading = props.isLoading || false;
  const { plugins = [], ...rest } = props;
  rest.columns = rest.columns || [];
  rest.data = rest.data || [];
  const defaultColumn = useMemo(
    () => ({
      minWidth: 30,
      width: 150,
    }),
    []
  );
  const { getTableProps, headerGroups, rows, prepareRow } = useTable(
    { ...rest, defaultColumn: { ...rest.defaultColumn, ...defaultColumn } },
    ...plugins
  );

  return (
    <div className="flex place-content-center">
      <div className="w-full max-w-full overflow-x-auto rounded-lg border-x border-b border-[#c4c4c4] bg-[#fcfcfc] text-xs">
        <table {...getTableProps({ className: 'w-full' })}>
          <thead className="rounded-t-lg">
            {headerGroups.map((headerGroup) => {
              const { key, ...restHeader } = headerGroup.getHeaderGroupProps({
                className: 'bg-daabo-black w-max',
              });
              return (
                <tr key={key} {...restHeader}>
                  {headerGroup.headers.map((column) => {
                    const { key, ...restColumn } = column.getHeaderProps({
                      className: 'py-3 px-8 text-left font-medium capitalize text-daabo-white',
                    });
                    return (
                      <th key={key} {...restColumn}>
                        {column.render('Header')}
                      </th>
                    );
                  })}
                </tr>
              );
            })}
          </thead>
          <tbody>
            {rows.map((row) => {
              prepareRow(row);
              const { key, ...restRow } = row.getRowProps({
                className: 'w-max',
              });
              return (
                <tr key={key} {...restRow}>
                  {row.cells.map((cell) => {
                    const { key, ...restCell } = cell.getCellProps({
                      className: 'self-center px-8 py-5',
                    });
                    return (
                      <motion.td
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        key={key}
                        {...restCell}
                      >
                        {cell.render('Cell')}
                      </motion.td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="w-full">{isLoading && <DaaboTableLoader />}</div>
      </div>
    </div>
  );
};

export default DaaboTable;
