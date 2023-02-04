import { ChangeEventHandler, FC } from 'react';
import { IconlySearch } from 'components/icons';

interface Props {
  onChange?: ChangeEventHandler<any>;
  placeholder?: string;
  className?: string;
}

const SearchBar: FC<Props> = ({ onChange, placeholder = 'Search keyword', className }) => {
  return (
    <div
      className={`${className} flex w-full items-center gap-3 rounded-lg bg-[#fcfcfc] py-5 px-7 md:w-[60%]`}
    >
      <IconlySearch />
      <input
        type="search"
        onChange={onChange}
        placeholder={placeholder}
        className="w-full bg-transparent text-xs font-medium placeholder:text-daabo-grey focus:outline-none"
      />
    </div>
  );
};

export default SearchBar;
