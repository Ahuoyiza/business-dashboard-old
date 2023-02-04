import { FC } from 'react';

type RecentActivity = {
  browser: string;
  ip: string;
  time: string;
};

const recentActivities: RecentActivity[] = [
  {
    browser: 'Chrome on Window',
    ip: '192.149.122.128',
    time: '11:34 PM',
  },
  {
    browser: 'Mozilla on Window',
    ip: '86.188.154.225',
    time: 'Nov 20, 2019 10:34 PM',
  },
  {
    browser: 'Chrome on iMac',
    ip: '86.188.154.225',
    time: 'Nov 20, 2019 10:34 PM',
  },
];

type RecentActivityTableProps = {
  activities?: RecentActivity[];
};

const RecentActivityTable: FC<RecentActivityTableProps> = ({ activities }) => {
  return (
    <div className="overflow-auto rounded-lg">
      <table className="w-full max-w-full rounded-lg bg-white">
        <thead>
          <tr className="h-[40px] bg-daabo-black text-daabo-white">
            <th className="w-[45%] pl-[3.188rem] text-left text-[0.750rem] uppercase">browser</th>
            <th className="w-[25%] text-left text-[0.750rem] uppercase">ip</th>
            <th className="w-[30%] text-left text-[0.750rem] uppercase">time</th>
          </tr>
        </thead>
        <tbody>
          {activities &&
            activities.map((activity, index) => (
              <tr key={activity.ip + index} className="h-[40px] text-daabo-black">
                <td className="text-[#5f5f5f5] border-b border-daabo-white pl-[3.188rem] pr-[2rem] text-left text-[0.750rem] uppercase text-[#5f5f5f]">
                  {activity.browser}
                </td>
                <td className="text-[#5f5f5f5] border-b border-daabo-white text-left text-[0.750rem] uppercase text-[#5f5f5f]">
                  {activity.ip}
                </td>
                <td className="text-[#5f5f5f5] border-b border-daabo-white text-left text-[0.750rem] uppercase text-[#5f5f5f]">
                  {activity.time}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};

export default RecentActivityTable;
