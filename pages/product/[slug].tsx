import Link from "next/link";
import Image from "next/image";

import * as Yup from "yup";
import { Formik } from "formik";
import { useState } from "react";
import { motion } from "framer-motion";
import ReactStars from "react-rating-stars-component";
import { useDispatch, useSelector } from "react-redux";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";

import db from "database";
import { SEARCH } from "routes";
import { Product } from "models";
import { Input, RatingStars, ReviewCard, Landing } from "components";
import { addToCart } from "_redux/_actions/cartAction";
import { fadeInUp, fadeInDown, fadeInRight, stagger } from "variants";
import {
  addToFavourite,
  isFavourite,
  removeFavourite,
} from "_redux/_actions/favouriteAction";

import { AiFillHeart, AiOutlineHeart } from "react-icons/ai";
import { FaOpencart, FaAngleLeft, FaStar, FaStarHalf } from "react-icons/fa";

import type { AppState, IProduct } from "interface";
import type { NextPage, GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

type Props = {
  product: IProduct;
  similarProducts: IProduct[];
};

const ProductPage: NextPage<Props> = ({ product, similarProducts }) => {
  const [activeId, setActiveId] = useState(0);
  const dispatch = useDispatch();
  const cart = useSelector((state: AppState) => state.cart);
  const favourite = useSelector((state: AppState) => state.favourite);

  const addToCartHandler = () => {
    dispatch(addToCart(cart, product));
  };

  const addToFavouriteHandler = () => {
    !isFavourite(favourite, product)
      ? dispatch(addToFavourite(favourite, product))
      : dispatch(removeFavourite(favourite, product));
  };

  return (
    <Landing
      title={`${product.category} | ${product.name}`}
      className="relative"
    >
      <div className="space-y-5 py-5">
        <Link href={SEARCH}>
          <a className="flex items-center space-x-px px-3 md:px-5 lg:px-20 text-primary ">
            <FaAngleLeft className="w-4 h-4" />
            <p className="">Back to products</p>
          </a>
        </Link>
        <div className="w-full px-3 md:px-5 lg:px-20 flex flex-col lg:flex-row justify-center md:justify-start items-center lg:space-x-5">
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
                  } w-20 h-20 relative rounded-3xl shadow bg-white hover:bg-primary-100 cursor-pointer overflow-hidden`}
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
                <button onClick={addToFavouriteHandler}>
                  {isFavourite(favourite, product) ? (
                    <AiFillHeart className="w-5 h-5 text-primary" />
                  ) : (
                    <AiOutlineHeart className="w-5 h-5 text-primary" />
                  )}
                </button>
              </div>
            </motion.div>
            <motion.div
              variants={fadeInUp}
              className="inline-flex items-center space-x-1 text-primary"
            >
              <RatingStars rating={product.rating} />

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
                className="px-3 py-1 rounded inline-flex items-center space-x-1 border border-primary text-primary bg-white"
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
          </motion.div>
        </div>

        <div className="tab">
          <Tabs>
            <TabList>
              <Tab>Description</Tab>
              <Tab>Reviews</Tab>
            </TabList>
            <TabPanel>
              <motion.div variants={stagger} className="w-full mt-3">
                <p className="w-full text-2xl font-medium">Description</p>
                <motion.p variants={fadeInUp} className="">
                  {product.description}
                </motion.p>
              </motion.div>
            </TabPanel>
            <TabPanel>
              <motion.div
                variants={stagger}
                className="max-w-6xl mx-auto px-5 space-y-5"
              >
                <h1 className="text-xl md:text-2xl font-medium">
                  Product Reviews
                </h1>
                <Formik
                  initialValues={{ name: "", comment: "", rating: 0 }}
                  validationSchema={Yup.object().shape({
                    comment: Yup.string().required("Comment is required"),
                    rating: Yup.number().required("Rating is required"),
                  })}
                  onSubmit={(values, { setStatus, setSubmitting }) => {
                    setStatus();
                    console.log(values);
                    setSubmitting(false);
                  }}
                >
                  {({ handleSubmit, handleChange, values }) => (
                    <form
                      onSubmit={handleSubmit}
                      className="w-full md:w-80 flex flex-col items-start gap-1"
                    >
                      <h2 className="text-xl md:text-2xl font-medium">
                        Post review
                      </h2>
                      <Input
                        formik
                        name="name"
                        type="text"
                        label="Name"
                        value={values.comment}
                        onChange={handleChange}
                        placeholder="Full name"
                      />
                      <Input
                        formik
                        name="comment"
                        type="text"
                        label="Comment"
                        value={values.comment}
                        onChange={handleChange}
                        placeholder="What do you think about this product?"
                      />

                      <ReactStars
                        half
                        name="rating"
                        value={values.rating}
                        emptyIcon={<FaStar />}
                        filledIcon={<FaStar />}
                        halfIcon={<FaStarHalf />}
                        activeColor="#F5BD10"
                        onChange={(value: number) => console.log(value)}
                        // onChange={handleChange}
                      />

                      <button
                        type="submit"
                        className="px-5 py-2 font-medium bg-primary rounded disabled:bg-primary-100"
                      >
                        Submit
                      </button>
                    </form>
                  )}
                </Formik>

                <ReviewCard
                  image="/images/avatar/guy_3.png"
                  name="John Doe"
                  rating={3.0}
                  comment="Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa numquam vitae eos amet eum nemo eaque non dolores! Enim distinctio dolore id perferendis similique vero asperiores et eligendi eius!"
                />

                <ReviewCard
                  image="/images/avatar/guy_4.png"
                  name="John Doe"
                  rating={2.0}
                  comment="Did not get what i ordered, Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa numquam vitae eos amet eum nemo eaque non dolores! Enim distinctio dolore id perferendis similique vero asperiores et eligendi eius!"
                />
                {/* <ReviewCard
          image="/images/avatar/guy_2.png"
          name="Joseph Uchenna"
          rating={4.0}
          comment="Loved the product, Lorem ipsum dolor sit amet consectetur adipisicing elit. Maiores ipsa numquam vitae eos amet eum nemo eaque non dolores! Enim distinctio dolore id perferendis similique vero asperiores et eligendi eius!"
        /> */}

                <div className="flex justify-center">
                  <button className="px-5 py-2 text-white bg-primary rounded-full">
                    View more...
                  </button>
                </div>
              </motion.div>
            </TabPanel>
          </Tabs>
        </div>

        <div className="mt-10 md:mt-20 mb-10 px-3 md:px-5 lg:px-20 w-full flex flex-col justify-center cursor-pointer">
          <h1 className="text-center text-2xl font-medium">
            You may also like
          </h1>
          <motion.div
            variants={stagger}
            className="w-full py-2 flex flex-shrink-0 justify-start items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5"
          >
            {similarProducts.map((product, i) => (
              <Link key={i} href={`/product/${product.slug}`} passHref>
                <motion.div
                  variants={fadeInDown}
                  className="p-3 snap-start inline-flex flex-col flex-none justify-center items-center rounded-3xl shadow bg-gray-50"
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
