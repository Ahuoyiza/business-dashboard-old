import { IconlyEye, IconlyEyeOff } from 'components/icons';
import { ChangeEventHandler, FC, useState } from 'react';
import { ReactHookOptions } from 'typings';

interface Props {
  placeholder: string;
  name?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
  reactHookOptions?: ReactHookOptions;
}

const PasswordField: FC<Props> = ({
  placeholder,
  onChange = () => {},
  reactHookOptions = {
    options: {} as any,
    register: () => {},
    error: undefined,
  },
  name = '',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const { register, error, options } = reactHookOptions;

  return (
    <div className="relative">
      <div>
        <input
          className={`daabo-form-input ${
            error && 'border-red-600 text-red-600 placeholder-red-600 focus:border-red-600'
          }`}
          type={isPasswordVisible ? 'text' : 'password'}
          placeholder={placeholder}
          aria-invalid={error ? 'true' : 'false'}
          onChange={onChange}
          {...register(name || 'password', { ...options })}
        />
        <span
          className="absolute right-[22px] top-[18px] cursor-pointer"
          onClick={togglePasswordVisibility}
        >
          {!isPasswordVisible ? (
            <IconlyEyeOff className="text-[18px]" />
          ) : (
            <IconlyEye className="fill-[#BBBBBB] text-[18px] text-daabo-grey" />
          )}
        </span>
      </div>
      <div className="pl-[2px] pt-[2px] text-xs font-semibold text-red-600">
        {error && error.type === 'required' && (
          <div className="animate-appear" role="alert">
            This is required
          </div>
        )}
        {error && error.type === 'minLength' && (
          <div className="animate-appear" role="alert">
            Must contain at least 8 characters
          </div>
        )}
        {error && error.type === 'maxLength' && (
          <div className="animate-appear" role="alert">
            Must not exceed {options?.maxLength} characters
          </div>
        )}
        {error && error.type === 'pattern' && (
          <div className="animate-appear" role="alert">
            Must contain a letter(upper case and lower case) and a number
          </div>
        )}
      </div>
    </div>
  );
};

export default PasswordField;
