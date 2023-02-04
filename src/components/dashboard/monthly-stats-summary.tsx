import { cloneElement, FC, isValidElement, ReactNode } from 'react';
import { MdKeyboardArrowDown, MdKeyboardArrowUp } from 'react-icons/md';
import Skeleton from 'react-loading-skeleton';

type MonthlyStatsSummaryProps = {
  title: string;
  data?: string;
  percentageChange?: number;
  direction: 'positive' | 'negative';
  color: string;
  icon: ReactNode;
};

const MonthlyStatsSummary: FC<MonthlyStatsSummaryProps> = ({
  color,
  data,
  direction,
  icon,
  percentageChange,
  title,
}) => {
  return (
    <div className="flex gap-4 rounded-xl border-2 border-[#c4c4c4] bg-[#fcfcfc] py-[1.3rem] pl-7 pr-[1.125rem]">
      <div className="flex flex-grow flex-col">
        <span className="text-xs font-semibold uppercase text-[#878C98]">{title}</span>
        {data ? (
          <span className="mt-[0.375rem] text-3xl font-bold">{data}</span>
        ) : (
          <Skeleton className="mt-[0.375rem] text-3xl" />
        )}
        {percentageChange && (
          <span className="mt-[1.125rem] inline-flex items-center text-xs text-[#878C98]">
            {direction === 'positive' ? (
              <MdKeyboardArrowUp className="text-base text-[#4CAF50]" />
            ) : direction === 'negative' ? (
              <MdKeyboardArrowDown className="text-base text-[#c70000]" />
            ) : null}
            {percentageChange}% Since last month
          </span>
        )}
      </div>
      <div
        style={{ backgroundColor: color }}
        className="flex h-[2.6rem] w-[2.6rem] place-content-center place-items-center self-center justify-self-end rounded-[50%]"
      >
        {isValidElement(icon) ? cloneElement(icon, { className: 'text-xl text-white' }) : null}
      </div>
    </div>
  );
};

export default MonthlyStatsSummary;
