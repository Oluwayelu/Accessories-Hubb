import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";

type Props = {
  children: ReactNode;
  image?: string;
  color?: string;
  priority?: boolean;
};
const Parallax: FunctionComponent<Props> = ({
  children,
  image,
  color,
  priority = false,
}) => {
  return (
    <div className="w-full h-full relative bg-white">
      {image && (
        <Image
          alt="banner"
          src={image}
          layout="fill"
          priority={priority}
          className="filter obect-contain object-center"
        />
      )}
      <div
        className="absolute inset-0"
        style={color ? { backgroundColor: color, opacity: 0.5 } : {}}
      />
      <div className="relative inset-0 w-full h-full px-3 lg:px-10 text-dark">
        {children}
      </div>
    </div>
  );
};

export default Parallax;
