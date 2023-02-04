import { FC } from 'react';
import { ApiLog } from 'typings';
import RecentApiCallsTable from './recent-api-calls-table';

type RecentApiCallsProps = {
  data?: ApiLog[];
  isLoading: boolean;
};

const RecentApiCalls: FC<RecentApiCallsProps> = ({ isLoading, data }) => {
  return (
    <div className="rounded-lg py-[1.4rem] text-[1.125rem]">
      <div>
        <div className="font-semibold text-daabo-black">Recent API Calls</div>
        <div className="text-sm text-daabo-grey">View the details of recent verifications.</div>
      </div>
      <div className="mt-4">
        {data && data.length > 0 ? (
          <RecentApiCallsTable isLoading={isLoading} data={data} />
        ) : (
          <div className="mt-10 mb-6 text-center text-sm font-semibold text-daabo-black">
            You have no api usage yet
          </div>
        )}
      </div>
    </div>
  );
};

export default RecentApiCalls;
