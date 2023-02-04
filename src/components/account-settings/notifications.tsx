import Toggle from 'components/lib/toggle';
import { FC, useEffect, useState } from 'react';

type NotificationsProps = {
  options: {
    unusualActivity: boolean;
    newBrowser: boolean;
    latestNews: boolean;
    newFeatures: boolean;
    accountTips: boolean;
  };
  change: (obj: any) => void;
};

const Notifications: FC<NotificationsProps> = ({ options, change }) => {
  const [newBrowserToggle, setNewBrowserToggle] = useState(options?.newBrowser || false);
  const [unusualActivityToggle, setUnusualActivityToggle] = useState(
    options?.unusualActivity || false
  );
  const [latestNewsToggle, setLatestNewsToggle] = useState(options?.latestNews || false);
  const [newFeaturesToggle, setNewFeaturesToggle] = useState(options?.newFeatures || false);
  const [accountTipsToggle, setAccountTipsToggle] = useState(options?.accountTips || false);

  useEffect(() => setNewBrowserToggle(options?.newBrowser || false), [options?.newBrowser]);
  useEffect(
    () => setUnusualActivityToggle(options?.unusualActivity || false),
    [options?.unusualActivity]
  );
  useEffect(() => setLatestNewsToggle(options?.latestNews || false), [options?.latestNews]);
  useEffect(() => setNewFeaturesToggle(options?.newFeatures || false), [options?.newFeatures]);
  useEffect(() => setAccountTipsToggle(options?.accountTips || false), [options?.accountTips]);

  return (
    <div className="space-y-[3.625rem] py-[1.563rem]">
      <div className="space-y-[0.750rem]">
        <h2 className="text-[1.125rem] font-[500] text-daabo-black">Notification Settings</h2>
        <p className="text-[0.750rem] text-[#5f5f5f]">
          You will get only notification that you have enabled.
        </p>
      </div>
      <div>
        <div className="space-y-[0.750rem]">
          <h3 className="text-[0.938rem] font-[500] text-daabo-black">Security Alerts</h3>
          <p className="text-[0.750rem] text-[#5f5f5f]">
            You will get only notification that you have enabled.
          </p>
        </div>
        <div className="mt-[1.375rem] flex flex-row items-center space-x-[1.063rem]">
          <div>
            <Toggle
              enabled={unusualActivityToggle}
              onToggle={() =>
                setUnusualActivityToggle((prev) => {
                  change({ unusual_activity: !prev });
                  return !prev;
                })
              }
            />
          </div>
          <div className="text-[0.750rem] text-[#5f5f5f]">
            Email me whenever there is unusual activity
          </div>
        </div>
        <div className="mt-[1.375rem] flex flex-row items-center space-x-[1.063rem]">
          <div>
            <Toggle
              enabled={newBrowserToggle}
              onToggle={() =>
                setNewBrowserToggle((prev) => {
                  change({ new_browser: !prev });
                  return !prev;
                })
              }
            />
          </div>
          <div className="text-[0.750rem] text-[#5f5f5f]">
            Email me if new browser is used to sign in
          </div>
        </div>
      </div>
      <div>
        <div className="space-y-[0.750rem]">
          <h3 className="text-[0.938rem] font-[500] text-daabo-black">News</h3>
          <p className="text-[0.750rem] text-[#5f5f5f]">
            You will get only the email notifications you want.
          </p>
        </div>
        <div className="mt-[1.375rem] flex flex-row items-center space-x-[1.063rem]">
          <div>
            <Toggle
              enabled={latestNewsToggle}
              onToggle={() =>
                setLatestNewsToggle((prev) => {
                  change({ lastest_news: !prev });
                  return !prev;
                })
              }
            />
          </div>
          <div className="text-[0.750rem] text-[#5f5f5f]">
            Notify me by email about sales and latest news
          </div>
        </div>
        <div className="mt-[1.375rem] flex flex-row items-center space-x-[1.063rem]">
          <div>
            <Toggle
              enabled={newFeaturesToggle}
              onToggle={() =>
                setNewFeaturesToggle((prev) => {
                  change({ account_tips: !prev });
                  return !prev;
                })
              }
            />
          </div>
          <div className="text-[0.750rem] text-[#5f5f5f]">
            Email me about new features and updates
          </div>
        </div>
        <div className="mt-[1.375rem] flex flex-row items-center space-x-[1.063rem]">
          <div>
            <Toggle
              enabled={accountTipsToggle}
              onToggle={() =>
                setAccountTipsToggle((prev) => {
                  change({ new_features: !prev });
                  return !prev;
                })
              }
            />
          </div>
          <div className="text-[0.750rem] text-[#5f5f5f]">Email me about tips on using account</div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
