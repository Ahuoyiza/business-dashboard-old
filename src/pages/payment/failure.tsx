import { motion } from 'framer-motion';
import { removeDevice } from 'lib/requests';
import Seo from 'lib/seo';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Failure() {
  const { query } = useRouter();
  const deviceId = query.device_id as string;

  useEffect(() => {
    if (deviceId) {
      removeDevice(deviceId);
    }
  }, [deviceId]);

  return (
    <>
      <Seo title="Dashboard" description="Manage your devices and plans." />
      <div className="container">
        <div className="flex min-h-[40rem] flex-col items-center justify-evenly">
          <svg
            width="20rem"
            viewBox="0 0 16 16"
            fill="none"
            className="text-red-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: 0 }}
              d="M8.00001 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8.00001 1.33333C4.31811 1.33333 1.33334 4.3181 1.33334 8C1.33334 11.6819 4.31811 14.6667 8.00001 14.6667Z"
              stroke="currentColor"
              stroke-linecap="round"
            />
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: 0 }}
              x1="5.52513"
              y1="5.52513"
              x2="10.4749"
              y2="10.4749"
              stroke="currentColor"
              stroke-linecap="round"
            />
            <motion.line
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: 0 }}
              x1="5.52512"
              y1="10.4749"
              x2="10.4749"
              y2="5.52512"
              stroke="currentColor"
              stroke-linecap="round"
            />
          </svg>
          <div className="text-center">
            <h1 className="section-heading">Device Subscription Failed</h1>
            <p className="section-sub-heading mt-4">
              Your device subscription failed, try again.
              <br />
              You can close this tab or go to the dashboard.
            </p>
          </div>
          <Link href="/" passHref>
            <span className="daabo-secondary-button cursor-pointer">Go to Dashboard</span>
          </Link>
        </div>
      </div>
    </>
  );
}

Failure.layoutProps = {
  hideSideBar: true,
};
