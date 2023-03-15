import Link from "next/link";
import { useState } from "react";
import { EffectFade } from "swiper";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FaAngleRight } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";

import db from "database";
import {
  Search,
  Landing,
  Parallax,
  CircleCard,
  ProductCard,
  CategoryCard,
  CategorySection,
  Banner as BannerCard,
} from "components";
import { stagger } from "variants";
import { Banner, Product } from "models";

import type { NextPage } from "next";
import type { SetStateAction } from "react";
import type { IBanner, IProduct, IState } from "interface";

type Props = {
  newProducts: IProduct[];
  topRatedProducts: IProduct[];
  topSellingHeadphones: IProduct[];
  banners: IBanner[];
};

const Home: NextPage<Props> = ({
  newProducts,
  topRatedProducts,
  topSellingHeadphones,
  banners,
}) => {
  const { push } = useRouter();
  const [query, setQuery] = useState("");
  const queryChangeHandler = (e: {
    target: { value: SetStateAction<string> };
  }) => {
    setQuery(e.target.value);
  };

  const categories = useSelector((state: IState) => state.product.category);

  const submitHandler = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    push(`/search?query=${query}`);
  };

  return (
    <Landing
      title=""
      description="Welcome to Accessoriess Hubb"
      className="p-3"
    >
      <div className="relative max-w-6xl mt-5 mx-auto h-[50vh] lg:h-[70vh] flex justify-center items-center rounded-3xl shadow-xl over">
        <Swiper
          modules={[EffectFade]}
          autoplay={true}
          loop={true}
          effect="fade"
          centeredSlides
          slidesPerView={1}
          className="relative w-full h-full rounded-3xl"
        >
          {banners.map((banner, index) => (
            <SwiperSlide key={index}>
              <Parallax banner={banner} />
            </SwiperSlide>
          ))}
        </Swiper>

        <Search />
        <div className="absolute md:bottom-1/2 w-3/4 md:w-1/2 flex items-center gap-2 bg-white px-4 rounded-lg overflow-visible z-20">
          {/* <button
            className="p-3 my-2 w-10 h-10 bg-primary flex items-center justify-center rounded-full"
            // onClick={handleSubmit}
          >
            <AiOutlineSearch />
          </button>

          <form className="w-full">
            <input
              type="search"
              name="search"
              placeholder="Search Product"
              className="border-none w-full h-full border-0 m-0 py-0 "
              // onChange={handleChange}
              // value={search}
            />
          </form> */}
        </div>
      </div>

      <div className="relative max-w-xl md:max-w-4xl mx-auto -mt-36 lg:-mt-60 hidden md:flex justify-center gap-3 z-20">
        {topRatedProducts
          .slice(0, 3)
          .map((product: IProduct, index: number) => (
            <ProductCard key={index} product={product} type="row" />
          ))}
      </div>

      {/* <div className="relative px-5 max-w-xl mx-auto h-[50vh] -mt-40  flex gap-3 z-40">
        {banners.map((banner, key) => (
          <div
            key={key}
            className="w-1/2 h-full flex justify-center items-center rounded-xl overflow-hidden"
            style={{ backgroundColor: banner.color }}
          >
            <div className="relative w-2/3 h-2/3">
              <Image
                alt="banner"
                src={banner.image}
                layout="fill"
                className="filter obect-contain object-center"
              />
            </div>
          </div>
        ))}
      </div> */}

      <div className="max-w-6xl mx-auto my-5 bg-white rounded-3xl text-center py-5 lg:py-10 px-3 md:px-5 lg:px-10 shadow space-y-5">
        <h1 className="font-medium text-2xl">Categories</h1>
        <motion.div
          variants={stagger}
          className="w-full flex flex-shrink-0 justify-center items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5 md:space-x-10"
        >
          {categories &&
            categories.map((product, i) => (
              <CategoryCard key={i} product={product} />
            ))}
        </motion.div>
      </div>

      <div className="max-w-6xl mx-auto space-y-10">
        <div className="w-full space-y-5 cursor-pointer">
          <div className="w-full flex items-center justify-between">
            <h1 className="text-2xl font-medium">Top Rated Products</h1>
            <div className="inline-flex items-center gap-2">
              See all <FaAngleRight />
            </div>
          </div>
          <motion.div
            variants={stagger}
            className="w-full py-2 flex flex-shrink-0 justify-start items-center overflow-x-auto scroll-p-5 snap-x scroll-smooth space-x-5 md:space-x-10"
          >
            {topRatedProducts.map((product, i) => (
              <CircleCard key={i} product={product} />
            ))}
          </motion.div>
        </div>
        <BannerCard
          image={banners[0].image}
          info={banners[0].description}
          btntext="Explore All"
          bgColor={banners[0].color}
        />
        <div className="w-full">
          <h1 className="w-full py-2 pl-3 text-2xl font-medium ">
            New Products
          </h1>
          <motion.div
            variants={stagger}
            className="w-full p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
          >
            {newProducts.map((product: IProduct, index: number) => (
              <ProductCard key={index} product={product} type="row" />
            ))}
          </motion.div>
        </div>
        <CategorySection
          title="Top Selling Headphones"
          category="Headphones"
          bgColor="#007baa"
        />
        <CategorySection
          title="Wrist Watch for grabs"
          category="Watch"
          bgColor="#cceaff"
        />
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

  const newProductsDocs = await Product.find({}, "-reviews")
    .lean()
    .sort({
      createdAt: -1,
    })
    .limit(8);

  const topSellingHeadphonesDocs = await Product.find(
    {
      category: "Headphones",
    },
    "-reviews"
  )
    .lean()
    .sort({
      rating: -1,
    })
    .limit(8);

  const bannersDocs = await Banner.find({}).lean();
  await db.disconnect();
  return {
    props: {
      newProducts: newProductsDocs.map(db.convertDocToObj),
      topRatedProducts: topRatedProductsDocs.map(db.convertDocToObj),
      topSellingHeadphones: topSellingHeadphonesDocs.map(db.convertDocToObj),
      banners: bannersDocs.map(db.convertDocToObj),
    },
  };
}

