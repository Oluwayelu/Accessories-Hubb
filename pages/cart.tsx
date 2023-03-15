import Link from "next/link";
import { motion } from "framer-motion";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { FaOpencart } from "react-icons/fa";
import { useSession } from "next-auth/react";

import { CartCard, Landing } from "components";
import { fadeInUp, stagger } from "variants";
import { LOGIN, REGISTER } from "routes";

import type { IState } from "interface";

const Cart = () => {
  const { push } = useRouter();
  const { data: session } = useSession();
  const { totalQuantity, cartItems } = useSelector(
    (state: IState) => state.cart
  );
  return (
    <Landing title="Cart">
      <div className="max-w-7xl mx-auto px-3 py-5 space-y-3">
        <div className="w-full flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-5">
          {totalQuantity > 0 ? (
            <div className="w-full flex flex-col lg:flex-row items-start justify-around md:gap-5">
              <motion.div
                variants={stagger}
                className="w-full lg:w-2/3 py-5 flex flex-col lg:rounded-3xl space-y-3"
              >
                <h1 className="text-xl md:text-2xl font-medium">
                  Shopping Cart ({totalQuantity})
                </h1>
                {cartItems.map((product, index) => (
                  <CartCard key={index} product={product} />
                ))}

                <p className="self-end font-medium">
                  Subtotal ({totalQuantity} Items): &#8358;
                  {cartItems
                    .reduce((a, c) => a + c.quantity * c.price, 0)
                    .toLocaleString("en-US")}
                </p>
              </motion.div>

              <div className="w-full lg:w-1/4 p-5 rounded-3xl shadow bg-white space-y-3">
                <div className="mb-10 space-y-2">
                  <h1 className="text-xl md:text-2xl font-medium uppercase">
                    Cart Summary
                  </h1>
                  <div className="text-lg flex items-center justify-between space-x-1">
                    <p>Subtotal ({totalQuantity} Items):</p>
                    <p className="font-bold inline-flex items-start">
                      <span className="text-sm"> &#8358;</span>
                      {cartItems
                        .reduce((a, c) => a + c.quantity * c.price, 0)
                        .toLocaleString("en-US")}
                    </p>
                  </div>
                </div>

                <button
                  onClick={() => push("/checkout")}
                  className="w-full shadow py-2 bg-primary font-medium rounded-full"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full  flex flex-col items-center space-y-2">
              <div className="p-5 lg:p-10 bg-primary text-white rounded-full cursor-pointer">
                <FaOpencart className="w-16 h-16 lg:w-32 lg:h-32" />
              </div>
              <p className="text-xl first-letter:lg:text-2xl font-bold">
                Your Cart is empty!
              </p>
              <Link href="/">
                <a className="text-primary font-medium">Continue shopping</a>
              </Link>
              {!session?.user && (
                <div>
                  <Link href={LOGIN}>
                    <a className="w-full md:w-60 flex justify-center shadow py-2 bg-primary font-medium rounded">
                      Sign in to your account
                    </a>
                  </Link>
                  <Link href={REGISTER}>
                    <a className="w-full md:w-60 flex justify-center shadow py-2 bg-white font-medium rounded">
                      Sign up now
                    </a>
                  </Link>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Landing>
  );
};

export default Cart;
