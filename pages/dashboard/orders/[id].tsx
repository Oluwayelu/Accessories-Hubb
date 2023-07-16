import Link from "next/link";
import Image from "next/image";
import { useEffect } from "react";

import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { Status, Landing, Loader } from "components";
import { LOGIN } from "routes";
import { getOrder } from "_redux/_actions/orderAction";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";

import type { GetServerSideProps } from "next";
import type { ParsedUrlQuery } from "querystring";

interface Props {
  id: string;
}

const OrderPage = ({ id }: Props) => {
  const dispatch = useAppDispatch();
  const { currOrder, loading } = useAppSelector((state) => state.order);

  useEffect(() => {
    dispatch(getOrder(id));
  }, [dispatch, id]);
  return (
    <Landing
      title={`${currOrder._id?.substring(20, 24)} Order`}
      description="About Accessoriess Hubb"
      className=""
    >
      {loading ? (
        <Loader className="h-[70vh]" color="#F5BD10" />
      ) : (
        <div className="max-w-7xl mx-auto px-3 py-5 space-y-3">
          <div className="w-full flex flex-col md:flex-row md:items-start md:space-x-5">
            <div className="w-full lg:w-2/3 py-5 flex flex-col lg:rounded-3xl space-y-3">
              <div className="w-full flex justify-between items-center">
                <h1 className="text-3xl font-medium">
                  {currOrder._id?.substring(20, 24)} Order
                </h1>

                <Status status={currOrder.status} />
              </div>
              <div className="w-full p-5 bg-white rounded-3xl hover:shadow space-y-5">
                <div className="space-y-2">
                  <h1 className="w-full pb-2 border-b text-xl font-medium">
                    Shipping Address
                  </h1>

                  <div className="w-full flex items-center justify-between">
                    <div className="w-full">
                      <p>
                        <span className="font-medium">Name:</span>{" "}
                        {currOrder.shippingAddress?.fullName}
                      </p>
                      <p>
                        <span className="font-medium">Address:</span>{" "}
                        {currOrder.shippingAddress?.address}.{" "}
                        {currOrder.shippingAddress?.city},{" "}
                        {currOrder.shippingAddress?.state}
                      </p>
                      <p>
                        <span className="font-medium">Phone:</span>{" "}
                        {currOrder.shippingAddress?.phoneNumber}
                      </p>

                      {currOrder.shippingAddress?.location && (
                        <a
                          target="_new"
                          className="text-primary"
                          href={`https://maps.google.com?q=${currOrder.shippingAddress.location.lat},${currOrder.shippingAddress.location.lng}`}
                        >
                          Show On Map
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <h1 className="w-full pb-2 border-b text-xl font-medium">
                    Order Items
                  </h1>

                  <div className="w-full grid grid-cols-2 md:grid-cols-3 items-center justify-between">
                    {currOrder.orderItems?.map((product, index) => (
                      <div
                        key={index}
                        className="w-full flex items-center justify-between space-x-2"
                      >
                        <div className="relative w-1/4 h-16">
                          <Image
                            layout="fill"
                            src={product.image[0]}
                            alt={product.name}
                            className="filter object-contain object-center"
                          />
                        </div>

                        <div className="w-3/4 flex flex-col">
                          <Link href="/">
                            <a className="w-full text-sm font-medium">
                              {product.name}
                            </a>
                          </Link>
                          <div className="flex flex-col gap-1">
                            <p className="text-lg font-bold">
                              &#8358;{product.price.toLocaleString("en-US")}
                            </p>
                          </div>

                          <div>
                            <p className="text-sm">
                              Quantity:{" "}
                              <span className="font-medium">
                                {product.quantity}
                              </span>
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="w-full lg:w-1/4 p-5 rounded-3xl shadow bg-white space-y-3">
              <h1 className="text-xl md:text-2xl font-medium uppercase">
                Order Summary
              </h1>

              <div>
                <div className="text-lg flex items-center justify-between space-x-1">
                  <p>Subtotal ({currOrder.orderItems?.length} Items):</p>
                  <p className="font-bold inline-flex items-start">
                    <span className="text-sm"> &#8358;</span>
                    {currOrder.orderItems
                      ?.reduce((a, c) => a + c.price * c.quantity, 0)
                      .toLocaleString("en-US")}
                  </p>
                </div>
                <div className="text-base flex items-center justify-between space-x-1">
                  <p>Tax:</p>
                  <p className="font-bold inline-flex items-start">
                    <span className="text-sm"> &#8358;</span>
                    {currOrder.taxPrice?.toLocaleString("en-US")}
                  </p>
                </div>
                {currOrder.shippingPrice > 0 ? (
                  <div className="text-base flex items-center justify-between space-x-1">
                    <p>Shipping:</p>
                    <p className="font-bold inline-flex items-start">
                      <span className="text-sm"> &#8358;</span>
                      {currOrder.shippingPrice?.toLocaleString("en-US")}
                    </p>
                  </div>
                ) : (
                  <div className="w-full flex justify-end">
                    <p className="text-sm text-primary">Free shipping</p>
                  </div>
                )}

                <div className="mt-3 pt-3 border-t text-lg flex items-center justify-between space-x-1">
                  <p>Total ({currOrder.orderItems?.length} Items):</p>
                  <p className="font-bold inline-flex items-start">
                    <span className="text-sm"> &#8358;</span>
                    {currOrder.totalPrice?.toLocaleString("en-US")}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </Landing>
  );
};

export default OrderPage;

interface Params extends ParsedUrlQuery {
  id: string;
}

export const getServerSideProps: GetServerSideProps<Props, Params> = async (
  context
) => {
  const params = context.params!;
  const { id } = params;

  const session = await getSession({ req: context.req });
  if (!session) {
    return {
      redirect: {
        destination: LOGIN + "?redirect=/dashboard/orders" + id,
        permanent: false,
      },
    };
  }

  return {
    props: {
      id,
    },
  };
};
