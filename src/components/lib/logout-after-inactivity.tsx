import { Dialog } from '@headlessui/react';
import { FC, useRef, useEffect, useState } from 'react';
import { useAuth } from './auth';

type LogoutAfterInactivityProps = {
  /**
   * The amount of time in minutes before the logout prompt is shown after inactivity.
   */
  after: number;
  disabled?: boolean;
};

/**
 * Shows a logout prompt after the specified amount of time (in minutes)
 */
const LogoutAfterInactivity: FC<LogoutAfterInactivityProps> = ({ after, disabled = false }) => {
  const { user, logout } = useAuth();
  const timeoutId = useRef<number>();

  let [isOpen, setIsOpen] = useState(false);
  const time = after * 60 * 1000;

  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  useEffect(() => {
    timeoutId.current = window.setTimeout(openModal, time);

    const refreshTimeout = () => {
      window.clearTimeout(timeoutId.current);
      timeoutId.current = window.setTimeout(openModal, time);
    };

    window.addEventListener('mousemove', refreshTimeout);
    window.addEventListener('mousedown', refreshTimeout);
    window.addEventListener('keydown', refreshTimeout);
    window.addEventListener('touchstart', refreshTimeout);

    return () => {
      window.removeEventListener('mousemove', refreshTimeout);
      window.removeEventListener('mousedown', refreshTimeout);
      window.removeEventListener('keydown', refreshTimeout);
      window.removeEventListener('touchstart', refreshTimeout);
      window.clearTimeout(timeoutId.current);
    };
  }, [time]);

  if (disabled) return null;

  return (
    <Dialog
      open={Boolean(user) && isOpen}
      as="div"
      className="fixed inset-0 z-10 overflow-y-auto"
      onClose={closeModal}
    >
      <div className="flex min-h-screen items-center justify-center px-4 text-center">
        <Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-50" />
        <div className="my-8 inline-block w-full max-w-xs transform overflow-hidden rounded-2xl bg-daabo-black px-4 py-8 align-middle text-daabo-white shadow-xl transition-all">
          <Dialog.Title as="h3" className="text-center text-base font-extrabold leading-6">
            Log Out
          </Dialog.Title>
          <div className="mt-2">
            <p className="text-center text-xs leading-5">
              You have been inactive for the past {after} minute{after !== 1 && 's'}.
              <br />
              Do you want to log out?
            </p>
          </div>

          <div className="mt-9 flex justify-between px-3">
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md border border-daabo-white px-9 py-1 text-xs font-bold focus:outline-none"
              onClick={closeModal}
            >
              No
            </button>
            <button
              type="button"
              className="inline-flex items-center justify-center rounded-md bg-daabo-white px-8 py-1 text-xs font-bold text-daabo-black focus:outline-none"
              onClick={() => {
                closeModal();
                logout();
              }}
            >
              Yes
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
};

export default LogoutAfterInactivity;
