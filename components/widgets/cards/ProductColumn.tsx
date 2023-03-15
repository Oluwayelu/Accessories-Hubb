import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { FaOpencart } from "react-icons/fa";
import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";

import { fadeInUp } from "variants";
import {
  addToFavourite,
  isFavourite,
  removeFavourite,
} from "redux/_actions/favouriteAction";
import { RatingStars } from "components";

import type { IProduct, AppState, IState } from "interface";
import type { FunctionComponent, MouseEventHandler } from "react";

type Props = {
  product: IProduct;
  addToCart: MouseEventHandler;
};

const ProductColumn: FunctionComponent<Props> = ({ product, addToCart }) => {
  const dispatch = useDispatch();
  const favourite = useSelector((state: IState) => state.favourite);

  const inFavourite = favourite.products.find((f) => f._id === product._id);
  const addToFavouriteHandler = () => {
    inFavourite
      ? dispatch(removeFavourite(favourite, product))
      : dispatch(addToFavourite(favourite, product));
    // isFavourite(favourite, product)
    //   ? dispatch(addToFavourite(favourite, product))
    //   : dispatch(removeFavourite(favourite, product));
  };
  return (
    <motion.div
      variants={fadeInUp}
      className="w-full bg-white flex flex-col-reverse lg:flex-row items-start text-black shadow transition-all cursor-pointer rounded-3xl overflow-clip"
    >
      <div className="w-full lg:w-1/2 p-3 lg:p-5 inline-flex flex-col justify-start">
        <Link href={`/product/${product.slug}`}>
          <a className="text-base lg:text-xl font-light truncate">
            {product.name}
          </a>
        </Link>
        <div className="inline-flex space-x-1 text-primary">
          <RatingStars rating={product.rating} />
        </div>
        <p className="text-xl font-bold">
          &#8358;{product.price.toLocaleString("en-US")}
        </p>
        {product.oldPrice && (
          <p className="text-xs font-medium text-gray-400 line-through">
            &#8358;{product.oldPrice.toLocaleString("en-US")}
          </p>
        )}
        <div className="inline-flex items-center space-x-3">
          <button
            onClick={addToCart}
            className="px-3 py-1 rounded inline-flex items-center space-x-1 bg-primary text-white"
          >
            <FaOpencart className="w-5 h-5" />
          </button>
          <button
            onClick={addToFavouriteHandler}
            className="px-3 py-1 rounded border border-primary"
          >
            {inFavourite ? (
              <AiFillHeart className="w-5 h-5 text-primary" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 text-primary" />
            )}
            {/* {isFavourite(favourite, product) ? (
              <AiFillHeart className="w-5 h-5 text-primary" />
            ) : (
              <AiOutlineHeart className="w-5 h-5 text-primary" />
            )} */}
          </button>
        </div>
      </div>

      <div className="relative h-40 w-full lg:w-1/2 flex justify-center items-center">
        <div className="relative h-3/4 w-3/4 lg:h-2/3 lg:w-2/3">
          <Image
            layout="fill"
            alt={product.name}
            src={product.image[0]}
            className="filter object-contain object-center"
          />
        </div>
        {product.oldPrice && (
          <div className="absolute top-0 -right-1 p-3 flex justify-center items-center rounded-full bg-primary-100 text-xs font-medium">
            {Math.floor(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}
            %
          </div>
        )}
      </div>
    </motion.div>
  );
};

export default ProductColumn;
