import { FC } from 'react';
import { FiChevronRight } from 'react-icons/fi';

interface Props {
  fieldName: string;
  value?: string;
  openModal: () => void;
}

const PersonalInfo: FC<Props> = ({ fieldName, value, openModal }) => {
  return (
    <div
      onClick={openModal}
      role="button"
      className="grid max-h-[50px] w-full select-none grid-cols-3 items-center px-3 py-3 text-daabo-black shadow-sm sm:px-5 lg:px-7"
    >
      <div className="text-[11px] sm:text-[12px]">{fieldName}</div>
      <div className="overflow-hidden text-ellipsis whitespace-nowrap text-[11px] font-bold capitalize sm:text-[12px]">
        {value || 'N/A'}
      </div>
      <div className=" flex flex-col">
        <FiChevronRight className="h-5 w-5 place-self-end rounded-full bg-daabo-primary text-xs text-white" />
      </div>
    </div>
  );
};

export default PersonalInfo;
