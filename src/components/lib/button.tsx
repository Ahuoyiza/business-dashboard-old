import { LoadingSpinner } from 'components/icons';
import { FC, MouseEventHandler, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  loading?: boolean;
  type?: 'submit' | 'button';
  onClick?: MouseEventHandler;
}

/**
 *
 * @param className specify the classes for styling the button. The default width and height can be changed by specifying them here
 * @param loading a boolean to indicate an action is still in progress
 * @param onClick a function that runs when the button is clciked
 * @param type sets the type of the button (type="submit" for forms and type="button" the default value for a regular button)
 */
const Button: FC<Props> = ({
  children,
  className = 'w-[10.063rem] h-[45px]',
  onClick = () => {},
  disabled = false,
  loading = false,
  type = 'button',
}) => {
  return (
    <button
      type={type}
      onClick={!loading ? onClick : undefined}
      disabled={disabled}
      aria-disabled={loading}
      className={`
      ripple-button select-none overflow-hidden text-ellipsis rounded-[7px] bg-daabo-primary px-[6px]
      text-[14px] font-semibold uppercase text-white shadow-[0px_2px_5px_0px_#00000040] ${className} ${
        loading && 'cursor-progress opacity-60'
      }
      `}
    >
      {loading ? <LoadingSpinner className="fill-[#fff] text-[30px]" /> : children}
    </button>
  );
};

export default Button;
