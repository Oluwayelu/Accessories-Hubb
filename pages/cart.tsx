import { Landing } from "layout";
import { CartCard } from "components";
import { useSelector } from "react-redux";
import { FaOpencart } from "react-icons/fa";

import type { IState } from "interface";
import Link from "next/link";
import { useRouter } from "next/router";
import { LOGIN, REGISTER } from "routes";

const Cart = () => {
  const { push } = useRouter();
  const { totalQuantity, cartItems } = useSelector(
    (state: IState) => state.cart
  );
  return (
    <Landing title="Cart">
      <div className="w-full px-3 py-5 space-y-3">
        <div className="w-full flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-5">
          {totalQuantity > 0 ? (
            <div className="w-full flex flex-col-reverse lg:flex-row items-start md:gap-5">
              <div className="w-full lg:w-2/3 px-3 py-3 flex flex-col bg-white lg:rounded shadow space-y-3">
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
              </div>

              <div className="w-full lg:w-1/3 px-5 py-2 lg:rounded shadow bg-white space-y-3">
                <h1 className="text-xl md:text-2xl font-medium uppercase">
                  Cart Summary
                </h1>
                <div className="text-lg flex items-center space-x-1">
                  <p>Subtotal ({totalQuantity} Items):</p>
                  <p className="font-bold inline-flex items-start">
                    <span className="text-sm"> &#8358;</span>
                    {cartItems
                      .reduce((a, c) => a + c.quantity * c.price, 0)
                      .toLocaleString("en-US")}
                  </p>
                </div>

                <button
                  onClick={() => push("/checkout")}
                  className="w-full shadow py-2 bg-primary font-medium rounded"
                >
                  Proceed to Checkout
                </button>
              </div>
            </div>
          ) : (
            <div className="w-full  flex flex-col items-center space-y-2">
              <div className="p-5 lg:p-10 bg-white hover:bg-primary text-black hover:text-white rounded-full cursor-pointer">
                <FaOpencart className="w-16 h-16 lg:w-32 lg:h-32" />
              </div>
              <p className="text-xl first-letter:lg:text-2xl font-bold">
                Your Cart is empty!
              </p>
              <Link href="/">
                <a className="text-primary font-medium">Continue shopping</a>
              </Link>
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
      </div>
    </Landing>
  );
};

export default Cart;
