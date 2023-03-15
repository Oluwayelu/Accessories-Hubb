import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { AiFillHeart } from "react-icons/ai";
import { useSession } from "next-auth/react";

import { LOGIN, REGISTER } from "routes";
import { fadeInUp, stagger } from "variants";
import { useAppSelector } from "hooks/useReactRedux";
import { CartCard, ProductCard, Landing } from "components";

import type { IState } from "interface";

const Favourites = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { products } = useAppSelector((state) => state.favourite);
  return (
    <Landing
      title="Favourites"
      description="Favourite products saved for later"
    >
      <div className="max-w-6xl mx-auto px-3 py-5 space-y-3">
        <div className="w-full flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-5">
          {products.length > 0 ? (
            <div className="w-full py-5 flex flex-col lg:rounded-3xl space-y-5">
              <h1 className="text-4xl font-medium">
                Saved Product ({products.length})
              </h1>

              <motion.div
                variants={stagger}
                className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3"
              >
                {products.map((product, index) => (
                  <ProductCard key={index} product={product} type="row" />
                ))}
              </motion.div>
            </div>
          ) : (
            <div className="w-full  flex flex-col items-center space-y-2">
              <div className="p-5 lg:p-10 bg-primary text-white rounded-full cursor-pointer">
                <AiFillHeart className="w-16 h-16 lg:w-32 lg:h-32" />
              </div>
              <p className="text-xl first-letter:lg:text-2xl font-bold">
                You don&apos;t have any Favourite product
              </p>
              <Link href="/">
                <a className="text-primary font-medium">Continue shopping</a>
              </Link>
            </div>
          )}
        </div>
      </div>
    </Landing>
  );
};

export default Favourites;
