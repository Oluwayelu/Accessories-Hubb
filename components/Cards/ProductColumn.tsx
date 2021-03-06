import Image from "next/image";
import { motion } from "framer-motion";
import { AiFillHeart } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import type { IProduct } from "interface";
import type { FunctionComponent, MouseEventHandler } from "react";

type Props = {
  product: IProduct;
  addToCart: MouseEventHandler;
};

const ProductColumn: FunctionComponent<Props> = ({ product, addToCart }) => {
  return (
    <motion.div
      whileInView={{ y: [100, 0], opacity: [0, 1] }}
      transition={{ duration: 0.5 }}
      className="w-full bg-white flex flex-col-reverse md:flex-row items-start text-black shadow transition-all cursor-pointer"
    >
      <div className="w-full md:w-1/2 p-3 md:p-5 inline-flex flex-col justify-start">
        <h1 className="text-base md:text-xl font-light truncate">
          {product.name}
        </h1>
        <div className="inline-flex space-x-1 text-primary">
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStar />
          <FaStarHalfAlt />
        </div>
        <div className="inline-flex items-center space-x-3 ">
          <p className="text-xl font-bold">
            &#8358;{product.price.toLocaleString("en-US")}
          </p>
          <p className="text-xs font-medium text-gray-400 line-through">
            &#8358;{(product.price + 6000).toLocaleString("en-US")}
          </p>
        </div>
        <div className="inline-flex items-center space-x-3">
          <button className="px-3 py-1 rounded inline-flex items-center space-x-1 bg-primary text-white">
            <FaOpencart className="w-5 h-5" />
            <p className="text-xs hidden lg:inline">Add to cart</p>
          </button>
          <button
            onClick={addToCart}
            className="px-3 py-1 rounded border border-primary"
          >
            <AiFillHeart className="w-5 h-5 text-primary" />
          </button>
        </div>
      </div>

      <div className="bg-gray-100 h-40 w-full md:w-1/2 flex justify-center items-center">
        <div className="relative h-3/4 w-3/4 md:h-2/3 md:w-2/3">
          <Image
            layout="fill"
            alt={product.name}
            src={product.image[0]}
            className="rounded-xl filter object-contain object-center"
          />
        </div>
      </div>
    </motion.div>
  );
};

export default ProductColumn;
