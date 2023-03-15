import ReactPaginate from "react-paginate";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { FiFilter } from "react-icons/fi";
import { FaTimes, FaAngleRight, FaAngleLeft } from "react-icons/fa";

import db from "database";
import { Product } from "models";
import { ProductCard, Select, Landing } from "components";

import type { NextPage, GetServerSideProps } from "next";
import type { IGetServerSideProps, IProduct } from "interface";

const PAGE_SIZE = 8;

const prices = [
  {
    name: "$1 to $50",
    value: "1-50",
  },
  {
    name: "$51 to $200",
    value: "51-200",
  },
  {
    name: "$201 to $1000",
    value: "201-1000",
  },
];

const ratings = [1, 2, 3, 4, 5];

type Props = {
  products: IProduct[];
  countProducts: string[];
  categories: string[];
  brands: string[];
  pages: string[];
};

type Filter = {
  page?: string;
  category?: string;
  brand?: string;
  sort?: string;
  min?: number;
  max?: number;
  searchQuery?: string;
  price?: string;
  rating?: string;
};

const Search: NextPage<Props> = ({
  products,
  countProducts,
  categories,
  brands,
  pages,
}) => {
  const router = useRouter();
  const {
    query = "all",
    category = "all",
    brand = "all",
    price = "all",
    rating = "all",
    sort = "featured",
  } = router.query;

  const filter = () => {
    document.getElementById("filter")?.classList.toggle("hidden");
    document.getElementById("filter")?.classList.toggle("block");
    document.getElementById("filter-background")?.classList.toggle("hidden");
    document.getElementById("filter-background")?.classList.toggle("block");
  };

  const filterSearch = ({
    page,
    category,
    brand,
    sort,
    min,
    max,
    searchQuery,
    price,
    rating,
  }: Filter) => {
    const path = router.pathname;
    const { query } = router;
    if (page) query.page = page;
    if (searchQuery) query.searchQuery = searchQuery;
    if (sort) query.sort = sort;
    if (category) query.category = category;
    if (brand) query.brand = brand;
    if (price) query.price = price;
    if (rating) query.rating = rating;
    if (min) query.min ? query.min : Number(query.min) === 0 ? 0 : min;
    if (max) query.max ? query.max : Number(query.max) === 0 ? 0 : max;

    router.push({
      pathname: path,
      query: query,
    });
  };

  const categoryHandler = (e: { target: { value: string } }) => {
    filterSearch({ category: e.target.value });
  };
  const pageHandler = (page: string) => {
    console.log(page);
    filterSearch({ page });
  };
  const brandHandler = (e: { target: { value: string } }) => {
    filterSearch({ brand: e.target.value });
  };
  const sortHandler = (e: { target: { value: string } }) => {
    filterSearch({ sort: e.target.value });
  };
  const priceHandler = (e: { target: { value: string } }) => {
    filterSearch({ price: e.target.value });
  };
  const ratingHandler = (e: { target: { value: string } }) => {
    filterSearch({ rating: e.target.value });
  };

  return (
    <Landing title="Products" className="relative p-5">
      <div className="max-w-6xl mx-auto flex flex-col space-y-5">
        <div
          onClick={filter}
          id="filter-background"
          className="absolute inset-0 bg-dark/50 hidden z-20"
        />
        <h1 className="text-4xl font-medium">Products</h1>
        <div className="relative w-full flex items-center justify-between text-lg font-medium">
          <div className="w-full flex items-center justify-start gap-3">
            {products.length === 0 ? "No" : countProducts}{" "}
            {Number(countProducts) === 1 ? "Result" : "Results"}
            {query !== "all" && query !== "" && ", " + query}
            {category !== "all" && ", " + category}
            {brand !== "all" && ", " + brand}
            {price !== "all" && ", Price " + price}
            {rating !== "all" && ", Rating " + rating + " & up"}
            {(query !== "all" && query !== "") ||
            category !== "all" ||
            brand !== "all" ||
            rating !== "all" ||
            price !== "all" ? (
              <button onClick={() => router.push("/search")}>
                <FaTimes className="text-red-500" />
              </button>
            ) : null}
          </div>
          <button onClick={filter} className="p-3 bg-primary-100 rounded-xl">
            <FiFilter />
          </button>
          <div
            className="card absolute top-10 right-0 lg:w-1/4 flex-col px-3 py-5 rounded bg-white shadow  z-30 hidden"
            id="filter"
          >
            <Select
              label="Categories"
              value={String(category)}
              onChange={categoryHandler}
              options={["all", ...categories]}
            />
            <Select
              label="Brands"
              value={String(brand)}
              onChange={brandHandler}
              options={["all", ...brands]}
            />
            <Select
              label="Sort by"
              value={String(sort)}
              onChange={sortHandler}
              options={["featured", "lowest", "highest", "toprated", "newest"]}
            />
          </div>
        </div>

        <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3">
          {products.map((product, index) => (
            <ProductCard key={index} product={product} type="row" />
          ))}
        </div>

        <ReactPaginate
          breakLabel="..."
          nextLabel={
            <div className="p-1 bg-white rounded shadow">
              <FaAngleRight className="text-primary w-5 h-5" />
            </div>
          }
          onPageChange={(e) => pageHandler((e.selected + 1).toString())}
          pageRangeDisplayed={1}
          pageCount={pages as unknown as number}
          previousLabel={
            <div className="p-1 bg-white rounded shadow">
              <FaAngleLeft className="text-primary w-5 h-5" />
            </div>
          }
          activeClassName="text-primary font-medium"
          className="w-full flex justify-end items-center gap-2"
        />
      </div>
    </Landing>
  );
};

export default Search;

export const getServerSideProps: IGetServerSideProps = async ({ query }) => {
  await db.connect();
  const pageSize = Number(query.pageSize) || PAGE_SIZE;
  const page = query.page || 1;
  const category = query.category || "";
  const brand = query.brand || "";
  const price = query.price || "";
  const rating = query.rating || "";
  const sort = query.sort || "";
  const searchQuery = query.query || "";

  const queryFilter =
    searchQuery && searchQuery !== "all"
      ? {
          name: {
            $regex: searchQuery,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category !== "all" ? { category } : {};
  const brandFilter = brand && brand !== "all" ? { brand } : {};
  const ratingFilter =
    rating && rating !== "all"
      ? {
          rating: {
            $gte: Number(rating),
          },
        }
      : {};
  // 10-50
  const priceFilter =
    price && price !== "all"
      ? {
          price: {
            $gte: Number((price as string).split("-")[0]),
            $lte: Number((price as string).split("-")[1]),
          },
        }
      : {};

  const order =
    sort === "featured"
      ? { featured: -1 }
      : sort === "lowest"
      ? { price: 1 }
      : sort === "highest"
      ? { price: -1 }
      : sort === "toprated"
      ? { rating: -1 }
      : sort === "newest"
      ? { createdAt: -1 }
      : { _id: -1 };

  const categories = await Product.find().distinct("category");
  const brands = await Product.find().distinct("brand");
  const productDocs = await Product.find(
    {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...brandFilter,
      ...ratingFilter,
    },
    "-reviews"
  )
    .sort(order)
    .skip(pageSize * (Number(page) - 1))
    .limit(pageSize)
    .lean();

  const countProducts = await Product.countDocuments({
    ...queryFilter,
    ...categoryFilter,
    ...priceFilter,
    ...brandFilter,
    ...ratingFilter,
  });
  await db.disconnect();

  const products = productDocs.map(db.convertDocToObj);

  return {
    props: {
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
      categories,
      brands,
    },
  };
};
