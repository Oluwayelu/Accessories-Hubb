import Image from "next/image";
import { FC } from "react";
import { motion } from "framer-motion";

import { fadeInUp } from "variants";
import { RatingStars } from "components";

// import ReactStars from "react-rating-stars-component";

type Props = {
  image: string;
  name: string;
  rating: number;
  comment: string;
  star?: string;
};

const Review: FC<Props> = ({ image, name, rating, comment, star }) => {
  return (
    <motion.div variants={fadeInUp} className="w-full space-y-2">
      <div className="flex flex-row gap-5">
        <div className="w-20 h-20 rounded-full relative">
          <Image
            src={image}
            alt=""
            layout="fill"
            className="filter object-cover rounded-3xl"
          />
        </div>
        <div>
          <p className="font-bold text-lg">{name}</p>
          <RatingStars rating={rating} />
        </div>
      </div>
      <div className="w-full md:w-1/2">
        <p>{comment}</p>
      </div>
    </motion.div>
  );
};

export default Review;
