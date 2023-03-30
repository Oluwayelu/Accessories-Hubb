import Image from "next/image";

import { AiOutlineUser } from "react-icons/ai";

import type { IconType } from "react-icons";

interface Props {
  src?: string;
  alt?: string;
  size?: "sm" | "md" | "lg";
}

const Avatar = ({ src, alt, size = "md" }: Props) => {
  const getSize = () => {
    switch (size) {
      case "sm":
        return "w-8 h-8 md:w-12 md:h-12";
      case "md":
        return "w-10 h-10 md:w-16 md:h-16";
      case "lg":
        return "w-14 h-14 md:w-20 md:h-20";
      default:
        return "";
    }
  };
  return (
    <div
      className={`${getSize()} relative flex justify-center items-center rounded-full bg-gray-200 text-gray-600 overflow-hidden`}
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
