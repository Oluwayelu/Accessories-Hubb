import { IBanner } from "interface";
import Image from "next/image";
import { FunctionComponent, ReactNode } from "react";

type Props = {
  banner: IBanner;
};
const Parallax: FunctionComponent<Props> = ({ banner }) => {
  const { title, image, color, discount, description, buttonText } = banner;

  return (
    <div className="relative w-full h-full flex justify-center items-center p-10 text-dark bg-white">
      <div className="relative w-full h-full inline-flex flex-col items-center space-y-2 z-10 text-white">
        {/* {discount && (
          <p>
            <span className="font-bold">{discount}%</span> discount
          </p>
        )} */}
        <h1 className="text-xl md:text-2xl lg:text-5xl font-bold">{title}</h1>
        <p className="lg:text-lg">{description}</p>
        {/* <button
          className="w-fit rounded px-10 py-2 lg:text-lg font-medium"
          style={{ backgroundColor: color }}
        >
          {buttonText}
        </button> */}
      </div>
      <div
        className="absolute inset-0"
        style={color ? { backgroundColor: color, opacity: 0.7 } : {}}
      />
      <div className="absolute">
        <div className="relative w-60 h-60 lg:w-[500px] lg:h-[500px] rotate-45">
          <Image
            layout="fill"
            alt="banner"
            src={image}
            className="filter obejct-contain object-center"
          />
        </div>
      </div>
    </div>
  );
};

export default Parallax;
