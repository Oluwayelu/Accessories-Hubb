import Link from "next/link";
import Image from "next/image";
import { MouseEventHandler, useEffect, useState } from "react";

import * as Yup from "yup";
import { ErrorMessage, Formik } from "formik";
import { motion } from "framer-motion";
import { getSession } from "next-auth/react";
import { FiSave } from "react-icons/fi";
import { FaTrash, FaAngleLeft, FaTimes, FaPlus } from "react-icons/fa";

import {
  addNewShippingInfo,
  removeAddress,
  removeCart,
  selectAddress,
  selectPaymentMethod,
} from "_redux/_actions/cartAction";
import { stagger } from "variants";
import { CHECKOUT, LOGIN } from "routes";
import { CheckoutCard, Input, Modal, Landing } from "components";
import { useAppDispatch, useAppSelector } from "hooks/useReactRedux";

import type { IProduct } from "interface";
import type { GetServerSideProps } from "next";
import { placeOrder } from "_redux/_actions/orderAction";

const Checkout = ({ session }: any) => {
  const dispatch = useAppDispatch();

  const cart = useAppSelector((state) => state.cart);
  const {
    totalQuantity,
    cartItems,
    paymentMethod,
    shippingAddress,
    selectedAddress,
  } = cart;

  const [current, setCurrent] = useState<string[]>(["shipping"]);
  const [done, setDone] = useState<string[]>([]);
  const [taxPrice, setTaxPrice] = useState<number>(0);
  const [shippingPrice, setShippingPrice] = useState<number>(0);
  const [totalPrice, setTotalprice] = useState<number>(0);

  const couponCodes = {
    AHUBB: 50,
    YELU: 25,
  };

  const round2 = (num: number) => Math.round(num * 100 + Number.EPSILON) / 100; // 123.456 => 123.46
  const itemsPrice = round2(
    cartItems.reduce((a, c) => a + c.price * c.quantity, 0)
  );

  useEffect(() => {
    setShippingPrice(itemsPrice > 50000 ? 0 : 1000);
    setTaxPrice(round2(itemsPrice * 0.15));

    setTotalprice(round2(itemsPrice + shippingPrice + taxPrice));
  }, [cartItems, itemsPrice, shippingPrice, taxPrice]);

  const removeProduct = (product: IProduct) => {
    dispatch(removeCart(cart, product));
  };

  const applyCoupon = (code: string) => {
    console.log(code);
    if (Object.keys(couponCodes).includes(code.toUpperCase())) {
      setTotalprice((prev) => prev - (couponCodes["AHUBB"] / 100) * prev);
    }
  };

  const addNewAddress = () => {
    document
      .getElementById(`shipping-address-modal`)
      ?.classList.toggle("hidden");
    document
      .getElementById(`shipping-address-modal`)
      ?.classList.toggle("block");
  };

  const purchase = () => {
    dispatch(
      placeOrder({
        orderItems: cartItems,
        shippingAddress: shippingAddress[selectedAddress],
        itemsPrice: cartItems.reduce((a, c) => a + c.quantity * c.price, 0),
        totalPrice,
        taxPrice,
        shippingPrice,
        paymentMethod,
      })
    );
  };

  return (
    <Landing title="Checkout Page">
      <div className="max-w-7xl mx-auto px-3 py-5 space-y-3">
        <div className="w-full flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-5">
          {totalQuantity > 0 ? (
            <div className="w-full flex flex-col lg:flex-row items-start justify-around md:gap-5">
              <motion.div
                variants={stagger}
                className="w-full lg:w-2/3 py-5 flex flex-col lg:rounded-3xl space-y-3"
              >
                <h1 className="text-xl md:text-2xl font-medium">
                  Checkout ({totalQuantity})
                </h1>

                <CheckoutCard
                  checked={done.includes("shipping")}
                  open={current.includes("shipping")}
                  title="Shipping Information"
                  description="Add location to where you product would be shipped to."
                >
                  {shippingAddress?.map((address, key) => (
                    <div
                      key={key}
                      className={`${
                        selectedAddress === key && "border-primary"
                      } w-full flex items-center justify-between p-3 border rounded-xl cursor-pointer`}
                    >
                      <div
                        onClick={() => dispatch(selectAddress(key))}
                        className="w-full"
                      >
                        <p>
                          <span className="font-medium">Name:</span>{" "}
                          {address.fullName}
                        </p>
                        <p>
                          <span className="font-medium">Address:</span>{" "}
                          {address.address}. {address.city}, {address.state}
                        </p>
                        <p>
                          <span className="font-medium">Phone:</span>{" "}
                          {address.phoneNumber}
                        </p>
                      </div>
                      <button
                        onClick={() => dispatch(removeAddress(key))}
                        className="w-10 h-10 flex justify-center items-center text-error space-x-1"
                      >
                        <FaTimes className="w-4 h-4" />
                      </button>
                    </div>
                  ))}

                  <div className="w-full flex justify-center">
                    <button
                      onClick={addNewAddress}
                      className="w-fit px-5 flex justify-center items-center gap-1 shadow py-2 bg-primary font-medium rounded-full"
                    >
                      <FaPlus className="w-4 h-4" />
                      <p className="hidden md:block">Add</p>
                    </button>
                  </div>

                  <div className="w-full flex justify-end">
                    <button
                      disabled={selectedAddress === null}
                      onClick={() => {
                        setCurrent((prev) => [...prev, "payment"]);
                        setDone((prev) => [...prev, "shipping"]);
                      }}
                      className="w-fit px-5 flex justify-center items-center gap-1 shadow py-2 bg-primary disabled:bg-primary-100 font-medium rounded-xl"
                    >
                      Next
                    </button>
                  </div>
                </CheckoutCard>
                <Modal id="shipping-address" title="Shipping address">
                  <Formik
                    initialValues={{
                      firstname: "",
                      lastname: "",
                      phoneNumber: "",
                      address: "",
                      city: "",
                      state: "",
                    }}
                    validationSchema={Yup.object().shape({
                      firstname: Yup.string().required("Firstname is required"),
                      lastname: Yup.string().required("Lastname is required"),
                      phoneNumber: Yup.string().required(
                        "Phone number is required"
                      ),
                      address: Yup.string().required(
                        "Street address is required"
                      ),
                      city: Yup.string().required("City is required"),
                      state: Yup.string().required("State is required"),
                    })}
                    onSubmit={(values, { setStatus, setSubmitting }) => {
                      console.log(values);
                      dispatch(addNewShippingInfo(values));
                    }}
                  >
                    {({
                      handleSubmit,
                      handleChange,
                      values,
                      touched,
                      errors,
                    }) => (
                      <form onSubmit={handleSubmit} className="space-y-2">
                        <div className="w-full grid md:grid-cols-2 gap-1 md:gap-3">
                          <Input
                            formik
                            name="firstname"
                            value={values.firstname}
                            onChange={handleChange}
                            label="First name"
                            placeholder="Enter your firstname"
                          />

                          <Input
                            formik
                            name="lastname"
                            value={values.lastname}
                            onChange={handleChange}
                            label="Last name"
                            placeholder="Enter your lastname"
                          />

                          <Input
                            formik
                            type="tel"
                            name="phoneNumber"
                            value={values.phoneNumber}
                            onChange={handleChange}
                            label="Phone Number"
                            placeholder="Enter your phone number"
                          />

                          <Input
                            formik
                            name="address"
                            value={values.address}
                            onChange={handleChange}
                            label="Street Address"
                            placeholder="House number and street name"
                          />

                          <Input
                            formik
                            name="city"
                            value={values.city}
                            onChange={handleChange}
                            label="Town/City"
                            placeholder="Enter your city"
                          />

                          <Input
                            formik
                            name="state"
                            value={values.state}
                            onChange={handleChange}
                            label="State/Region"
                            placeholder="Enter your state"
                          />
                        </div>
                        <div className="w-full flex justify-end gap-2">
                          <button
                            type="submit"
                            className="w-fit md:w-24 px-5 flex justify-center items-center gap-1 shadow py-2 bg-primary disabled:bg-primary-100 font-medium rounded-full"
                          >
                            <FiSave className="w-5 h-5" />
                            <p className="hidden md:block">Save</p>
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>
                </Modal>
                <CheckoutCard
                  checked={done.includes("payment")}
                  open={current.includes("payment")}
                  title="Payment Method"
                >
                  <Formik
                    initialValues={{
                      method: "",
                      coupon: "",
                    }}
                    validationSchema={Yup.object().shape({
                      method: Yup.string().required("Payment is required"),
                    })}
                    onSubmit={({ method }, { setStatus, setSubmitting }) => {
                      dispatch(selectPaymentMethod(method));
                      setCurrent((prev) => [...prev, "purchase"]);
                      setDone((prev) => [...prev, "payment"]);
                    }}
                  >
                    {({ handleSubmit, handleChange, values }) => (
                      <form onSubmit={handleSubmit} className="space-y-5">
                        <ErrorMessage
                          name="method"
                          component="div"
                          className="text-error"
                        />
                        <div className="w-full flex items-center gap-2">
                          <input
                            id="cash"
                            type="radio"
                            value="cash"
                            name="method"
                            onChange={handleChange}
                            defaultChecked={values.method === "cash"}
                          />

                          <label htmlFor="cash">Cash on delivery</label>
                        </div>

                        <div className="w-full flex items-center gap-2">
                          <input
                            type="radio"
                            name="method"
                            id="pay-online"
                            value="pay-online"
                            onChange={handleChange}
                            defaultChecked={values.method === "pay-online"}
                          />
                          <div className="flex flex-col space-y-2">
                            <div className="w-fit flex items-center px-3 py-1 border-x border-b rounded space-x-2">
                              <div className="relative w-5 h-5">
                                <Image
                                  src="/icons/visa.svg"
                                  layout="fill"
                                  alt="visa"
                                />
                              </div>
                              <div className="relative w-5 h-5">
                                <Image
                                  src="/icons/mastercard.svg"
                                  layout="fill"
                                  alt="mastercard"
                                />
                              </div>
                            </div>
                            <label htmlFor="pay-online">
                              Pay online with ussd, bank transfer{" "}
                            </label>
                          </div>
                        </div>

                        <div className="relative w-2/3 md:w-1/2">
                          <input
                            type="text"
                            name="coupon"
                            onChange={handleChange}
                            placeholder="Enter Coupon code"
                            className="w-full uppercase placeholder:capitalize py-2 pl-3 pr-20 border-2 border-gray-400 focus:border-primary rounded-xl"
                          />
                          <div className="absolute inset-y-0 right-0 flex items-center pr-1">
                            <button
                              onClick={() => applyCoupon(values.coupon)}
                              type="button"
                              className="w-fit px-3 py-2 text-sm bg-primary text-white rounded-lg"
                            >
                              Apply
                            </button>
                          </div>
                        </div>

                        <div className="w-full flex justify-end">
                          <button
                            type="submit"
                            // disabled={selectedAddress === null}
                            onClick={() => {}}
                            className="w-fit px-5 flex justify-center items-center gap-1 shadow py-2 bg-primary disabled:bg-primary-100 font-medium rounded-xl"
                          >
                            Next
                          </button>
                        </div>
                      </form>
                    )}
                  </Formik>

                  {/* payment methods */}
                  {/* <div className="w-full flex items-center space-x-5">
                    <div className="w-fit px-5 py-1 border-2 border-gray-400 hover:border-primary rounded-xl cursor-pointer">
                      <div className="relative w-10 h-10">
                        <Image src="/icons/visa.svg" layout="fill" alt="visa" />
                      </div>
                    </div>
                    <div className="w-fit px-5 py-1 border-2 border-gray-400 hover:border-primary rounded-xl cursor-pointer">
                      <div className="relative w-10 h-10">
                        <Image
                          src="/icons/mastercard.svg"
                          layout="fill"
                          alt="mastercard"
                        />
                      </div>
                    </div>
                    <div className="w-fit px-5 py-1 border-2 border-gray-400 hover:border-primary rounded-xl cursor-pointer">
                      <div className="relative w-10 h-10">
                        <Image
                          src="/icons/paypal.svg"
                          layout="fill"
                          alt="paypal"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="w-full grid md:grid-cols-2 gap-3 md:gap-5">
                    <Input
                      name="name"
                      label="Card Name"
                      placeholder="John Doe"
                    />

                    <Input
                      name="card-number"
                      label="Card Number"
                      placeholder="xxxx-xxxx-xxxx-xxxx"
                    />

                    <Input name="exp" label="Exp. Date" placeholder="MM/YY" />

                    <Input name="cvv" label="CVV" placeholder="xxx" />

                    
                  </div> */}
                </CheckoutCard>
              </motion.div>

              <div className="w-full lg:w-1/4 p-5 rounded-3xl shadow bg-white space-y-3">
                <div className="mb-3 space-y-3">
                  <h1 className="text-xl md:text-2xl font-medium uppercase">
                    Order Reviews
                  </h1>
                  <Link href={"/cart"}>
                    <a className="inline-flex items-center justify-start space-x-px text-primary ">
                      <FaAngleLeft className="w-4 h-4" />
                      <p className="">Back to cart</p>
                    </a>
                  </Link>

                  <div className="w-full py-2 border-b-2 space-y-2">
                    {cartItems?.map((product, index) => (
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

                        <div className="w-2/4 flex flex-col">
                          <Link href={`/product/${product.slug}`}>
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
                        <div className="w-fit inline-flex justify-end h-fit">
                          <button
                            onClick={() => removeProduct(product)}
                            className="px-3 flex items-center text-error space-x-1"
                          >
                            <FaTrash className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* subtotal, tax, shipping fees */}
                  <div className="w-full pb-3 border-b-2">
                    <div className="text-base flex items-center justify-between space-x-1">
                      <p>Subtotal ({totalQuantity} Items):</p>
                      <p className="font-bold inline-flex items-start">
                        <span className="text-sm"> &#8358;</span>
                        {cartItems
                          .reduce((a, c) => a + c.quantity * c.price, 0)
                          .toLocaleString("en-US")}
                      </p>
                    </div>
                    <div className="text-base flex items-center justify-between space-x-1">
                      <p>Tax:</p>
                      <p className="font-bold inline-flex items-start">
                        <span className="text-sm"> &#8358;</span>
                        {taxPrice.toLocaleString("en-US")}
                      </p>
                    </div>
                    {shippingPrice > 0 ? (
                      <div className="text-base flex items-center justify-between space-x-1">
                        <p>Shipping:</p>
                        <p className="font-bold inline-flex items-start">
                          <span className="text-sm"> &#8358;</span>
                          {shippingPrice.toLocaleString("en-US")}
                        </p>
                      </div>
                    ) : (
                      <div className="w-full flex justify-end">
                        <p className="text-sm text-primary">Free shipping</p>
                      </div>
                    )}
                  </div>
                  <div className="text-lg flex items-center justify-between space-x-1">
                    <p>Total:</p>
                    <p className="font-bold inline-flex items-start">
                      <span className="text-sm"> &#8358;</span>
                      {totalPrice.toLocaleString("en-US")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={purchase}
                  disabled={!current.includes("purchase")}
                  className="w-full shadow py-2 bg-primary disabled:bg-primary-100 font-medium rounded-full"
                >
                  {current.includes("purchase")
                    ? paymentMethod === "cash"
                      ? "Place Order"
                      : "Pay Now"
                    : "Purchase"}
                </button>
              </div>
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </Landing>
  );
};

export default Checkout;

export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getSession({ req: context.req });

  if (!session) {
    return {
      redirect: {
        destination: LOGIN + "?redirect=" + CHECKOUT,
        permanent: false,
      },
    };
  }

  return {
    props: { session },
  };
};
