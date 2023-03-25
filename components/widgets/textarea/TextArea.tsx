import { ErrorMessage } from "formik";

import React, { ComponentProps } from "react";

type TextAreaProps = ComponentProps<"textarea">;
type Props = {
  label?: string;
  formik?: boolean;
  caption?: string;
} & TextAreaProps;

const TextArea = ({ label, formik, caption, ...props }: Props) => {
  return (
    <div className={`${props.className} w-full flex flex-col`}>
      {label && <label className="text-sm font-semibold">{label}</label>}
      <textarea
        rows={6}
        {...props}
        className="p-3 border-2 border-gray-400 focus:border-primary rounded-xl disabled:bg-gray-200"
      />

      {caption && <p className="text-xs text-left text-gray-400">{caption}</p>}
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

export default TextArea;
