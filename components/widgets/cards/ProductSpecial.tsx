import Image from "next/image";
import Link from "next/link";

import type { IProduct } from "interface";
import type { FunctionComponent } from "react";

type Props = {
  product: IProduct;
};

const ProductSpecial: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="w-full h-20 md:h-40 bg-white flex justify-between items-start space-x-3 hover:shadow cursor-pointer">
      <div className="bg-gray-50 w-1/2 md:1/3 h-full flex items-center justify-center">
        <div className="relative h-3/4 w-3/4 md:h-2/3 md:w-2/3">
          <Image
            layout="fill"
            alt={product.name}
            src={product.image[0]}
            className="rounded-xl filter object-contain object-center"
          />
        </div>
      </div>

      <div className="w-1/2 p-3 flex flex-col">
        <Link href={`/product/${product.slug}`}>
          <a className="truncate">{product.name}</a>
        </Link>
        <div className="inline-flex flex-col">
          <p className="text-xl font-bold">
            &#8358;{product.price.toLocaleString("en-US")}
          </p>
          <p className="text-xs font-medium text-gray-400 line-through">
            &#8358;{(product.price + 6000).toLocaleString("en-US")}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductSpecial;
