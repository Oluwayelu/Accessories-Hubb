import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "variants";

import type { IProduct } from "interface";
import type { FunctionComponent } from "react";

type Props = {
  product: IProduct;
};

const Category: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="relative w-24 h-24 md:w-40 md:h-40 snap-start inline-flex flex-none justify-center items-center rounded-full shadow bg-white overflow-hidden">
      <motion.div variants={fadeInUp} className="relative w-1/2 h-1/2">
        <Image alt={product.name} src={product.image[0]} layout="fill" />
      </motion.div>
      <p className="bg-primary-100 pb-2 pt-1 absolute bottom-0 left-0 right-0 text-center text-xs md:text-sm capitalize font-medium">
        {product.category}
      </p>
    </div>
  );
};

export default Category;
