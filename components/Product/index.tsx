import type { NextPage } from "next";
import type { IProduct, IState } from "interface";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "redux/_actions/cartAction";
import { ProductColumn, ProductRow, ProductSpecial } from "components/Cards";

type Props = {
  type: "row" | "column" | "special";
  product: IProduct;
};

const Product: NextPage<Props> = ({ product, type }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: IState) => state.cart);

  const addToCartHandler = () => {
    dispatch(addToCart(cart, product));
  };
  if (type === "row")
    return <ProductRow product={product} addToCart={addToCartHandler} />;
  if (type === "column")
    return <ProductColumn product={product} addToCart={addToCartHandler} />;
  if (type === "special") return <ProductSpecial product={product} />;
  return null;
};

export default Product;
