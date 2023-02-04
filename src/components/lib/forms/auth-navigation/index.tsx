import { useRouter } from 'next/router';
import { IoIosArrowBack } from 'react-icons/io';
import { VscRefresh } from 'react-icons/vsc';

interface Props {
  hidePreviousButton?: boolean;
  hideRestartButton?: boolean;
}

const AuthNavigation: React.FC<Props> = ({
  hidePreviousButton = false,
  hideRestartButton = false,
}) => {
  const router = useRouter();

  const restart = (): void => {
    switch (router.pathname) {
      case '/signup':
        router.push('/signup', {
          query: {
            step: 1,
          },
        });
        break;

      default:
        break;
    }
  };

  const previous = (): void => {
    router.back();
  };

  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div>
        {!hidePreviousButton && (
          <button onClick={previous} className="bg-transparent">
            <IoIosArrowBack className="text-[24px] text-daabo-grey" />
          </button>
        )}
      </div>
      <div>
        {!hideRestartButton && (
          <button onClick={restart} className="text-[20px]">
            <VscRefresh className="w-[24px] text-daabo-black" />
          </button>
        )}
      </div>
    </div>
  );
};

export default AuthNavigation;
