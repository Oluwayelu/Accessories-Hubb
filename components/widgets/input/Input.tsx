import { ErrorMessage } from "formik";
import React, { ChangeEvent, ComponentProps, FunctionComponent } from "react";

type InputProps = ComponentProps<"input">;
type Props = {
  label?: string;
  formik?: boolean;
  caption?: string;
} & InputProps;

const Input: FunctionComponent<Props> = ({
  label,
  formik,
  caption,
  ...props
}) => {
  return (
    <div className={`${props.className} w-full flex flex-col`}>
      {label && <label className="text-sm font-semibold">{label}</label>}
      <input
        {...props}
        className="px-3 py-2 border-2 border-gray-400 focus:border-primary rounded-xl disabled:bg-gray-200"
      />
      {caption && <p className="text-xs text-left">{caption}</p>}
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

export default Input;
