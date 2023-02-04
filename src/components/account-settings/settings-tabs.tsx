import { FC } from 'react';
import { Tab } from '@headlessui/react';
import { Fragment } from 'react';
import Personal from './personal';
import Settings from './settings';
import Notifications from './notifications';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { toast } from 'react-toastify';
import { getBusinessPersonalSettings, updateBusinessPersonalSettings } from 'lib/requests';

const SettingsTabs: FC<{
  defaultTab?: 'settings' | 'notifications' | 'personal';
}> = ({ defaultTab = 'personal' }) => {
  let index = 0;

  switch (defaultTab) {
    case 'notifications':
      index = 2;
      break;
    case 'personal':
      index = 0;
      break;
    case 'settings':
      index = 1;
      break;
  }

  const queryClient = useQueryClient();
  const { data } = useQuery('profile-settings', async () => {
    const data = await getBusinessPersonalSettings();
    return data;
  });
  const settingsMutation = useMutation(
    ({ id, obj }: { id: string; obj: any }) => updateBusinessPersonalSettings(id, obj),
    {
      onError: () => {
        toast.error('Setting update failed');
      },
      onSuccess: () => {
        queryClient.invalidateQueries('profile-settings');
      },
    }
  );
  const options = {
    id: data?.notification[0]?.ID,
    unusualActivity: data?.notification[0]?.unusual_activity == '1' ? true : false,
    newBrowser: data?.notification[0]?.new_browser == '1' ? true : false,
    latestNews: data?.notification[0]?.lastest_news == '1' ? true : false,
    newFeatures: data?.notification[0]?.new_features == '1' ? true : false,
    accountTips: data?.notification[0]?.account_tips == '1' ? true : false,
    activityLog: data?.notification[0]?.activity_log == '1' ? true : false,
  };
  const activityLogs = data?.activity_log || [];

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
              Personal
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-[2.75px] pb-[1.375rem] text-[0.938rem] font-[500] outline-none ${
                selected
                  ? 'border-daabo-primary text-daabo-primary'
                  : 'border-[transparent] text-daabo-black'
              }`}
            >
              Settings
            </button>
          )}
        </Tab>
        <Tab as={Fragment}>
          {({ selected }) => (
            <button
              className={`border-b-[2.75px] pb-[1.375rem] text-[0.938rem] font-[500] outline-none ${
                selected
                  ? 'border-daabo-primary text-daabo-primary'
                  : 'border-[transparent] text-daabo-black'
              }`}
            >
              Notifications
            </button>
          )}
        </Tab>
      </Tab.List>
      <Tab.Panels className="outline-none">
        <Tab.Panel className="outline-none">
          <Personal />
        </Tab.Panel>
        <Tab.Panel>
          <Settings
            activityLogs={activityLogs}
            change={(obj) => settingsMutation.mutate({ id: options.id, obj })}
            saveActivityLogs={options.activityLog}
          />
        </Tab.Panel>
        <Tab.Panel>
          <Notifications
            change={(obj) => settingsMutation.mutate({ id: options.id, obj })}
            options={options}
          />
        </Tab.Panel>
      </Tab.Panels>
    </Tab.Group>
  );
};

export default SettingsTabs;
