import Link from "next/link";
import { motion } from "framer-motion";
import { FaAngleRight } from "react-icons/fa";
import { useEffect, useState, useCallback } from "react";

import db from "database";
import { Product } from "models";
import { stagger } from "variants";
import { Banner, ProductCard } from "components";

import type { FC } from "react";
import { IProduct } from "interface";

type Props = {
  title: string;
  category: string;
  bgColor: string;
};

const CategorySection: FC<Props> = ({ title, category, bgColor }) => {
  const [products, setProducts] = useState<IProduct[]>([]);

  const fetchProducts = useCallback(async () => {
    fetch(`/api/v1/products/${category}`)
      .then((res) => res.json())
      .then((res) => setProducts(res));
  }, [category]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (products.length === 0) {
    return null;
  }

  return (
    <div>
      <Banner
        image={products[0].image[0]}
        info={products[0].description}
        btntext="Explore All"
        bgColor={bgColor}
      />
      <div className="w-full">
        <div className="px-3 py-2 w-full flex items-center justify-between">
          <h1 className="text-2xl font-medium">{title}</h1>
          <Link href={`/search?category=${category}`}>
            <a className="inline-flex items-center gap-2">
              See all <FaAngleRight />
            </a>
          </Link>
        </div>
        <motion.div
          variants={stagger}
          className="w-full p-3 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3"
        >
          {products.map((product: IProduct, index: number) => (
            <ProductCard key={index} product={product} type="row" />
          ))}
        </motion.div>
      </div>
    </div>
  );
};

export default CategorySection;
