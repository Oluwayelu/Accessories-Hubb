import type { ReactNode } from "react";

interface Props {
  children: ReactNode;
  className?: string;
}

const Badge = ({ className, children }: Props) => {
  return (
    <div
      className={`${className} relative px-3 py-1 flex justify-center items-center rounded-2xl overflow-hidden`}
    >
      <p className="text-xs whitespace-nowrap truncate">{children}</p>
    </div>
  );
};

export default Badge;
