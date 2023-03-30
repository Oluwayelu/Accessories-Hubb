import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { auth } from "utils/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { Admin, RatingStars, Loader } from "components";
import { getProducts } from "redux/_actions/productAction";

import type { GetServerSideProps } from "next";

const Product = () => {
  const dispatch = useAppDispatch();
  const { loading, products } = useAppSelector((state) => state.product);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <Admin title="View Products" goBack="/admin">
      <div className="w-full min-h-[50vh] bg-white shadow rounded-xl overflow-x-auto">
        <table className="w-full gap-5">
          <thead className="w-full bg-primary-100 rounded-t-xl border-b-2 border-b-black">
            <tr className="w-[200vw] lg:w-full py-2 grid grid-cols-7 lg:flex items-center justify-between gap-2">
              <th className="w-full inline-flex justify-center">Image</th>
              <th className="w-full inline-flex justify-center">Name</th>
              <th className="w-full inline-flex justify-center">Category</th>
              <th className="w-full inline-flex justify-center">Brand</th>
              <th className="w-full inline-flex justify-center">Price</th>
              <th className="w-full inline-flex justify-center">Ratings</th>
              <th className="w-full inline-flex justify-center">
                No. in stock
              </th>
            </tr>
          </thead>

          {loading ? (
            <tbody>
              <tr>
                <Loader color="#F5BD10" className="w-full h-[50vh]" />
              </tr>
            </tbody>
          ) : (
            <tbody className="w-full text-base font-normal">
              {products.map((product, key) => (
                <Link passHref key={key} href={`/admin/product/${product._id}`}>
                  <tr
                    key={key}
                    className="w-[200vw] lg:w-full py-2 grid grid-cols-7 lg:flex items-center justify-between cursor-pointer hover:bg-primary-100 gap-2"
                  >
                    <th className="w-full inline-flex justify-center">
                      <div className="w-2/3 h-16 md:w-20 md:h-20 relative">
                        <Image
                          layout="fill"
                          src={product.image[0]}
                          alt={product.name}
                          className="filter object-contain object-center"
                        />
                      </div>
                    </th>
                    <th className="w-full inline-flex justify-center">
                      {product.name}
                    </th>
                    <th className="w-full inline-flex justify-center">
                      {product.category}
                    </th>
                    <th className="w-full inline-flex justify-center">
                      {product.brand}
                    </th>
                    <th className="w-full inline-flex justify-center">
                      &#8358;{product.price.toLocaleString("en-US")}
                    </th>
                    <th className="w-full inline-flex justify-center">
                      <RatingStars rating={product.rating} />
                    </th>
                    <th className="w-full inline-flex justify-center">
                      {product.countInStock.toLocaleString("en-US")}
                    </th>
                  </tr>
                </Link>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </Admin>
  );
};

export default Product;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth({
    admin: true,
    redirect: context.resolvedUrl,
    token: context.req.cookies.token,
  });
};
