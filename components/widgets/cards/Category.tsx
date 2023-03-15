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
    <div className="flex flex-col items-center gap-2">
      <div className="bg-primary-100 w-16 h-16 md:w-28 md:h-28 snap-start inline-flex flex-none justify-center items-center rounded-full shadow overflow-hidden">
        <motion.div variants={fadeInUp} className="relative w-1/2 h-1/2">
          <Image alt={product.name} src={product.image[0]} layout="fill" />
        </motion.div>
      </div>
      <p className="text-xs md:text-sm capitalize font-medium">
        {product.category}
      </p>
    </div>
  );
};

export default Category;
