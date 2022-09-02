import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { FaOpencart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import type { IProduct } from "interface";
import type { FunctionComponent, MouseEventHandler } from "react";

type Props = {
  product: IProduct;
  addToCart: MouseEventHandler;
};

const ProductRow: FunctionComponent<Props> = ({ product, addToCart }) => {
  return (
    <motion.div
      whileHover={{ scale: [1, 0.9] }}
      whileInView={{ y: [50, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white rounded-t-xl text-black shadow transition-all cursor-pointer"
    >
      <div className="relative bg-gray-50 h-40 md:h-60 w-full flex justify-center items-center rounded-t-lg">
        <div className="relative h-3/4 w-3/4 md:h-2/3 md:w-2/3">
          <Image
            layout="fill"
            alt={product.name}
            src={product.image[0]}
            className="rounded-xl filter object-contain object-center"
          />
        </div>

        <div className="absolute top-7 left-0 px-3 py-1 rounded-r-lg bg-primary text-xs font-medium">
          -20%
        </div>
      </div>

      <div className="relative w-full p-3 md:p-5 flex flex-col md:flex-row items-end justify-between">
        <div className="w-full inline-flex flex-col justify-start">
          <Link href={`/product/${product.slug}`}>
            <a className="truncate">{product.name}</a>
          </Link>

          <div className="inline-flex space-x-1 text-primary">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <p className="text-xl font-bold">
            &#8358;{product.price.toLocaleString("en-US")}
          </p>
          <p className="text-xs font-medium text-gray-400 line-through">
            &#8358;{(product.price + 6000).toLocaleString("en-US")}
          </p>
        </div>

        <div
          onClick={addToCart}
          className="absolute bottom-3 right-3 w-10 h-10 rounded-full flex justify-center items-center bg-primary whitespace-nowrap"
        >
          <FaOpencart />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductRow;
