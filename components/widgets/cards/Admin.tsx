import type { ReactNode } from "react";
import type { ISummary } from "interface";

interface Props {
  icon?: JSX.Element;
  title: string;
  value: number;
  currency?: boolean;
}

const Admin = ({ title, value, icon, currency = false }: Props) => {
  return (
    <div className="w-full p-5 flex flex-col xl:flex-row items-center bg-white shadow rounded-xl gap-3">
      {/* Card Icon */}
      <div className="w-full xl:w-1/3 inline-flex items-center justify-center">
        <div className="w-16 h-16 bg-primary-100 rounded-full">{icon}</div>
      </div>
      <div className="w-full xl:w-2/3 inline-flex flex-col items-center xl:items-start">
        <h2 className="text-xl font-medium">{title}</h2>
        <p className="text-lg">
          {currency && <span>&#8358;</span>}
          {value.toLocaleString("en-US")}
        </p>
      </div>
    </div>
  );
};

export default Admin;
