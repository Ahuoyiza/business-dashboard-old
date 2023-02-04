import { FC } from 'react';
import ApiCallsTable from './api-calls-table';

interface ApiCallsTabProps {
  apiCalls: any;
  isLoading: boolean;
}

const ApiCallsTab: FC<ApiCallsTabProps> = ({ apiCalls, isLoading }) => {
  return (
    <div className="my-5">
      {apiCalls && apiCalls.length > 0 ? (
        <ApiCallsTable isLoading={isLoading} data={apiCalls} />
      ) : (
        <div className="mt-10 mb-6 text-center text-sm font-semibold text-daabo-black">
          You have no api usage yet
        </div>
      )}
    </div>
  );
};

export default ApiCallsTab;
