import { FC, useState } from 'react';
import { Switch } from '@headlessui/react';

type ToggleProps = {
  label?: string;
  enabled: boolean;
  onToggle: () => void;
};

const Toggle: FC<ToggleProps> = ({ enabled, onToggle, label }) => {
  const [isEnabled, setEnabled] = useState(false);
  const toggle = onToggle || (() => setEnabled((prev) => !prev));
  const checked = enabled || isEnabled;

  return (
    <Switch
      checked={checked}
      onChange={toggle}
      className={`${
        checked ? 'bg-daabo-primary-500' : 'bg-gray-200'
      } relative inline-flex h-[1.313rem] w-[2.688rem] items-center rounded-full`}
    >
      <span className="sr-only">{label || 'Switch'}</span>
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-[1.063rem] w-[1.063rem] transform rounded-full bg-white transition duration-200 ease-in-out`}
      />
    </Switch>
  );
};

export default Toggle;
