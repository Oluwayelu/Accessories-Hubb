import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  image: string;
  priority?: boolean;
};
const Parallax: FunctionComponent<Props> = ({
  children,
  image,
  priority = false,
}) => {
  return (
    <div className="w-full h-full relative">
      <Image
        alt="banner"
        src={image}
        layout="fill"
        priority={priority}
        className="filter obect-contain object-center"
      />
      <div className="absolute inset-0 bg-primary-100/40" />
      <div className="absolute inset-0 w-full h-full px-3 lg:px-10 text-dark">
        {children}
      </div>
    </div>
  );
};

export default Parallax;
