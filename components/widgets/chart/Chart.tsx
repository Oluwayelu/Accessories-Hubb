import Bar, { BarChartProps } from "./Bar";

type Props = {
  type?: "Bar" | "Donought" | "Pie" | "Line";
} & BarChartProps;

const Chart = ({ type = "Bar", ...props }: Props) => {
  switch (type) {
    case "Bar":
      return <Bar {...props} />;

    default:
      return null;
  }
};

export default Chart;
