import {
  Chart as ChartJs,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJs.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export interface BarChartProps {
  title?: string;
  data: {
    labels: string[];
    datasets: any[];
  };
}

const BarChart = ({ title, data }: BarChartProps) => {
  const options = {
    plugins: {
      title: {
        display: title !== undefined,
        text: title,
      },
    },
    responsive: true,
    interaction: {
      mode: "index" as const,
      intersect: false,
    },
    scales: {
      x: {
        stacked: true,
      },
      y: {
        stacked: true,
      },
    },
  };

  return <Bar options={options} data={data} />;
};

export default BarChart;
