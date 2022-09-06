import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { useDispatch, useSelector } from "react-redux";

import db from "database";
import { fadeInUp, fadeInDown, fadeInRight, stagger } from "variants";
import { Landing } from "layout";
import { Product } from "models";
import { addToCart } from "redux/_actions/cartAction";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaOpencart } from "react-icons/fa";
import { FaStar, FaStarHalfAlt } from "react-icons/fa";

import type { IProduct, IState } from "interface";
import type { NextPage, GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

type Props = {
  product: IProduct;
  similarProducts: IProduct[];
};

const ProductPage: NextPage<Props> = ({ product, similarProducts }) => {
  const [activeId, setActiveId] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state: IState) => state.cart);

  const addToCartHandler = () => {
    dispatch(addToCart(cart, product));
  };

  return (
    <Landing title={`${product.category} | ${product.name}`}>
      <div className="w-full py-5 px-3 md:px-5 lg:px-20 flex flex-col lg:flex-row justify-center md:justify-start items-center lg:space-x-5">
        <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center">
          <div className="w-full flex justify-center items-center">
            <motion.div variants={fadeInRight} className="w-80 h-80 relative">
              <Image
                src={product.image[activeId]}
                layout="fill"
                alt={`${product.name}`}
              />
            </motion.div>
          </div>
          <div className="w-full flex justify-center items-center space-x-1">
            {product.image.map((image, index) => (
              <div
                key={index}
                onMouseEnter={() => setActiveId(index)}
                className={`${
                  activeId === index && "bg-primary-100"
                } w-20 h-20 relative rounded shadow hover:bg-primary-100 cursor-pointer`}
              >
                <Image
                  src={image}
                  layout="fill"
                  alt={`${product.name}-${index}`}
                />
              </div>
            ))}
          </div>
        </div>

        <motion.div
          variants={stagger}
          className="w-full lg:w-2/3 flex flex-col space-y-3"
        >
          <motion.div variants={fadeInUp}>
            <p className="text-primary">{product.category}</p>
            <div className="flex items-start">
              <h1 className="text-xl md:text-2xl">{product.name}</h1>
              <button>
                {/* <AiFillHeart className="w-5 h-5 text-primary" /> */}
                <AiOutlineHeart className="w-5 h-5 text-primary" />
              </button>
            </div>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-1 text-primary"
          >
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStar />
            <FaStarHalfAlt />
            <p>(20)</p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-1"
          >
            <p className="text-2xl md:text-3xl font-bold">
              &#8358;{product.price.toLocaleString("en-US")}
            </p>
            <p className="text-lg md:text-xl font-medium text-gray-400 line-through">
              &#8358;4,500
            </p>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="inline-flex items-center space-x-3"
          >
            <button
              onClick={addToCartHandler}
              className="px-3 py-1 rounded inline-flex items-center space-x-1 border border-primary text-primary"
            >
              <FaOpencart className="w-5 h-5" />
              <p className="inline">Add to cart</p>
            </button>
            <Link href="/cart">
              <a className="px-3 py-1 rounded inline-flex items-center space-x-1 bg-primary text-white">
                Buy now
              </a>
            </Link>
          </motion.div>
          <motion.div
            variants={fadeInUp}
            className="w-full mt-3 shadow rounded-t-xl overflow-hidden"
          >
            <p className="w-full py-2 px-3 font-medium bg-primary-100">
              Description
            </p>
            <p className="py-2 px-3 text-xl">{product.description}</p>
          </motion.div>
        </motion.div>
      </div>

      <div className="mt-10 md:mt-20 mb-10 px-3 md:px-5 lg:px-20 w-full flex flex-col justify-center cursor-pointer">
        <h1 className="text-center text-2xl font-medium">You may also like</h1>
        <motion.div
          variants={stagger}
          className="w-full py-2 flex flex-shrink-0 justify-start items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5"
        >
          {similarProducts.map((product, i) => (
            <Link key={i} href={`/product/${product.slug}`} passHref>
              <motion.div
                variants={fadeInDown}
                className="p-3 snap-start inline-flex flex-col flex-none justify-center items-center rounded shadow bg-gray-50"
              >
                <div key={i} className="w-40 h-40 md:w-60 md:h-60 relative">
                  <Image
                    src={product.image[product.image.length - 1]}
                    layout="fill"
                    alt={`${product.name}`}
                  />
                </div>
                <p className="text-center text-sm font-medium">
                  {product.name}
                </p>
              </motion.div>
            </Link>
          ))}
        </motion.div>
      </div>
    </Landing>
  );
};

export default ProductPage;

interface Params extends ParsedUrlQuery {
  slug: string;
}
export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  const { slug } = params;

  await db.connect();
  const product = await Product.findOne({ slug }, "-reviews").lean();

  const similarProducts = await Product.find(
    {
      brand: product.brand,
      category: product.category,
    },
    "-reviews"
  )
    .sort({ price: 1 })
    .limit(8)
    .lean();

  const filteredSimilarProducts = similarProducts.filter(
    (similarProduct) => similarProduct.slug !== product.slug
  );

  await db.disconnect();
  return {
    props: {
      product: db.convertDocToObj(product),
      similarProducts: filteredSimilarProducts.map(db.convertDocToObj),
    },
  };
};
