import { FC } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
      },
    },
    y: {
      display: false,
      grid: {
        display: false,
      },
    },
  },
};

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

type AnalyticsChartProps = {
  months?: string[];
  failures?: number[];
  successes?: number[];
};

const AnalyticsChart: FC<AnalyticsChartProps> = ({
  months = [],
  failures = [],
  successes = [],
}) => {
  const defaultMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  const defaultData = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
  const data = {
    labels: months.length === 0 ? defaultMonths : months,
    datasets: [
      {
        data: successes.length === 0 ? defaultData : successes,
        borderColor: 'rgb(76,175,80)',
        backgroundColor: 'rgb(76,175,80, 0.5)',
      },
      {
        data: failures.length === 0 ? defaultData : failures,
        borderColor: 'rgb(199,0,0)',
        backgroundColor: 'rgb(199,0,0,0.5)',
      },
    ],
  };

  return (
    <div className="pt-5">
      <Line options={options} data={data} />
    </div>
  );
};

export default AnalyticsChart;
