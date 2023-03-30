import { FiLayout, FiUser, FiMessageCircle } from "react-icons/fi";

import { ISidebarRoutes } from "interface";

export const HOME = "/";
export const ABOUT = "/about";
export const CONTACT = "/contact";
export const FAVOURITES = "/favourites";

// Auth Routes
export const LOGIN = "/auth/login";
export const REGISTER = "/auth/register";
export const FORGOTPASSWORD = "/auth/password/forgot";
export const RESETPASSWORD = "/auth/password/reset/:token";

export const CART = "/cart";
export const SEARCH = "/search";
export const CHECKOUT = "/checkout";

export const PRODUCT = "/product/:slug";

// Dasboard Routes
export const PROFILE = "/dashboard/profile";
export const ORDERS = "/dashboard/orders";
export const ORDER = "/dashboard/order/:id";

// Sidebar Routes
export const ADMIN_SETTINGS = "/admin/settigs";
export const sidebar: ISidebarRoutes[] = [
  {
    name: "Dashboard",
    link: "/admin/dashboard",
    Icon: FiLayout,
  },
  {
    name: "Products",
    Icon: FiLayout,
    dropdown: [
      {
        name: "View products",
        link: "/admin/products",
        Icon: FiLayout,
      },
      {
        name: "Add new product",
        link: "/admin/product/add-new",
        Icon: FiLayout,
      },
    ],
  },
  {
    name: "Orders",
    link: "/admin/dashboard/users",
    Icon: FiLayout,
  },
  {
    name: "Coupons",
    link: "/admin/coupons",
    Icon: FiLayout,
  },
  {
    name: "Users",
    link: "/admin/users",
    Icon: FiUser,
  },
  {
    name: "Banners",
    dropdown: [
      {
        name: "View Banners",
        link: "/admin/banners",
        Icon: FiLayout,
      },
      {
        name: "Create new banner",
        link: "/admin/banners/create",
        Icon: FiLayout,
      },
    ],
    Icon: FiLayout,
  },
  {
    name: "Messages",
    link: "/admin/messages",
    Icon: FiMessageCircle,
  },
];
