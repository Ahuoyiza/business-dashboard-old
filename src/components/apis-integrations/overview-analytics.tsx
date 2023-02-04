import { getApiAnalytics } from 'lib/requests/integrations';
import { FC } from 'react';
import { useQuery } from 'react-query';
import AnalyticsChart from './analytics-chart';

const OverviewAnalytics: FC = () => {
  const { data } = useQuery('analytics', getApiAnalytics);

  return (
    <div className="rounded-lg bg-white py-[1.4rem] px-[1.688rem] text-[1.125rem] shadow-[0px_2px_7px_rgba(0,0,0,0.12)]">
      <div className="font-semibold text-daabo-black">Overview Analytics</div>
      <div className="mt-4 flex gap-4 text-sm text-daabo-grey">
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-[50%] bg-[#4CAF50]"></div>
          <div>Succesful calls</div>
        </div>
        <div className="flex items-center gap-1">
          <div className="h-2 w-2 rounded-[50%] bg-[#C70000]"></div>
          <div>Failed calls</div>
        </div>
      </div>
      <div>
        <AnalyticsChart {...(data || {})} />
      </div>
    </div>
  );
};

export default OverviewAnalytics;
