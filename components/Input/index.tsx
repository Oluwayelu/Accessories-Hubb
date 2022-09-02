import { ErrorMessage } from "formik";
import React, { ChangeEvent, ComponentProps, FunctionComponent } from "react";

type InputProps = ComponentProps<"input">;
type Props = {
  name?: string;
  label?: string;
  value?: string;
  formik?: boolean;
  placeholder?: string;
  type?: InputProps["type"];
  caption?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
};

const Input: FunctionComponent<Props> = ({
  label,
  value,
  name,
  onChange,
  formik,
  caption,
  placeholder,
  type = "text",
}) => {
  return (
    <div className="w-full flex flex-col">
      {label && <label className=" text-sm font-semibold">{label}</label>}
      <input
        value={value}
        name={name}
        type={type}
        onChange={onChange}
        placeholder={placeholder}
        className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded"
      />
      {caption && <p className="text-xs text-left">{caption}</p>}
      {formik && name && (
        <ErrorMessage name={name} component="div" className="text-red-400" />
      )}
    </div>
  );
};

export default Input;
