import { ChangeEventHandler, FC } from 'react';
import { FieldError, RegisterOptions, UseFormRegister } from 'react-hook-form';
import { ReactHookOptions } from 'typings';

interface Props {
  items: any[];
  onChange?: ChangeEventHandler<HTMLSelectElement>;
  name?: string;
  defaultValue?: string;
  reactHookOptions?: ReactHookOptions;
}

const ListBox: FC<Props> = ({
  name = '',
  defaultValue = 'Select an option',
  items = [],
  onChange = () => {},
  reactHookOptions = {
    options: {} as any,
    register: () => {},
    error: undefined,
  },
}) => {
  const { register, error, options } = reactHookOptions;
  return (
    <div>
      <div>
        <select
          defaultValue={defaultValue}
          name={name}
          onChange={onChange}
          className={`
          ${error && 'border-red-600 text-red-600 placeholder-red-600 focus:border-red-600'}
          h-[50px] w-[280px] rounded-[7px] border-2 border-daabo-light-grey bg-white pl-3 pr-7 text-[12px] uppercase text-daabo-grey outline-none transition-all duration-100 ease-in focus:border-daabo-primary sm:w-[396px]
          `}
          {...register(name, options)}
        >
          <option value="">{defaultValue}</option>
          {items &&
            items.map((item, index) => (
              <option key={index} value={item.ID}>
                {item.name}
              </option>
            ))}
        </select>
      </div>
      <div className="pl-[2px] pt-[2px] text-xs font-semibold text-red-600">
        {error && error.type === 'required' && (
          <div className="animate-appear" role="alert">
            This is required
          </div>
        )}
      </div>
    </div>
  );
};

export default ListBox;
