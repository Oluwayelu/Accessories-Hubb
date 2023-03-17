import { useState } from "react";
import { ErrorMessage } from "formik";

import { FaEye, FaEyeSlash } from "react-icons/fa";

import React, { ChangeEvent, ComponentProps, FunctionComponent } from "react";

type InputProps = ComponentProps<"input">;
type Props = {
  label?: string;
  formik?: boolean;
  caption?: string;
} & InputProps;

const Input = ({ label, formik, caption, ...props }: Props) => {
  const [password, setPassword] = useState<boolean>(true);

  return (
    <div className={`${props.className} w-full flex flex-col`}>
      {label && <label className="text-sm font-semibold">{label}</label>}
      {props.type === "password" ? (
        <div
          className={`${props.className} w-full h-12 flex items-center justify-between px-3 border-2 bg-white border-gray-400 focus:border-primary rounded-xl disabled:bg-gray-200 space-x-3`}
        >
          <input
            {...props}
            type={password ? "password" : "text"}
            className="w-full h-full bg-transparent"
          />
          <div
            className="cursor-pointer"
            onClick={() => setPassword(!password)}
          >
            {password ? (
              <FaEye className="text-gray-400" />
            ) : (
              <FaEyeSlash className="text-gray-400" />
            )}
          </div>
        </div>
      ) : (
        <input
          {...props}
          className="px-3 h-12 border-2 border-gray-400 focus:border-primary rounded-xl disabled:bg-gray-200"
        />
      )}

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

export default Input;
