import { Landing } from "layout";
import { CartCard } from "components";
import { useSelector } from "react-redux";
import { FaOpencart } from "react-icons/fa";

import type { IState } from "interface";
import Link from "next/link";

const Cart = () => {
  const { totalQuantity, cartItems } = useSelector(
    (state: IState) => state.cart
  );
  return (
    <Landing title="Cart | Accessories Hubb">
      <div className="w-full px-3 py-5 space-y-3">
        {totalQuantity > 0 && (
          <h1 className="text-xl md:text-2xl font-medium">
            Shopping Cart ({totalQuantity})
          </h1>
        )}
        <div className="w-full flex flex-col md:flex-row md:items-start space-y-3 md:space-y-0 md:space-x-5">
          {totalQuantity > 0 ? (
            <div className="w-full flex flex-col-reverse lg:flex-row md:gap-5">
              <div className="lg:w-2/3 flex flex-col">
                {cartItems.map((product, index) => (
                  <CartCard key={index} product={product} />
                ))}
              </div>

              <div className="lg:w-1/3">
                <div className="w-full h-40 px-5 py-2 rounded shadow bg-white"></div>
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
              <button className="w-full shadow px-10 py-2 bg-primary font-medium rounded">
                Sign in to your account
              </button>
              <button className="w-full shadow px-10 py-2 bg-white font-medium rounded">
                Sign up now
              </button>
            </div>
          )}
        </div>
      </div>
    </Landing>
  );
};

export default Cart;
