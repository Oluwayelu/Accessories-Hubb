import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { FaOpencart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import {
  addToFavourite,
  isFavourite,
  removeFavourite,
} from "redux/_actions/favouriteAction";
import { fadeInUp } from "variants";

import type { IProduct, AppState } from "interface";
import type { FunctionComponent, MouseEventHandler } from "react";

type Props = {
  product: IProduct;
  addToCart: MouseEventHandler;
};

const ProductColumn: FunctionComponent<Props> = ({ product, addToCart }) => {
  const dispatch = useDispatch();
  const favourite = useSelector((state: AppState) => state.favourite);

  const addToFavouriteHandler = () => {
    !isFavourite(favourite, product)
      ? dispatch(addToFavourite(favourite, product))
      : dispatch(removeFavourite(favourite, product));
  };
  return (
    <motion.div
      variants={fadeInUp}
      className="w-full bg-white flex flex-col-reverse md:flex-row items-start text-black shadow transition-all cursor-pointer"
    >
      <div className="w-full md:w-1/2 p-3 md:p-5 inline-flex flex-col justify-start">
        <Link href={`/product/${product.slug}`}>
          <a className="text-base md:text-xl font-light truncate">
            {product.name}
          </a>
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
        <div className="inline-flex items-center space-x-3">
          <button
            onClick={addToCart}
            className="px-3 py-1 rounded inline-flex items-center space-x-1 bg-primary text-white"
          >
            <FaOpencart className="w-5 h-5" />
            <p className="text-xs hidden lg:inline">Add to cart</p>
          </button>
          <button
            onClick={addToFavouriteHandler}
            className="px-3 py-1 rounded border border-primary"
          >
            {isFavourite(favourite, product) ? (
              <AiFillHeart className="w-5 h-5 text-primary" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 text-primary" />
            )}
          </button>
        </div>
      </div>

      <div className="relative bg-gray-50 h-40 w-full md:w-1/2 flex justify-center items-center">
        <div className="relative h-3/4 w-3/4 md:h-2/3 md:w-2/3">
          <Image
            layout="fill"
            alt={product.name}
            src={product.image[0]}
            className="rounded-xl filter object-contain object-center"
          />
        </div>
        <div className="absolute top-7 right-0 px-3 py-1 rounded-l-lg bg-primary text-xs font-medium">
          -20%
        </div>
      </div>
    </motion.div>
  );
};

export default ProductColumn;
