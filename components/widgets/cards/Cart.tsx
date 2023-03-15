import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import { fadeInUp, fadeInLeft } from "variants";
import { addToCart, removeCart } from "redux/_actions/cartAction";

import { FaTrash } from "react-icons/fa";
import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";

import type { ICartItems, IState } from "interface";
import {
  ChangeEventHandler,
  FunctionComponent,
  useEffect,
  useState,
} from "react";

type Props = {
  product: ICartItems;
};

const CartCard: FunctionComponent<Props> = ({ product }) => {
  const dispatch = useDispatch();
  const [quantity, setQuantity] = useState(product.quantity);

  const cart = useSelector((state: IState) => state.cart);
  const updateCart = (type: number) => {
    dispatch(addToCart(cart, product, type));
  };
  const removeProduct = () => {
    dispatch(removeCart(cart, product));
  };
  const increment = () => {
    if (quantity < product.countInStock) {
      setQuantity(quantity + 1);
      updateCart(1);
    }
  };

  const decrement = () => {
    if (quantity > 0) {
      setQuantity(quantity - 1);
      updateCart(-1);
    }
  };

  return (
    <motion.div
      variants={fadeInUp}
      className="w-full md:px-5 py-2 bg-white rounded-3xl hover:shadow"
    >
      <div className="w-full flex items-center space-x-3">
        <motion.div
          variants={fadeInLeft}
          className="w-2/5 h-16 md:w-40 md:h-32 relative"
        >
          <Image
            layout="fill"
            src={product.image[0]}
            alt={product.name}
            className="filter object-contain object-center"
          />
        </motion.div>
        <div className="w-full flex flex-col md:flex-row items-start md:items-center md:gap-3">
          <Link href={`/product/${product.slug}`}>
            <a className="w-full md:text-lg font-medium truncate">
              {product.name}
            </a>
          </Link>

          <div className="flex flex-col gap-1">
            <p className="text-xl font-bold">
              &#8358;{product.price.toLocaleString("en-US")}
            </p>
            {product.oldPrice && (
              <p className="text-xs font-medium text-gray-400 line-through">
                &#8358;{product.oldPrice.toLocaleString("en-US")}
              </p>
            )}
          </div>

          <div className="w-full flex space-x-2 divide-x-2 divide-primary">
            <div className="flex items-center space-x-3">
              <button
                onClick={decrement}
                className="p-2 rounded-full bg-primary disabled:bg-primary-100"
                disabled={quantity === 1}
              >
                <AiOutlineMinus className="w-4 h-4" />
              </button>
              <p className="font-medium">{quantity}</p>
              <button
                onClick={increment}
                disabled={quantity === product.countInStock}
                className="p-2 rounded-full bg-primary disabled:bg-primary-100"
              >
                <AiOutlinePlus className="w-4 h-4" />
              </button>
            </div>

            <button
              onClick={removeProduct}
              className="px-3 flex items-center text-[#FD1B1B] space-x-1"
            >
              <FaTrash className="w-4 h-4" />
              <span className="text-xs md:text-sm">Remove</span>
            </button>
          </div>
        </div>
      </div>

      <div className="w-full flex justify-between items-center space-x-1"></div>
    </motion.div>
  );
};

export default CartCard;
