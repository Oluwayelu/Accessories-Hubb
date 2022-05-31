import db from "database";

import { useRouter } from "next/router";
import { Product } from "models";
import { Landing } from "layout";

import type { NextPage, GetServerSideProps } from "next";
import { IProduct } from "interface";
import { ProductCard } from "components";

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
  countProducts: string;
  categories: string;
  brands: string;
  pages: string;
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
  const pageHandler = (e: any, page: string) => {
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
    <Landing title="Search | Accessories Hubb">
      <div className="w-full p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3">
        {products.map((product, index) => (
          <ProductCard key={index} product={product} type="row" />
        ))}
      </div>
    </Landing>
  );
};

export default Search;

interface Query {
  pageSize: number;
  page: number;
  category: string;
  brand: string;
  price: string;
  rating: string;
  sort: string;
  query: string;
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
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
