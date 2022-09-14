import Image from "next/image";
import Slick from "react-slick";
import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
import { useSelector } from "react-redux";

import { Pagination, Navigation, EffectFade, EffectFlip } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import {} from "react-loading-skeleton";

import db from "database";

import { CategoryCard, CircleCard, Parallax, ProductCard } from "components";
import { motion } from "framer-motion";
import { Banner, Product } from "models";
import { Landing } from "layout";
import { stagger } from "variants";

import type { NextPage } from "next";
import type { IBanner, IProduct, IState } from "interface";

type Props = {
  topRatedProducts: IProduct[];
  banners: IBanner[];
};

const Home: NextPage<Props> = ({ topRatedProducts, banners }) => {
  const categories = useSelector((state: IState) => state.product.category);

  return (
    <Landing title="" description="Welcome to Accessoriess Hubb">
      <div className="w-full h-[60vh] md:h-[70vh] flex flex-col md:flex-row justify-center gap-3 z-20">
        <Swiper
          modules={[Pagination, Navigation, EffectFlip]}
          // navigation
          autoplay={true}
          loop={true}
          // color="#F5BD10"
          effect="fade"
          centeredSlides
          // pagination={{ clickable: true }}
          slidesPerView={1}
          className="w-full md:w-3/4 h-full bg-primary text-primary rounded-b-xl shadow overflow-hidden"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Parallax color={banner.color}>
                <div className="absolute inset-0 w-full h-full px-3 lg:px-10 pt-10 text-dark flex flex-col items-start justify-start md:justify-center space-y-3">
                  <div className="w-2/3">
                    {banner.discount && (
                      <p className="font-medium">{banner.discount}% discount</p>
                    )}
                    <h1 className="text-xl md:text-2xl lg:text-5xl font-semibold">
                      {banner.title}
                    </h1>
                    <p className="lg:text-lg">{banner.description}</p>
                  </div>

                  <div className="absolute top-0 md:top-[20%] -right-1/4 md:right-1">
                    <div className="relative w-80 h-80 lg:w-[400px] lg:h-[400px]">
                      <Image layout="fill" alt="banner" src={banner.image} />
                    </div>
                  </div>

                  <button
                    className="rounded px-10 py-2 lg:text-lg font-medium"
                    style={{ backgroundColor: banner.color }}
                  >
                    {banner.buttonText}
                  </button>
                </div>
              </Parallax>
            </SwiperSlide>
          ))}
        </Swiper>

        <div className="px-5 md:px-0 -mt-20 md:mt-0 w-full md:w-1/4 h-1/3 md:h-full flex md:flex-wrap justify-between gap-3 z-20 md:z-0">
          <div
            className="w-1/2 md:w-full flex justify-center items-center rounded-xl md:rounded-none md:rounded-b-xl overflow-hidden"
            style={{ backgroundColor: banners[0].color }}
          >
            <div className="relative w-2/3 h-3/4">
              <Image
                alt="banner"
                src={banners[0].image}
                layout="fill"
                className="filter obect-contain object-center"
              />
            </div>
          </div>
          <div
            className="w-1/2 md:w-full flex justify-center items-center rounded-xl overflow-hidden"
            style={{ backgroundColor: banners[1].color }}
          >
            <div className="relative w-2/3 h-3/4">
              <Image
                alt="banner"
                src={banners[1].image}
                layout="fill"
                className="filter obect-contain object-center"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="w-full py-5 lg:py-10 px-3 md:px-5 lg:px-10 space-y-5">
        <motion.div
          variants={stagger}
          className="w-full flex flex-shrink-0 justify-start lg:justify-center items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5 md:space-x-10"
        >
          {categories &&
            categories.map((product, i) => (
              <CategoryCard key={i} product={product} />
            ))}
        </motion.div>
      </div>

      <div className="w-full py-10 px-3 md:px-5 lg:px-10 md:py-20 flex flex-col lg:flex-row justify-start items-start lg:space-x-5">
        <div className="w-full lg:w-1/4">
          <div className="w-full shadow rounded-t-xl overflow-hidden">
            <h1 className="w-full py-2 pl-3 text-2xl font-medium bg-primary-100 ">
              Special Items
            </h1>

            <motion.div variants={stagger} className="w-full p-3 space-y-3">
              {categories.map((product, index) => (
                <ProductCard key={index} product={product} type="special" />
              ))}
            </motion.div>
          </div>
        </div>

        <div className="w-full lg:w-3/4 space-y-10">
          <div className="w-full space-y-5 cursor-pointer">
            <h1 className="text-2xl font-medium">Top Rated Products</h1>
            <motion.div
              variants={stagger}
              className="w-full py-2 flex flex-shrink-0 justify-start items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5 md:space-x-10"
            >
              {topRatedProducts.map((product, i) => (
                <CircleCard key={i} product={product} />
              ))}
            </motion.div>
          </div>

          <div className="w-full bg-white shadow rounded-t-xl overflow-hidden">
            <h1 className="w-full py-2 pl-3 text-2xl font-medium bg-primary-100 ">
              New Products
            </h1>
            <motion.div
              variants={stagger}
              className="w-full p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3"
            >
              {topRatedProducts.map((product: IProduct, index: number) => (
                <ProductCard key={index} product={product} type="row" />
              ))}
            </motion.div>
          </div>

          <div className="w-full bg-white shadow rounded-t-xl overflow-hidden">
            <h1 className="w-full py-2 pl-3 text-2xl font-medium bg-primary-100 ">
              Top Selling Headphones
            </h1>
            <motion.div
              variants={stagger}
              className="w-full p-3 grid grid-cols-2  gap-3"
            >
              {topRatedProducts.map((product: IProduct, index: number) => (
                <ProductCard key={index} product={product} type="column" />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </Landing>
  );
};

export default Home;

export async function getServerSideProps() {
  await db.connect();
  const topRatedProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      rating: -1,
    })
    .limit(8);

  const bannersDocs = await Banner.find({}).lean();
  await db.disconnect();
  return {
    props: {
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
      banners: bannersDocs.map(db.convertDocToObj),
    },
  };
}

