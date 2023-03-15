import { useMemo, cloneElement, Children } from "react";

import type { ReactNode, FC } from "react";

type Props = {
  children: ReactNode;
  button: ReactNode;
};

const Dropdown: FC<Props> = ({ children, button }) => {
  const dropdownElements = useMemo(() => {
    const childrenArray = Children.toArray(children);
    const className =
      "last:border-b-0 border-b transition-colors whitespace-nowrap";

    return childrenArray.map((child: any) => {
      return cloneElement(child, {
        ...child.props,
        className: child.props.className + " " + className,
      });
    });
  }, [children]);

  return (
    <div className="group relative">
      {button}
      <div className="min-w-full hidden absolute right-0 group-hover:block transition-transform duration-1000 z-20">
        <div className="p-3 bg-white rounded-xl shadow overflow-hidden">
          {dropdownElements}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
