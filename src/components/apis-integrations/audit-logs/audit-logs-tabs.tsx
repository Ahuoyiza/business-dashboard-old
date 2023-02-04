import { Tab } from '@headlessui/react';
import { getApiLogs } from 'lib/requests/integrations';
import { FC, Fragment } from 'react';
import { useQuery } from 'react-query';
import ApiCallsTab from './api-calls-tab';
import EventLogsTab from './event-logs-tab';

const AuditLogsTabs: FC<{
  defaultTab?: 'api-calls' | 'event-logs';
}> = ({ defaultTab = 'api-calls' }) => {
  let index = 0;

  switch (defaultTab) {
    case 'api-calls':
      index = 0;
      break;
    case 'event-logs':
      index = 1;
      break;
  }

  const { data: apiCalls, isLoading } = useQuery('api-calls', async () => {
    const data = await getApiLogs();
    return data;
  });

  return (
    <Tab.Group defaultIndex={index}>
      <Tab.List className="space-x-[2.688rem] border-b border-[#c4c4c4]">
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-[2.75px] pb-[1.375rem] text-[0.938rem] font-[500] outline-none ${
                selected
                  ? 'border-daabo-primary text-daabo-primary'
                  : 'border-[transparent] text-daabo-black'
              }`}
            >
              API Calls
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="outline-none">
        <Tab.Panel className="outline-none">
          <ApiCallsTab apiCalls={apiCalls?.content} isLoading={isLoading} />
        </Tab.Panel>
        <Tab.Panel>
          <EventLogsTab />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default AuditLogsTabs;
