import { LoadingSpinner } from 'components/icons';
import { AnimatePresence, motion } from 'framer-motion';

function DaaboTableLoader() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="flex h-[5rem] flex-col items-center justify-center self-center"
      >
        <LoadingSpinner className="mx-auto stroke-daabo-primary text-[60px]" />
      </motion.div>
    </AnimatePresence>
  );
}

export default DaaboTableLoader;
