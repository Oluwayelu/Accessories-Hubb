import Image from "next/image";
import { useSelector } from "react-redux";

import { Pagination, Navigation, EffectFade } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

import db from "database";

import { CategoryCard, CircleCard, ProductCard } from "components";
import { motion } from "framer-motion";
import { Product } from "models";
import { Landing } from "layout";

import type { NextPage } from "next";
import type { IProduct, IState } from "interface";

type Props = {
  topRatedProducts: IProduct[];
};

const Home: NextPage<Props> = ({ topRatedProducts }) => {
  const categories = useSelector((state: IState) => state.product.category);

  return (
    <Landing title="Accessories Hubb">
      <div className="w-full h-[60vh] md:h-[70vh] flex flex-col md:flex-row justify-center gap-3">
        <Swiper
          modules={[Pagination, Navigation, EffectFade]}
          // navigation
          autoplay={true}
          loop
          // color="#F5BD10"
          effect="fade"
          centeredSlides
          // pagination={{ clickable: true }}
          slidesPerView={1}
          className="w-full md:w-3/4 h-full text-primary rounded-b-xl overflow-hidden"
        >
          <SwiperSlide>
            <Image
              alt="banner"
              src="/images/others/accessories.jpg"
              layout="fill"
              className="filter obect-contain object-center"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="banner"
              src="/images/others/Phone.jpg"
              layout="fill"
              className="filter obect-contain object-center"
            />
          </SwiperSlide>
          <SwiperSlide>
            <Image
              alt="banner"
              src="/images/others/EarPods.jpg"
              layout="fill"
              className="filter obect-contain object-center"
            />
          </SwiperSlide>
        </Swiper>
        <div className="w-full md:w-1/4 h-full flex md:flex-wrap justify-between gap-3">
          <div className="relative w-1/2 md:w-full bg-primary/50 rounded-xl md:rounded-none md:rounded-b-xl overflow-hidden">
            <Image
              alt="banner"
              src="/images/others/Phone.jpg"
              layout="fill"
              className="filter obect-contain object-center"
            />
          </div>
          <div className="relative w-1/2 md:w-full bg-primary/50 rounded-xl overflow-hidden">
            <Image
              alt="banner"
              src="/images/others/EarPods.jpg"
              layout="fill"
              className="filter obect-contain object-center"
            />
          </div>
        </div>
      </div>

      <motion.div
        whileInView={{ opacity: [0, 1] }}
        className="w-full flex flex-shrink-0 justify-start lg:justify-around items-center py-5 px-3 md:px-5 lg:px-10 space-x-3 overflow-x-auto scroll-p-5 snap-x scroll-smooth"
      >
        <div className="h-28 w-60 px-3 flex flex-none items-center bg-white shadow rounded-xl space-x-3">
          <div className="bg-white w-20 h-20 rounded-full"></div>
          <p>Free Shipping</p>
        </div>
        <div className="h-28 w-60 px-3 flex flex-none items-center bg-white shadow rounded-xl space-x-3">
          <div className="bg-white w-20 h-20 rounded-full"></div>
          <p>Free Shipping</p>
        </div>
        <div className="h-28 w-60 px-3 flex flex-none items-center bg-white shadow rounded-xl space-x-3">
          <div className="bg-white w-20 h-20 rounded-full"></div>
          <p>Free Shipping</p>
        </div>
        <div className="h-28 w-60 px-3 flex flex-none items-center bg-white shadow rounded-xl space-x-3">
          <div className="bg-white w-20 h-20 rounded-full"></div>
          <p>Free Shipping</p>
        </div>
      </motion.div>

      <div className="w-full py-5 lg:py-10 px-3 md:px-5 lg:px-10 space-y-5">
        <div className="w-full flex flex-shrink-0 justify-start lg:justify-center items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5 md:space-x-10">
          {categories &&
            categories.map((product, i) => (
              <CategoryCard key={i} product={product} />
            ))}
        </div>
      </div>

      <div className="w-full py-10 px-3 md:px-5 lg:px-10 md:py-20 flex flex-col lg:flex-row justify-start items-start lg:space-x-5">
        <div className="w-full lg:w-1/4">
          <div className="w-full shadow rounded-t-xl overflow-hidden">
            <h1 className="w-full py-2 pl-3 text-2xl font-medium bg-primary-100 ">
              Special Items
            </h1>

            <div className="w-full p-3 space-y-3">
              {categories.map((product, index) => (
                <ProductCard key={index} product={product} type="special" />
              ))}
            </div>
          </div>
        </div>

        <motion.div
          whileInView={{ y: [100, 0], opacity: [0, 1] }}
          className="w-full lg:w-3/4 space-y-10"
        >
          <motion.div
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            className="w-full space-y-5 cursor-pointer"
          >
            <h1 className="text-2xl font-medium">Top Rated Products</h1>
            <div className="w-full flex flex-shrink-0 justify-start items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5 md:space-x-10">
              {topRatedProducts.map((product, i) => (
                <CircleCard key={i} product={product} />
              ))}
            </div>
          </motion.div>

          <motion.div
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            className="w-full bg-white shadow rounded-t-xl overflow-hidden"
          >
            <h1 className="w-full py-2 pl-3 text-2xl font-medium bg-primary-100 ">
              New Products
            </h1>
            <div className="w-full p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
              {topRatedProducts.map((product: IProduct, index: number) => (
                <ProductCard key={index} product={product} type="row" />
              ))}
            </div>
          </motion.div>

          <motion.div
            whileInView={{ y: [100, 0], opacity: [0, 1] }}
            className="w-full bg-white shadow rounded-t-xl overflow-hidden"
          >
            <h1 className="w-full py-2 pl-3 text-2xl font-medium bg-primary-100 ">
              Top Selling Headphones
            </h1>
            <div className="w-full p-3 grid grid-cols-2  gap-3">
              {topRatedProducts.map((product: IProduct, index: number) => (
                <ProductCard key={index} product={product} type="column" />
              ))}
            </div>
          </motion.div>
        </motion.div>
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
  await db.disconnect();
  return {
    props: {
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
    },
  };
}

