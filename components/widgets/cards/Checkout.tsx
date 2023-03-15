import { FaAngleDown, FaCheckCircle } from "react-icons/fa";

import type { ReactNode, FunctionComponent } from "react";

type Props = {
  open?: boolean;
  checked?: boolean;
  title: string;
  description?: string;
  children: ReactNode;
};

const Checkout: FunctionComponent<Props> = ({
  title,
  checked,
  description,
  open = false,
  children = false,
}) => {
  return (
    <div className="w-full p-5 bg-white rounded-3xl transform transition-all duration-300 hover:shadow overflow-hidden space-y-5">
      <div className="space-y-2">
        <div className="w-full flex items-center justify-between">
          <div className="inline-flex items-center space-x-2">
            {checked && <FaCheckCircle className="w-4 h-4 text-green-500" />}
            <h2 className="text-xl font-medium">{title}</h2>
          </div>
          <button>
            <FaAngleDown
              id={`${title}-icon`}
              className={`${open && "rotate-180"} transition duration-300`}
            />
          </button>
        </div>

        <div>{description}</div>
      </div>

      <div
        id={`${title}-body`}
        className={`${!open && "hidden"} relative w-full space-y-5`}
      >
        {children}
        {checked && <div className="absolute inset-0 bg-transparent" />}
      </div>
    </div>
  );
};

export default Checkout;
