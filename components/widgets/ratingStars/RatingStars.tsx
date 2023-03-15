import { FC } from "react";
import { FaStar, FaStarHalf } from "react-icons/fa";
import ReactStars from "react-rating-stars-component";

type Props = {
  rating: number;
};

const RatingStars: FC<Props> = ({ rating }) => {
  return (
    <ReactStars
      edit={false}
      value={rating}
      emptyIcon={<FaStar />}
      filledIcon={<FaStar />}
      halfIcon={<FaStarHalf />}
      activeColor="#F5BD10"
    />
  );
};

export default RatingStars;
