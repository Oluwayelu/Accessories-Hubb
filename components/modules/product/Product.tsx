import type { NextPage } from "next";
import type { IProduct, AppState } from "interface";

import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "_redux/_actions/cartAction";

import { ProductColumn, ProductRow, ProductSpecial } from "components";

type Props = {
  type: "row" | "column" | "special";
  product: IProduct;
};

const Product: NextPage<Props> = ({ product, type }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state: AppState) => state.cart);

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
