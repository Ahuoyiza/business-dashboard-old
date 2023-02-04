import { FC } from 'react';
import { useLottie } from 'lottie-react';

import loaderAnimation from 'animations/loader.json';

type LoaderProps = {
  fullscreen?: boolean;
};

const Loader: FC<LoaderProps> = ({ fullscreen = false }) => {
  const { View } = useLottie({
    animationData: loaderAnimation,
    autoplay: true,
    className: 'w-52 h-52 md:w-72 md:h-72',
    loop: true,
  });
  return (
    <div className="flex h-full w-full items-center justify-center">
      {View}
      {/* <span className="sr-only">Loading...</span> */}
    </div>
  );
};

export default Loader;
