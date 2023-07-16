import { FaOpencart, FaAd } from "react-icons/fa";
import { RiCouponLine } from "react-icons/ri";
import { FiLayout, FiUser, FiBell, FiTag } from "react-icons/fi";

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
    Icon: FaOpencart,
  },
  {
    name: "Coupons",
    link: "/admin/coupons",
    Icon: RiCouponLine,
  },
  {
    name: "Users",
    link: "/admin/users",
    Icon: FiUser,
  },
  {
    name: "Promotions",
    dropdown: [
      {
        name: "View promotions",
        link: "/admin/promotions",
        Icon: FiTag,
      },
      {
        name: "Create new promotion",
        link: "/admin/promotion/create",
        Icon: FiLayout,
      },
    ],
    Icon: FaAd,
  },
  {
    name: "Notifications",
    link: "/admin/notifications",
    Icon: FiBell,
  },
];

export const dashboard = [
  {
    name: "Personal Information",
    link: "/dashboard/profile"
  },
  {
    name: "Billing and Payments",
    link: "/dashboard/bill-payments"
  },
  {
    name: "Change password",
    link: "/dashboard/change-password"
  },
  {
    name: "Order History",
    link: "/dashboard/orders"
  },
  {
    name: "Gift Cards",
    link: "/dashboard/gift-cards"
  },
]