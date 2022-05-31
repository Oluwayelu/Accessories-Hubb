import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeCart } from "redux/_actions/cartAction";

import { AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { FaTrash, FaPlus, FaMinus } from "react-icons/fa";

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
    <motion.div className="w-full px-5 py-2 rounded shadow bg-white">
      <div className="w-full flex items-start space-x-3">
        <div className="w-20 h-16 md:w-40 md:h-32 relative">
          <Image
            layout="fill"
            src={product.image[0]}
            alt={product.name}
            className="filter object-contain object-center"
          />
        </div>
        <Link href={`/product/${product.slug}`}>
          <a className="w-full md:text-lg font-medium truncate">
            {product.name}
          </a>
        </Link>

        <div className="text-right">
          <p className="text-xl font-bold">
            &#8358;{product.price.toLocaleString("en-US")}
          </p>
          <p className="text-xs font-medium text-gray-400 line-through">
            &#8358;{(product.price + 6000).toLocaleString("en-US")}
          </p>
        </div>
      </div>

      <div className="w-full flex justify-between items-center space-x-1">
        <button
          onClick={removeProduct}
          className="flex items-center text-[#FD1B1B] rounded space-x-1"
        >
          <FaTrash className="w-4 h-4" />
          <span className="text-xs md:text-sm">Remove</span>
        </button>

        <div className="flex items-end space-x-3">
          <button
            onClick={decrement}
            className="p-1 rounded bg-primary disabled:bg-primary-100"
            disabled={quantity === 1}
          >
            <AiOutlineMinus className="w-4 h-4" />
          </button>
          <p>{quantity}</p>
          <button
            onClick={increment}
            disabled={quantity === product.countInStock}
            className="p-1 rounded bg-primary disabled:bg-primary-100"
          >
            <AiOutlinePlus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default CartCard;
