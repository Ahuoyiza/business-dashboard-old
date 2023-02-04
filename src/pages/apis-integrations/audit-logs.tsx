import AuditLogsTabs from 'components/apis-integrations/audit-logs/audit-logs-tabs';
import Seo from 'lib/seo';
import { useRouter } from 'next/router';
import { NextPageWithLayoutProps } from 'typings';

const AuditLogs: NextPageWithLayoutProps = () => {
  const { query } = useRouter();
  return (
    <>
      <Seo title="Audit Logs" description="View the logs of all the api calls made." />
      <div className="w-full py-12">
        <div className="mb-[3.313rem] space-y-[0.500rem]">
          <h1 className="text-[1.125rem] font-[600] leading-[1.688rem]">Audit Logs</h1>
          <p className="text-[0.750rem] text-daabo-grey">
            Keep track of recent API calls and actions performed in your organization.
          </p>
        </div>
        <AuditLogsTabs defaultTab={query.tab as any} />
      </div>
    </>
  );
};

AuditLogs.layoutProps = {
  isAuthenticated: true,
};

export default AuditLogs;
