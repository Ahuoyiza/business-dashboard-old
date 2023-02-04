import { FC, useEffect, useState } from 'react';
import Toggle from 'components/lib/toggle';
import routes from 'routes';
import Link from 'next/link';
import RecentActivityTable from './recent-activity-table';

type SettingsProps = {
  saveActivityLogs: boolean;
  activityLogs: any;
  change: (obj: { activity_log: boolean }) => void;
};

const Settings: FC<SettingsProps> = ({ activityLogs, change, saveActivityLogs }) => {
  const [activityLogsToggle, setActivityLogsToggle] = useState(saveActivityLogs || false);
  useEffect(() => setActivityLogsToggle(saveActivityLogs || false), [saveActivityLogs]);

  return (
    <div className="space-y-[3.313rem] py-[1.563rem]">
      <div className="space-y-[1.813rem]">
        <div className="space-y-[0.750rem]">
          <h2 className="text-[1.125rem] font-[500] text-daabo-black">Security Settings</h2>
          <p className="text-[0.750rem] text-[#5f5f5f]">
            These settings help you keep your account secure.
          </p>
        </div>
        <div className="w-full rounded-[7px] bg-white">
          <div className="flex flex-row items-center justify-between px-[1.750rem] py-[1.188rem]">
            <div className="flex flex-col space-y-[0.5rem]">
              <div className="text-[0.938rem] font-[500] text-daabo-black">
                Save my Activity Logs
              </div>
              <div className="text-[0.750rem] text-[#5f5f5f]">
                You can save your all activity logs including unusual activity detected.
              </div>
            </div>
            <div>
              <Toggle
                enabled={activityLogsToggle}
                onToggle={() => {
                  setActivityLogsToggle((prev) => {
                    change({ activity_log: !prev });
                    return !prev;
                  });
                }}
              />
            </div>
          </div>
          <div className="w-full border-b-[1.8px] border-[#f3f3f3]"></div>
          <div className="flex flex-col gap-4 px-[1.750rem] py-[1.188rem] md:flex-row md:items-center md:justify-between md:gap-0">
            <div className="flex flex-col space-y-[0.5rem]">
              <div className="text-[0.938rem] font-[500] text-daabo-black">Change Password</div>
              <div className="text-[0.750rem] text-[#5f5f5f]">
                Set a unique password to protect your account.
              </div>
            </div>
            <div className="flex flex-row items-center space-x-[1.3rem]">
              {/* <div className="text-[#5f5f5f] italic text-[0.750rem]">Last changed: Oct 2, 2019</div> */}
              <div>
                <Link href={routes.RESET_PASSWORD}>
                  <a className="rounded-[8px] border border-daabo-primary-500 px-[20px] py-[8px] text-[0.750rem] font-[500] text-daabo-primary-500 hover:bg-daabo-primary hover:text-white">
                    Change Password
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="space-y-[0.750rem]">
        <h2 className="text-[1.125rem] font-[500] text-daabo-black">Recent Activity</h2>
        <div className="flex flex-row items-center justify-between">
          <div className="text-[0.750rem] text-[#5f5f5f]">
            This information about the last login activity on your account.
          </div>
          <div>
            {/* <button className="text-daabo-primary text-[0.750rem] font-[500]">see full log</button> */}
          </div>
        </div>
        <div className="mt-[1.375rem]">
          <RecentActivityTable
            activities={activityLogs.map((activity: any) => ({
              ip: activity.ip,
              browser: activity.browser,
              time: activity.activity_day,
            }))}
          />
        </div>
      </div>
    </div>
  );
};

export default Settings;
