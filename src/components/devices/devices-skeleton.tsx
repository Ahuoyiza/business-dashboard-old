import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';
import DeviceSkeleton from './device-skeleton';

type Props = {
  count?: number;
};

function DevicesSkeleton({ count = 10 }: Props) {
  return (
    <AnimatePresence>
      {Array(count)
        .fill(1)
        .map((_, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            exit={{ opacity: 0 }}
          >
            <DeviceSkeleton />
          </motion.div>
        ))}
    </AnimatePresence>
  );
}

export default DevicesSkeleton;
