import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';

/**
 * The width of the skeleton is based on the width of its container
 */
const DeviceSkeleton = () => {
  return <Skeleton borderRadius={'0.57rem'} height={125} />;
};

export default DeviceSkeleton;
