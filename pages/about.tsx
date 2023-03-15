import Image from "next/image";

import { Landing } from "components";

const About = () => {
  return (
    <Landing
      title="About Us"
      description="About Accessoriess Hubb"
      className="p-3"
    >
      <div className="relative max-w-6xl mt-5 p-5 mx-auto h-[30vh] bg-primary-100 flex flex-col items-center justify-center rounded-3xl shadow-xl space-y-5">
        <div className="relative w-60 h-20 cursor-pointer">
          <Image
            priority
            src="/images/logo/logo.png"
            layout="fill"
            alt="logo"
            className="rounded-3xl"
          />
        </div>
        <h1 className="text-4xl font-medium">About Us</h1>
      </div>
    </Landing>
  );
};

export default About;
