import { ErrorMessage } from "formik";

import type { ChangeEvent, ComponentProps } from "react";

type Props = {
  label?: string;
  formik?: boolean;
  options: string[];
  variant?: "border" | "underline";
} & ComponentProps<"select">;

const Select = ({
  label,
  formik,
  options,
  variant = "underline",
  ...props
}: Props) => {
  const getVariant = () => {
    switch (variant) {
      case "border":
        return "h-12 border-2 border-gray-400 focus:border-primary hover:border-primary rounded-xl";
      case "underline":
        return "py-1 border-b-2 border-b-gray-400 focus:border-b-primary hover:border-b-primary";
      default:
        return "";
    }
  };

  return (
    <div className="w-full">
      {label && <label className="text-sm font-semibold">{label}</label>}
      <select
        {...props}
        className={`${getVariant()} w-full  px-3 capitalize bg-white disabled:bg-gray-200 cursor-pointer`}
      >
        {options &&
          options.map((option, index) => (
            <option key={index} value={option} className="capitalize">
              {option}
            </option>
          ))}
      </select>
      {formik && props.name && (
        <ErrorMessage
          name={props.name}
          component="div"
          className="text-error"
        />
      )}
    </div>
  );
};

export default Select;
