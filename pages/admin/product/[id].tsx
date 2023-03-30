import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

import { motion } from "framer-motion";
import { FaEdit, FaTrash } from "react-icons/fa";

import { auth } from "utils/auth";
import { useAppDispatch, useAppSelector } from "hooks";
import { fadeInUp, fadeInRight, stagger } from "variants";
import { Admin, Button, Loader, RatingStars, Modal } from "components";
import { deleteProduct, getProduct } from "redux/_actions/productAction";

import type { GetServerSideProps } from "next";

const AdminProduct = () => {
  const { query } = useRouter();
  const dispatch = useAppDispatch();
  const { loading, product } = useAppSelector((state) => state.product);

  const [activeId, setActiveId] = useState(0);

  useEffect(() => {
    dispatch(getProduct(query.id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch]);

  const openModal = () => {
    document.getElementById("confirm-delete-modal")?.classList.toggle("hidden");
    document.getElementById("confirm-delete-modal")?.classList.toggle("block");
  };

  return (
    <Admin title="Product" goBack="/admin/products">
      <div className="w-full flex justify-end items-center gap-3">
        <Link href={`/admin/product/${query.id}/edit`}>
          <a className="p-3 bg-white shadow rounded-xl">
            <FaEdit className="w-5 h-5" />
          </a>
        </Link>
        <button
          onClick={openModal}
          className="p-3 bg-error text-white shadow rounded-xl"
        >
          <FaTrash className="w-5 h-5" />
        </button>
      </div>
      <Modal id="confirm-delete" title="Delete Product">
        <p>Are you sure you want to delete this product?</p>
        <div className="flex items-center justify-between">
          <Button variant="outline" className="border-black text-black">
            Discard
          </Button>
          <Button
            onClick={() => dispatch(deleteProduct(query.id))}
            className="bg-error text-white"
          >
            Delete
          </Button>
        </div>
      </Modal>

      {loading || !product ? (
        <Loader color="#F5BD10" className="w-full h-[50vh]" />
      ) : (
        <div>
          <div className="w-full px-3 md:px-5 lg:px-20 flex flex-col lg:flex-row justify-center md:justify-start items-center lg:space-x-5">
            <div className="w-full md:w-2/3 lg:w-1/3 flex flex-col items-center">
              <div className="w-full flex justify-center items-center">
                <motion.div
                  variants={fadeInRight}
                  className="w-80 h-80 relative"
                >
                  {product?.image && (
                    <Image
                      src={product.image[activeId]}
                      layout="fill"
                      alt={`${product?.name}`}
                    />
                  )}
                </motion.div>
              </div>
              <div className="w-full flex justify-center items-center space-x-1">
                {product?.image &&
                  product?.image.map((image, index) => (
                    <div
                      key={index}
                      onMouseEnter={() => setActiveId(index)}
                      className={`${
                        activeId === index && "bg-primary-100"
                      } w-20 h-20 relative rounded-3xl shadow bg-white hover:bg-primary-100 cursor-pointer overflow-hidden`}
                    >
                      <Image
                        src={image}
                        layout="fill"
                        alt={`${product?.name}-${index}`}
                      />
                    </div>
                  ))}
              </div>
            </div>

            <motion.div
              variants={stagger}
              className="w-full lg:w-2/3 flex flex-col space-y-3"
            >
              <motion.div variants={fadeInUp}>
                <p className="text-primary">{product?.category}</p>
                <div className="flex items-start">
                  <h1 className="text-xl md:text-2xl">{product?.name}</h1>
                </div>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center space-x-1 text-primary"
              >
                <RatingStars rating={product?.rating} />

                <p>({product?.numReviews})</p>
              </motion.div>
              <motion.div
                variants={fadeInUp}
                className="inline-flex items-center space-x-1"
              >
                <p className="text-2xl md:text-3xl font-bold">
                  &#8358;{product?.price.toLocaleString("en-US")}
                </p>
                {product?.oldPrice && (
                  <p className="text-lg md:text-xl font-medium text-gray-400 line-through">
                    &#8358;{product?.oldPrice.toLocaleString("en-US")}
                  </p>
                )}
              </motion.div>
            </motion.div>
          </div>
        </div>
      )}
    </Admin>
  );
};

export default AdminProduct;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth({
    admin: true,
    redirect: context.resolvedUrl,
    token: context.req.cookies.token,
  });
};
