import { FiLayout } from "react-icons/fi";

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
        name: "View Producs",
        link: "/admin/producst",
        Icon: FiLayout,
      },
      {
        name: "Add new Product",
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
    dropdown: [
      {
        name: "View Producs",
        link: "/admin/producst",
        Icon: FiLayout,
      },
      {
        name: "Add new Product",
        link: "/admin/product/add-new",
        Icon: FiLayout,
      },
    ],
    Icon: FiLayout,
  },
  {
    name: "Customers",
    link: "/admin/customers",
    Icon: FiLayout,
  },
  {
    name: "Banners",
    dropdown: [
      {
        name: "View Producs",
        link: "/admin/producst",
        Icon: FiLayout,
      },
      {
        name: "Add new Product",
        link: "/admin/product/add-new",
        Icon: FiLayout,
      },
    ],
    Icon: FiLayout,
  },
  {
    name: "Messages",
    link: "/admin/messages",
    Icon: FiLayout,
  },
];
