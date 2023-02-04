import DeviceReportCard from 'components/apis-integrations/device-report-card';
import TotalInsuredDevicesCard from 'components/apis-integrations/total-insured-devices-card';
import Seo from 'lib/seo';
import { NextPageWithLayoutProps } from 'typings';
import OverviewAnalytics from 'components/apis-integrations/overview-analytics';
import RecentApiCalls from 'components/apis-integrations/recent-api-calls';
import { useQuery } from 'react-query';
import { getApiMetrics } from 'lib/requests/integrations';

const ApisAndIntegrations: NextPageWithLayoutProps = () => {
  const { data, isLoading } = useQuery('apiLogs', getApiMetrics);

  return (
    <>
      <Seo title="APIs & Integrations" description="Manage your APIs and Integrations" />
      <div className="pb-20">
        <div className="mt-10 flex flex-col justify-between gap-6 sm:mt-12 sm:flex-row sm:items-center lg:mt-16">
          <div>
            <div className="section-heading sm:text-left">API’s & Integrations</div>
            <div className="text-[0.875rem] text-daabo-grey">
              Manage your account and your devices.
            </div>
          </div>
        </div>
        <div>
          <TotalInsuredDevicesCard
            devicesCount={data?.metrics.reduce((acc, curr) => acc + curr.total, 0) || 0}
          />
        </div>
        <div className="mt-10 grid grid-cols-1 gap-[2.138rem] lg:grid-cols-3">
          {data &&
            data.metrics.map((metric) => (
              <DeviceReportCard
                title={`Total Insured ${metric.typeName}s`}
                insuredDevicesCount={metric.total}
                key={metric.typeName}
              />
            ))}
        </div>
        <div className="my-10">
          <OverviewAnalytics />
        </div>
        <div>
          <RecentApiCalls isLoading={isLoading} data={data?.apiLogs} />
        </div>
      </div>
    </>
  );
};

ApisAndIntegrations.layoutProps = {
  isAuthenticated: true,
};

export default ApisAndIntegrations;
