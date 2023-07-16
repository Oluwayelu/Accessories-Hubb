import Image from "next/image";

import { AiOutlineUser } from "react-icons/ai";

import type { IconType } from "react-icons";

interface Props {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
  className?: string
}

const Avatar = ({ src, alt, className, size = "md" }: Props) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8";
      case "md":
        return "w-16 h-16";
      case "lg":
        return "w-28 h-28";
      default:
        return "";
    }
  };
  return (
    <div
      className={`${getSize()} ${className && className} relative flex justify-center items-center rounded-full bg-gray-200 text-gray-600 overflow-hidden`}
    >
      {src ? (
        <div className="w-full h-full relative">
          <Image
            layout="fill"
            src={src}
            alt={alt}
            className="filter object-center object-cover"
          />
        </div>
      ) : (
        <AiOutlineUser className="w-1/2 h-1/2" />
      )}
    </div>
  );
};

export default Avatar;
