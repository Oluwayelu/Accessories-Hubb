import React, { ChangeEvent, FunctionComponent } from "react";

type Props = {
  label: string;
  value: string;
  options: string[];
  onChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const Select: FunctionComponent<Props> = ({
  label,
  value,
  options,
  onChange,
}) => {
  return (
    <div className="w-full">
      {label && <label className="text-lg font-medium">{label}</label>}
      <select
        value={value}
        onChange={onChange}
        className="py-1 w-full capitalize bg-inherit border-b-2 border-b-primary"
      >
        {options &&
          options.map((option, index) => (
            <option key={index} value={option} className="capitalize">
              {option}
            </option>
          ))}
      </select>
    </div>
  );
};

export default Select;
