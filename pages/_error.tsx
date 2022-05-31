import Image from "next/image";
import { useSelector } from "react-redux";

import { Landing } from "layout";

import { IProduct, IState } from "interface";
import type { NextPageContext } from "next";

interface ErrorProps {
  statusCode?: number;
  title?: string;
}

const statusCodes: { [code: number]: string } = {
  400: "Bad Request",
  404: "Page not found",
  405: "Method Not Allowed",
  500: "Internal Server Error",
};

const Error = ({ statusCode }: ErrorProps) => {
  const categories = useSelector((state: IState) => state.product.category);

  return (
    <Landing title={`${statusCode} Error`}>
      <div className="relative w-full h-[60vh] px-3 md:px-5 lg:px-10 flex flex-col justify-center items-center overflow-hidden space-y-5">
        <div className="w-full md:w-2/3 lg:w-1/2 p-5 text-center rounded shadow z-20">
          <h1 className="text-3xl md:text-6xl font-bold">{statusCode}</h1>
          <p className="text-lg">{statusCode && statusCodes[statusCode]}</p>
          <button className="py-2 px-3 font-medium bg-primary rounded">
            Continue shopping
          </button>
        </div>

        <div className="w-full flex flex-shrink-0 justify-start lg:justify-center items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5 md:space-x-10 z-20">
          {categories &&
            categories.map((product: IProduct, i: number) => (
              <div
                key={i}
                className="relative w-24 h-24 md:w-40 md:h-40 snap-start inline-flex flex-none justify-center items-center rounded-full shadow bg-gray-100 overflow-hidden"
              >
                <div className="relative w-1/2 h-1/2">
                  <Image
                    alt={product.name}
                    src={product.image[0]}
                    layout="fill"
                  />
                </div>
                <p className="bg-primary pb-2 pt-1 absolute bottom-0 left-0 right-0 text-center text-xs md:text-sm capitalize font-medium">
                  {product.category}
                </p>
              </div>
            ))}
        </div>
        <div className="absolute -top-[250px] -right-[125px]  lg:-top-[500px] lg:-right-[250px] w-[350px] h-[350px] lg:w-[700px] lg:h-[700px] rounded-full bg-primary-100 z-0" />
        <div className="absolute -bottom-[250px] -left-[125px]  lg:-bottom-[500px] lg:-left-[250px] w-[350px] h-[350px] lg:w-[700px] lg:h-[700px] rounded-full bg-primary-100 z-0" />
      </div>
    </Landing>
  );
};

Error.getInitialProps = ({ res, err }: NextPageContext) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;

  return { statusCode };
};

export default Error;
