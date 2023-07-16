import Image from "next/image";

import Loader from "./Loader";

const PageLoader = () => {
  return (
    <div
      className="w-full h-full bg-primary-100 flex items-center justify-center absolute inset-0 opacity-70 z-50"
    >
      <Loader variant="spin" color="#F5BD10" />
    </div>
  );
};

export default PageLoader;
