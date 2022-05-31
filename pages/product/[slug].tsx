import Image from "next/image";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import db from "database";
import { Landing } from "layout";
import { Product } from "models";
import { addToCart } from "redux/_actions/cartAction";

import { AiFillHeart } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import type { IProduct, IState } from "interface";
import type { NextPage, GetServerSideProps } from "next";

type Props = {
  product: IProduct;
};

const ProductPage: NextPage<Props> = ({ product }) => {
  const [activeId, setActiveId] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state: IState) => state.cart);

  const addToCartHandler = () => {
    dispatch(addToCart(cart, product));
  };

  return (
    <Landing title={`${product.category} | ${product.name}`}>
      <div className="w-full py-5 px-3 md:px-5 lg:px-20 flex flex-col lg:flex-row justify-center md:justify-start items-center lg:space-x-5">
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col-reverse md:flex-row items-center">
          <div className="w-full md:w-1/4 flex md:flex-col justify-center items-center">
            {product.image.map((image, index) => (
              <div
                key={index}
                onClick={() => setActiveId(index)}
                className="w-20 h-20 relative border border-primary cursor-pointer"
              >
                <Image
                  src={image}
                  layout="fill"
                  alt={`${product.name}-${index}`}
                />
              </div>
            ))}
          </div>

          <div className="w-full md:w-3/4 flex justify-center items-center">
            <div className="w-80 h-80 relative">
              <Image
                src={product.image[activeId]}
                layout="fill"
                alt={`${product.name}`}
              />
            </div>
          </div>
        </div>

        <div className="w-full lg:w-1/3 flex flex-col space-y-3">
          <div>
            <p className="text-primary">{product.category}</p>
            <h1 className="text-xl md:text-2xl">{product.name}</h1>
          </div>
          <div className="inline-flex items-center space-x-1">
            <p className="text-xl font-bold">
              &#8358;{product.price.toLocaleString("en-US")}
            </p>
            <p className="text-xs font-medium text-gray-400 line-through">
              &#8358;4,500
            </p>
          </div>
          <div className="inline-flex space-x-1 text-primary">
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
          </div>
          <div className="inline-flex items-center space-x-3">
            <button
              onClick={addToCartHandler}
              className="px-3 py-1 rounded inline-flex items-center space-x-1 bg-primary text-white"
            >
              <FaOpencart className="w-7 h-7" />
              <p className="inline">Add to cart</p>
            </button>
            <button className="px-3 py-1 rounded border border-primary">
              <AiFillHeart className="w-7 h-7 text-primary" />
            </button>
          </div>
          <div className="w-full mt-3 shadow rounded-t-xl overflow-hidden">
            <p className="w-full py-2 px-3 font-medium bg-primary-100">
              Description
            </p>
            <p className="py-2 px-3 ">{product.description}</p>
          </div>
        </div>
      </div>
    </Landing>
  );
};

export default ProductPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();
  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
    },
  };
};
