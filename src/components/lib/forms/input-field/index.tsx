import { ChangeEventHandler } from 'react';
import { ReactHookOptions } from 'typings';

export interface InputFieldProps {
  type: string;
  placeholder: string;
  className?: string;
  defaultValue?: string;
  name?: string;
  descriptiveName?: string;
  ClassName?: string; // class name to be used when specified explicitly
  onChange?: ChangeEventHandler<HTMLInputElement>;
  reactHookOptions: ReactHookOptions;
}

const InputField: React.FC<InputFieldProps> = ({
  type,
  placeholder,
  onChange = () => {},
  reactHookOptions = {
    register: () => {},
    options: {} as any,
    error: undefined,
  },
  name = '',
  descriptiveName = '',
  ClassName = '',
  defaultValue = '',
}) => {
  const { register, error, options } = reactHookOptions;
  return (
    <div>
      <div>
        <input
          type={type}
          defaultValue={defaultValue}
          onChange={onChange}
          className={
            ClassName !== ''
              ? ClassName
              : `daabo-form-input ${
                  error && 'border-red-600 text-red-600 placeholder-red-600 focus:border-red-600'
                }`
          }
          placeholder={placeholder}
          {...register(name, { ...options })}
        />
      </div>
      <div className="pl-[2px] pt-[2px] text-xs font-semibold text-red-600">
        {error && error.type === 'required' && (
          <div role="alert" className="animate-appear">
            This is required
          </div>
        )}
        {error && error.type === 'pattern' && (
          <div className="animate-appear" role="alert">
            Enter a valid {descriptiveName}
          </div>
        )}
        {error && error.type === 'minLength' && (
          <div className="animate-appear" role="alert">
            Must contain at least {options?.minLength} characters
          </div>
        )}
        {error && error.type === 'maxLength' && (
          <div className="animate-appear" role="alert">
            Must not exceed {options?.maxLength} characters
          </div>
        )}
      </div>
    </div>
  );
};

export default InputField;
