import Image from "next/image";

import type { IProduct } from "interface";
import type { FunctionComponent } from "react";

type Props = {
  product: IProduct;
};

const Circle: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="w-20 h-20 md:w-40 md:h-40 snap-start inline-flex flex-none justify-center items-center rounded-full shadow bg-gray-100">
      <div className="relative w-1/2 h-1/2">
        <Image alt={product.name} src={product.image[0]} layout="fill" />
      </div>
    </div>
  );
};

export default Circle;
