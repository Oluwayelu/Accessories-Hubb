import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { FiFilter } from "react-icons/fi";
import {
  FaEye,
  FaTrash,
  FaAngleUp,
  FaAngleDown,
  FaFolder,
} from "react-icons/fa";

import { Input, ProgressBar, Status, Landing, Dashboard } from "components";
import { fadeInUp, fadeInLeft, stagger } from "variants";
import { LOGIN, ORDERS, PROFILE } from "routes";
import { getOrder, getOrderHistory } from "_redux/_actions/orderAction";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";

import type { Session } from "next-auth";
import type { GetServerSideProps } from "next";

const Orders = () => {
  const dispatch = useAppDispatch();

  const { orderItems, totalQuantity } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrderHistory());
  }, [dispatch]);

  return (
    <Dashboard
      title="Orders history"
      description="About Accessoriess Hubb"
    >
      <div className="w-full flex flex-col items-end space-y-3 md:space-y-0">
        <div className="w-full py-5 flex flex-col lg:rounded-3xl space-y-3">
          <h1 className="text-3xl font-medium">Orders History</h1>

          <div className="w-full p-3 bg-white rounded-3xl hover:shadow overflow-x-auto">
            <table className="w-full gap-5">
              <thead className="w-full border-b-2">
                <tr className="w-full flex items-center justify-around">
                  <th className="w-10 md:w-full">Id</th>
                  <th className="w-24 md:w-full flex justify-center items-center space-x-1">
                    <span>Date</span>
                    <div className="flex flex-col justify-center items-center">
                      <button>
                        <FaAngleUp className="w-3 h-3 text-gray-400" />
                      </button>
                      <button>
                        <FaAngleDown className="w-3 h-3 text-gray-400" />
                      </button>
                    </div>
                  </th>
                  <th className="w-16 md:w-full">Total</th>
                  <th className="w-28 md:w-full">Status</th>
                  <th className="w-28 md:w-full">Progress</th>
                </tr>
              </thead>
              <motion.tbody variants={stagger} className="w-full">
                {orderItems.map((item, index) => (
                  <motion.tr
                    key={index}
                    variants={fadeInUp}
                    className="w-full py-2 flex  justify-around space-x-2"
                  >
                    <td className="w-10 md:w-full flex items-center justify-center">
                      {item._id?.substring(20, 24)}
                    </td>
                    <td className="w-24 md:w-full flex items-center justify-center">
                      {item.createdAt?.toString().split("T")[0]}
                    </td>
                    <td className="w-16 md:w-full flex items-center justify-center">
                      &#8358;{item.totalPrice.toLocaleString("en-US")}
                    </td>
                    <td className="w-28 md:w-full flex items-center justify-center">
                      <Status status={item.status} />
                    </td>
                    <td className="w-28 md:w-full flex items-center justify-center">
                      <ProgressBar status={item.status} />

                      <div className="w-5 flex items-center justify-center gap-3">
                        <Link href={`${ORDERS}/${item?._id}`}>
                          <a
                            onClick={() => dispatch(getOrder(item?._id))}
                            className="p-2 bg-primary-100 rounded-full"
                          >
                            <FaEye className="w-3 h-3" />
                          </a>
                        </Link>
                      </div>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>
        </div>

        <div className="w-full md:w-1/2 p-5 rounded-3xl shadow bg-white space-y-3">
          <h1 className="text-xl md:text-2xl font-medium uppercase">
            Orders Summary
          </h1>

          <div>
            <div className="text-lg flex items-center justify-between space-x-1">
              <p>Subtotal ({totalQuantity} Items):</p>
              <p className="font-bold inline-flex items-start">
                <span className="text-sm"> &#8358;</span>
                {orderItems
                  .reduce((a, c) => a + c.totalPrice, 0)
                  .toLocaleString("en-US")}
              </p>
            </div>
          </div>
        </div>
      </div>
    </Dashboard>
  );
};

export default Orders;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: LOGIN + "?redirect=" + ORDERS,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
