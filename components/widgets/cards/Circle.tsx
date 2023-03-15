import Image from "next/image";
import { motion } from "framer-motion";
import { fadeInUp } from "variants";

import type { IProduct } from "interface";
import type { FunctionComponent } from "react";

type Props = {
  product: IProduct;
};

const Circle: FunctionComponent<Props> = ({ product }) => {
  return (
    <div className="w-16 h-16 md:w-32 md:h-32 snap-start inline-flex flex-none justify-center items-center rounded-full shadow bg-primary-100">
      <motion.div variants={fadeInUp} className="relative w-1/2 h-1/2">
        <Image alt={product.name} src={product.image[0]} layout="fill" />
      </motion.div>
    </div>
  );
};

export default Circle;
