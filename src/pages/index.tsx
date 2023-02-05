import { DevicesPieChart, MonthlyStatsSummary, NoProtectedDeviceCard } from 'components/dashboard';
import DeviceList from 'components/devices/device-list';
import { getDashboardMetrics, getDevices } from 'lib/requests';
import Seo from 'lib/seo';
import { useEffect, useState } from 'react';
import { AiOutlineMobile } from 'react-icons/ai';
import { FiCreditCard, FiUmbrella } from 'react-icons/fi';
import { useQuery } from 'react-query';
import routes from 'routes';
import { NextPageWithLayoutProps } from 'typings';

const BusinessDashboard: NextPageWithLayoutProps = () => {
  const [selectedId, setSelectedId] = useState('');
  const { data: metricsData, isLoading: isMetricsDataLoading } = useQuery(
    'dashboard-metrics',
    getDashboardMetrics
  );

  const metrics = metricsData
    ? {
        protectedDevices: Intl.NumberFormat('en-NG').format(metricsData?.protectedDevices),
        amountPaid: Intl.NumberFormat('en-NG', { style: 'currency', currency: 'NGN' }).format(
          metricsData?.amountPaid
        ),
        companyClaims: Intl.NumberFormat('en-NG').format(metricsData?.companyClaims),
      }
    : undefined;

  const { data, isLoading } = useQuery('business-devices', () =>
    getDevices({ pagination: { start: 0, length: 5 } })
  );

  const devicesCount = data?.content.reduce(
    (acc: any, device: any) => {
      switch (device.deviceType.typeName) {
        case 'Mobile Phone':
          acc.mobile++;
          break;
        case 'Tablet':
          acc.tablet++;
          break;
        case 'iPad':
          acc.tablet++;
          break;
        case 'Desktop Computer':
          acc.desktop++;
          break;
        case 'Laptop':
          acc.laptop++;
          break;
        default:
          break;
      }

      return acc;
    },
    { desktop: 0, tablet: 0, mobile: 0, laptop: 0 }
  ) || { desktop: 0, tablet: 0, mobile: 0, laptop: 0 };

  useEffect(() => {
    setSelectedId(data?.content[0]?.id || '');
  }, [data]);

  return (
    <>
      <Seo title="Business Dashboard" description="Manage your devices and plans." />
      <div className="mt-16 pb-8">
        <div className="section-heading">Dashboard</div>
        <div className="section-sub-heading mt-3">Manage your account and your devices.</div>
        {data?.content.length == 0 ? (
          <NoProtectedDeviceCard devicesRoute={routes.DEVICES} />
        ) : (
          <>
            <div className="mt-7 grid grid-cols-1 gap-10 lg:gap-10 xl:grid-cols-3">
              <MonthlyStatsSummary
                color="#D14343"
                data={metrics?.protectedDevices}
                direction="positive"
                icon={<AiOutlineMobile />}
                title="Devices Protected"
              />
              <MonthlyStatsSummary
                color="#14B8A6"
                data={metrics?.amountPaid}
                direction="positive"
                icon={<FiCreditCard />}
                title="Amount Paid"
              />
              <MonthlyStatsSummary
                color="#5048E5"
                data={metrics?.companyClaims}
                direction="negative"
                icon={<FiUmbrella />}
                title="Claims & Repairs"
              />
            </div>
            <div className="mt-10">
              <h3 className="section-heading">Recent Devices</h3>
              <div className="mt-6 flex flex-col gap-10 xl:flex-row xl:gap-24">
                <div className="flex-grow">
                  <DeviceList
                    devices={data?.content || []}
                    selected={selectedId}
                    isLoading={isLoading}
                    onSelect={(selected) => setSelectedId(selected)}
                  />
                </div>
                <div className="xl:w-[40%]">
                  <DevicesPieChart
                    desktop={devicesCount.desktop}
                    mobile={devicesCount.mobile}
                    tablet={devicesCount.tablet}
                    laptop={devicesCount.laptop}
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

BusinessDashboard.layoutProps = {
  isAuthenticated: false,
};

export default BusinessDashboard;
