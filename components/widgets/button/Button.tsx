import type { ReactNode, ComponentProps } from "react";
import { Loader } from "../loader";

type Props = {
  color?: string;
  loading?: boolean;
  textColor?: string;
  variant?: "full" | "outline";
  children: ReactNode | string;
} & ComponentProps<"button">;

const Button = ({
  children,
  className,
  textColor,
  loading = false,
  variant = "full",
  color = "#F5BD10",
  ...props
}: Props) => {
  const getStyle = () => {
    switch (variant) {
      case "full":
        return "bg-primary disabled:bg-primary-100";
      case "outline":
        return "border-2 border-primary disabled:border-primary-100 text-primary disabled:text-primary-100";
      default:
        return "";
    }
  };
  return (
    <button
      className={` ${getStyle()} ${className} h-12 px-3 font-medium rounded-xl`}
      {...props}
    >
      {loading ? <Loader /> : children}
    </button>
  );
};

export default Button;
