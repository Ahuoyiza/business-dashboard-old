import { motion } from 'framer-motion';
import Seo from 'lib/seo';
import Link from 'next/link';

export default function Success() {
  return (
    <>
      <Seo title="Dashboard" description="Manage your devices and plans." />
      <div className="container">
        <div className="flex min-h-[40rem] flex-col items-center justify-evenly">
          <svg
            width="20rem"
            viewBox="0 0 16 16"
            fill="none"
            className="text-green-500"
            xmlns="http://www.w3.org/2000/svg"
          >
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: 0 }}
              d="M5.33334 8.33333L7.33334 10.3333L10.6667 6.33333"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <motion.path
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 1, repeat: 0 }}
              d="M8.00001 14.6667C11.6819 14.6667 14.6667 11.6819 14.6667 8C14.6667 4.3181 11.6819 1.33333 8.00001 1.33333C4.31811 1.33333 1.33334 4.3181 1.33334 8C1.33334 11.6819 4.31811 14.6667 8.00001 14.6667Z"
              stroke="currentColor"
              strokeWidth="1"
              strokeLinecap="round"
            />
          </svg>
          <div className="text-center">
            <h1 className="section-heading">Device Added</h1>
            <p className="section-sub-heading mt-4">
              Your device subscription is successful and your device has been added.
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

Success.layoutProps = {
  hideSideBar: true,
};
