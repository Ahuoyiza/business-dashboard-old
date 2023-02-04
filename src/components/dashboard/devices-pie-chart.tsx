import { Chart, ArcElement, Tooltip } from 'chart.js';
import { FC } from 'react';
import {
  AiOutlineDesktop,
  AiOutlineLaptop,
  AiOutlineMobile,
  AiOutlineTablet,
} from 'react-icons/ai';
import { Pie } from 'react-chartjs-2';

Chart.register(ArcElement, Tooltip);

type DevicesPieChartProps = {
  mobile: number;
  tablet: number;
  desktop: number;
  laptop: number;
};

const COLORS = {
  Desktop: '#1070CA',
  Mobile: '#EC4C47',
  Tablet: '#F7D154',
  Laptop: '#ea54f7',
};

const DevicesPieChart: FC<DevicesPieChartProps> = ({ desktop, mobile, tablet, laptop }) => {
  const total = desktop + mobile + tablet + laptop;
  const desktopPercentage = ((desktop / total) * 100).toFixed(0);
  const mobilePercentage = ((mobile / total) * 100).toFixed(0);
  const tabletPercentage = ((tablet / total) * 100).toFixed(0);
  const laptopPercentage = ((laptop / total) * 100).toFixed(0);

  return (
    <div className="flex flex-col rounded-xl border-2 border-[#c4c4c4] bg-[#fcfcfc]">
      <span className="section-heading border-b border-b-[#E6E8F0] px-6 py-[1.125rem]">
        Devices
      </span>
      <div className="flex flex-col items-center gap-9 py-9">
        <div className="w-[50%] lg:w-1/2">
          <Pie
            data={{
              labels: ['Desktop', 'Mobile', 'Tablet'],
              datasets: [
                {
                  label: 'Devices Distribution',
                  data: [desktop, mobile, tablet, laptop],
                  backgroundColor: [COLORS.Desktop, COLORS.Mobile, COLORS.Tablet, COLORS.Laptop],
                  borderColor: [COLORS.Desktop, COLORS.Mobile, COLORS.Tablet, COLORS.Laptop],
                },
              ],
            }}
            plugins={[Tooltip]}
          />
        </div>
        <div className="grid w-full grid-cols-2 gap-5 px-4 sm:w-[60%] sm:gap-10 sm:px-0 lg:grid-cols-1">
          <div className="grid grid-cols-2 place-items-center gap-2">
            <div className="flex flex-col items-center gap-1 text-[#6B7280]">
              <AiOutlineDesktop className="text-3xl" />
              <span className="text-xs">Desktop</span>
            </div>
            <span
              className="text-[1.5rem] font-bold lg:text-[2rem]"
              style={{ color: COLORS.Desktop }}
            >
              {desktopPercentage}%
            </span>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-2">
            <div className="flex flex-col items-center gap-1 text-[#6B7280]">
              <AiOutlineTablet className="text-3xl" />
              <span className="text-xs">Tablet</span>
            </div>
            <span
              className="text-[1.5rem] font-bold lg:text-[2rem]"
              style={{ color: COLORS.Tablet }}
            >
              {tabletPercentage}%
            </span>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-2">
            <div className="flex flex-col items-center gap-1 text-[#6B7280]">
              <AiOutlineMobile className="text-3xl" />
              <span className="text-xs">Mobile</span>
            </div>
            <span
              className="text-[1.5rem] font-bold lg:text-[2rem]"
              style={{ color: COLORS.Mobile }}
            >
              {mobilePercentage}%
            </span>
          </div>
          <div className="grid grid-cols-2 place-items-center gap-2">
            <div className="flex flex-col items-center gap-1 text-[#6B7280]">
              <AiOutlineLaptop className="text-3xl" />
              <span className="text-xs">Laptop</span>
            </div>
            <span
              className="text-[1.5rem] font-bold lg:text-[2rem]"
              style={{ color: COLORS.Laptop }}
            >
              {laptopPercentage}%
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DevicesPieChart;
