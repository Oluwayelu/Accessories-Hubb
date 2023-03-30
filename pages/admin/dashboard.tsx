import { useEffect } from "react";

import { motion } from "framer-motion";
import { AiOutlineUser } from "react-icons/ai";
import { FaAngleUp, FaAngleDown } from "react-icons/fa";

import { auth } from "utils/auth";
import { fadeInUp, stagger } from "variants";
import { Admin, AdminCard, Status } from "components";
import { useAppDispatch, useAppSelector } from "hooks";
import { getDashboardSummary } from "redux/_actions/adminAction";

import type { GetServerSideProps } from "next";
const AdminDashboard = () => {
  const dispatch = useAppDispatch();
  const { summary } = useAppSelector((state) => state.admin);

  useEffect(() => {
    dispatch(getDashboardSummary());
  }, [dispatch]);

  return (
    <Admin title="Admin Dashboard">
      {/* Cards Info */}
      <div className="w-full grid grid-cols-2 lg:grid-cols-4 gap-3 lg:gap-5">
        {/* Card */}
        <AdminCard currency title="Sales" value={summary.ordersPrice} />
        <AdminCard title="Orders" value={summary.ordersCount} />
        <AdminCard title="Products" value={summary.productsCount} />
        <AdminCard title="Users" value={summary.usersCount} />
      </div>

      {/* Charts && Tables */}
      <div className="w-full flex flex-col lg:flex-row gap-5">
        {/* Chart */}
        <div className="w-full lg:w-3/4 h-80 md:h-[60vh] flex items-center justify-center bg-white shadow rounded-xl">
          chart
        </div>

        <div className="w-full lg:w-1/4 bg-white shadow rounded-xl overflow-x-auto">
          <div className="w-full p-2 bg-primary-100 border-b-2 border-b-black">
            <h2 className="text-2xl font-medium">Resent Sales</h2>
          </div>

          <motion.div variants={stagger} className="w-full">
            {summary.completedOrder?.map((item, index) => (
              <motion.div
                key={index}
                variants={fadeInUp}
                className="w-full p-2 grid grid-cols-4"
              >
                <div className="w-full  flex items-center justify-center">
                  <div className="w-10 h-10 relative flex justify-center items-center rounded-full bg-gray-200 text-gray-600 overflow-hidden">
                    <AiOutlineUser className="w-5 h-5" />
                  </div>
                </div>
                <div className="w-full col-span-2 flex items-center justify-center">
                  {item.user?.name}
                </div>
                <div className="w-full  flex items-center justify-center">
                  +&#8358;{item.totalPrice.toLocaleString("en-US")}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* table */}
      <div className="w-full space-y-3">
        <h2 className="text-2xl font-medium">Orders History</h2>

        <div className="w-full bg-white shadow rounded-xl overflow-x-auto">
          <table className="w-full gap-5 rounded-xl overflow-hidden">
            <thead className="w-full border-b-2 border-b-black">
              <tr className="w-full py-2  flex items-center justify-between bg-primary-100">
                <th className="w-10 md:w-full">Order Id</th>
                <th className="w-16 md:w-full">Customer name</th>
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
              </tr>
            </thead>
            <motion.tbody variants={stagger} className="w-full px-3">
              {summary.orders?.map((item, index) => (
                <motion.tr
                  key={index}
                  variants={fadeInUp}
                  className="w-full p-2 flex justify-between hover:bg-primary-100 cursor-pointer space-x-2"
                >
                  <td className="w-10 md:w-1/4 flex items-center justify-center">
                    {item._id?.substring(20, 24)}
                  </td>
                  <td className="w-10 md:w-1/4 flex items-center justify-center">
                    {item.user?.name}
                  </td>
                  <td className="w-24 md:w-1/4 flex items-center justify-center">
                    {item.createdAt?.toString().split("T")[0]}
                  </td>
                  <td className="w-16 md:w-1/4 flex items-center justify-center">
                    &#8358;{item.totalPrice.toLocaleString("en-US")}
                  </td>
                  <td className="w-28 md:w-1/4 flex items-center justify-center">
                    <Status status={item.status} />
                  </td>
                </motion.tr>
              ))}
            </motion.tbody>
          </table>
        </div>
      </div>
    </Admin>
  );
};

export default AdminDashboard;

export const getServerSideProps: GetServerSideProps = async (context) => {
  return auth({
    admin: true,
    redirect: context.resolvedUrl,
    token: context.req.cookies.token,
  });
};
