import { ChangeEventHandler, FC, useState } from 'react';
import { Mail } from 'components/icons';
import { ReactHookOptions } from 'typings';

interface EmailProps {
  placeholder: string;
  defaultValue?: string;
  className?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  reactHookOptions: ReactHookOptions;
}

const EmailField: FC<EmailProps> = ({
  placeholder,
  onChange = () => {},
  reactHookOptions = {
    options: {},
    register: () => {},
    error: undefined,
  },
  className = '',
  defaultValue = '',
}) => {
  const { error, register, options } = reactHookOptions;
  return (
    <div className="relative">
      <div>
        <input
          defaultValue={defaultValue}
          className={`daabo-form-input ${className} ${
            error && 'border-red-600 text-red-600 placeholder-red-600 focus:border-red-600'
          }`}
          type="email"
          placeholder={placeholder}
          onChange={onChange}
          {...register('email', { ...options })}
        />
        <Mail alt="mail" className="absolute top-[16px] right-[22px] text-[20px] uppercase" />
      </div>
      <div className="pl-[2px] pt-[2px] text-xs font-semibold text-red-600">
        {error && error.type === 'required' && (
          <div className="animate-appear" role="alert">
            This is required
          </div>
        )}
        {error && error.type === 'pattern' && (
          <div className="animate-appear" role="alert">
            Enter a valid email address
          </div>
        )}
      </div>
    </div>
  );
};

export default EmailField;
