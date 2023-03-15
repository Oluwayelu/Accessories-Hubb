import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { useSelector } from "react-redux";
import { FaOpencart } from "react-icons/fa";

import { fadeInUp } from "variants";
import { RatingStars } from "components";

import type { IProduct, IState } from "interface";
import type { FunctionComponent, MouseEventHandler } from "react";

type Props = {
  product: IProduct;
  addToCart: MouseEventHandler;
};

const ProductRow: FunctionComponent<Props> = ({ product, addToCart }) => {
  const { cartItems } = useSelector((state: IState) => state.cart);

  const inCart = cartItems.find((c) => c._id == product._id);

  return (
    <motion.div
      variants={fadeInUp}
      className="w-full bg-white rounded-3xl text-black hover:shadow transition-all overflow-hidden"
    >
      <div className="relative h-40 md:h-60 w-full flex justify-center items-center rounded-t-3xl">
        <div className="relative h-full w-full">
          <Image
            layout="fill"
            alt={product.name}
            src={product.image[0]}
            className="filter object-contain object-center"
          />
        </div>

        {product.oldPrice && (
          <div className="absolute top-0 -left-1 p-3 flex justify-center items-center rounded-full bg-primary-100 text-xs font-medium">
            {Math.floor(
              ((product.oldPrice - product.price) / product.oldPrice) * 100
            )}
            %
          </div>
        )}
        <div
          onClick={addToCart}
          className={`${
            inCart ? "bg-primary" : "bg-pr"
          } absolute top-3 right-3 p-2 rounded cursor-pointer`}
        >
          <FaOpencart className="w-3 h-3 md:w-5 md:h-5 " />
        </div>
      </div>

      <Link passHref href={`/product/${product.slug}`}>
        <div className="relative w-full p-3 md:p-5 flex flex-col md:flex-row items-end justify-between cursor-pointer">
          <div className="w-full inline-flex flex-col justify-start">
            <Link href={`/product/${product.slug}`}>
              <a className="truncate">{product.name}</a>
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
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

export default ProductRow;
