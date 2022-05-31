import { ReactNode, FunctionComponent } from "react";
import Slick from "react-slick";

type Props = {
  children: ReactNode;
};

const Carousel: FunctionComponent<Props> = ({ children }) => {
  const options = {
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipeToSlide: true,
    className: "center w-full h-40 flex justify-center items-center bg-primary",
    autoplaySpeed: 2000,
  };
  return (
    <Slick pauseOnHover {...options}>
      {children}
    </Slick>
  );
};

export default Carousel;
