import bcrypt from "bcryptjs";
import { IBanner, IProduct } from "interface";

export const users = [
  {
    firstname: "John",
    lastname: "Doe",
    middlename: "Green",
    name: "John Doe",
    email: "admin@ahubb.com",
    imgUrl: "/images/avatar/guy_4.png",
    password: bcrypt.hashSync("admin2022"),
    isAdmin: true,
    verified: true,
  },
  {
    imgUrl: "/images/avatar/guy_3.png",
    middlename: "David",
    firstname: "Ifeoluwa",
    lastname: "Oluwayelu",
    name: "Ifeoluwa Oluwayelu",
    email: "oluwayeluifeoluwa@gmail.com",
    password: bcrypt.hashSync("Gbenga200@"),
    phoneNumber: "+2349053156229",
    verified: true,
    isAdmin: false,
  },
];

export const products: IProduct[] = [
  {
    name: "Boat Earphones",
    slug: "boat-earphones-23se",
    category: "Earphones",
    image: [
      "/images/assets/earphones_a_1.webp",
      "/images/assets/earphones_a_2.webp",
      "/images/assets/earphones_a_3.webp",
      "/images/assets/earphones_a_4.webp",
    ],
    price: 2000,
    brand: "boat",
    rating: 2.5,
    countInStock: 20,
    description: "A popular boat earphones",
  },
  {
    name: "Boat Earphones Pod",
    slug: "boat-earphones-pod-1g5e",
    category: "Earphones",
    image: [
      "/images/assets/earphones_b_1.webp",
      "/images/assets/earphones_b_2.webp",
      "/images/assets/earphones_b_3.webp",
      "/images/assets/earphones_b_4.webp",
    ],
    price: 5200,
    oldPrice: 7000,
    brand: "boat",
    rating: 4.5,
    countInStock: 11,
    description: "A popular wireless Boat earphones pod",
  },
  {
    name: "Boat Earphones Bluetooth",
    slug: "boat-earphones-bluetooth-bb47",
    category: "Earphones",
    image: [
      "/images/assets/earphones_c_1.webp",
      "/images/assets/earphones_c_2.webp",
      "/images/assets/earphones_c_3.webp",
      "/images/assets/earphones_c_4.webp",
    ],
    price: 8000,
    brand: "boat",
    rating: 2.5,
    countInStock: 18,
    description: "A popular boat earphones",
  },
  {
    name: "Apple Headphones",
    slug: "boat-headphones-11hb",
    category: "Headphones",
    image: [
      "/images/assets/headphones_a_1.webp",
      "/images/assets/headphones_a_2.webp",
      "/images/assets/headphones_a_3.webp",
      "/images/assets/headphones_a_4.webp",
    ],
    price: 14200,
    brand: "apple",
    rating: 4.0,
    countInStock: 6,
    description: "A popular boat headphones",
  },
  {
    name: "Boat Headphones Pro2",
    slug: "boat-headphones-pro-7h8i",
    category: "Headphones",
    image: [
      "/images/assets/headphones_b_1.webp",
      "/images/assets/headphones_b_2.webp",
      "/images/assets/headphones_b_3.webp",
      "/images/assets/headphones_b_4.webp",
    ],
    price: 56000,
    oldPrice: 62000,
    brand: "boat",
    rating: 4.8,
    countInStock: 10,
    description: "A popular boat headphones pro",
  },
  {
    name: "Boat Speaker",
    slug: "boat-speaker-nb35",
    category: "Speaker",
    image: [
      "/images/assets/speaker1.webp",
      "/images/assets/speaker2.webp",
      "/images/assets/speaker3.webp",
      "/images/assets/speaker4.webp",
    ],
    price: 25000,
    brand: "boat",
    rating: 4.8,
    countInStock: 10,
    description: "A popular boat speaker",
  },
  {
    name: "Boat Smart watch",
    slug: "boat-smart-watch-sm61",
    category: "Watch",
    image: [
      "/images/assets/watch_1.webp",
      "/images/assets/watch_2.webp",
      "/images/assets/watch_3.webp",
      "/images/assets/watch_4.webp",
    ],
    price: 70000,
    oldPrice: 1000000,
    brand: "boat",
    rating: 5.0,
    countInStock: 12,
    description: "A popular boat smart watch",
  },
  {
    name: "Boat Speaker Supreme",
    slug: "boat-speaker-cw36",
    category: "Speaker",
    image: ["/images/assets/speaker3.webp", "/images/assets/speaker4.webp"],
    price: 15000,
    brand: "boat",
    rating: 3.8,
    countInStock: 10,
    description: "A popular boat speaker",
  },
  {
    name: "Boat Smart watch",
    slug: "boat-smart-watch-ba22",
    category: "Watch",
    image: ["/images/assets/watch_2.webp", "/images/assets/watch_3.webp"],
    price: 65000,
    oldPrice: 72000,
    brand: "boat",
    rating: 3.0,
    countInStock: 12,
    description: "A popular boat smart watch",
  },
  {
    name: "Boat Earphones",
    slug: "boat-earphones-23sc",
    category: "Earphones",
    image: [
      "/images/assets/earphones_a_3.webp",
      "/images/assets/earphones_a_4.webp",
      "/images/assets/earphones_a_1.webp",
      "/images/assets/earphones_a_2.webp",
    ],
    price: 2000,
    brand: "boat",
    rating: 2.5,
    countInStock: 20,
    description: "A popular boat earphones",
  },
  {
    name: "Boat Earphones Pod",
    slug: "boat-earphones-pod-1gc7",
    category: "Earphones",
    image: [
      "/images/assets/earphones_b_3.webp",
      "/images/assets/earphones_b_4.webp",
      "/images/assets/earphones_b_1.webp",
      "/images/assets/earphones_b_2.webp",
    ],
    price: 5200,
    brand: "boat",
    rating: 4.5,
    countInStock: 11,
    description: "A popular wireless Boat earphones pod",
  },
  {
    name: "Boat Earphones Bluetooth",
    slug: "boat-earphones-bluetooth-cc47",
    category: "Earphones",
    image: [
      "/images/assets/earphones_c_3.webp",
      "/images/assets/earphones_c_4.webp",
      "/images/assets/earphones_c_1.webp",
      "/images/assets/earphones_c_2.webp",
    ],
    price: 8000,
    brand: "boat",
    rating: 2.5,
    countInStock: 18,
    description: "A popular boat earphones",
  },
  {
    name: "Boat Headphones",
    slug: "boat-headphones-1c5b",
    category: "Headphones",
    image: [
      "/images/assets/headphones_a_3.webp",
      "/images/assets/headphones_a_2.webp",
      "/images/assets/headphones_a_4.webp",
      "/images/assets/headphones_a_1.webp",
    ],
    price: 14200,
    brand: "boat",
    rating: 4.0,
    countInStock: 6,
    description: "A popular boat headphones",
  },
  {
    name: "Boat Headphones Pro",
    slug: "boat-headphones-pro-c88i",
    category: "Headphones",
    image: [
      "/images/assets/headphones_b_3.webp",
      "/images/assets/headphones_b_4.webp",
      "/images/assets/headphones_b_1.webp",
      "/images/assets/headphones_b_2.webp",
    ],
    price: 56000,
    brand: "boat",
    rating: 4.8,
    countInStock: 10,
    description: "A popular boat headphones pro",
  },
  {
    name: "Boat Speaker Contiental",
    slug: "boat-speaker-n1c4",
    category: "Speaker",
    image: [
      "/images/assets/speaker3.webp",
      "/images/assets/speaker4.webp",
      "/images/assets/speaker1.webp",
      "/images/assets/speaker2.webp",
    ],
    price: 25000,
    oldPrice: 32000,
    brand: "boat",
    rating: 3.8,
    countInStock: 10,
    description: "A popular boat speaker",
  },
  {
    name: "Addidas Smart watch",
    slug: "boat-smart-watch-bg61",
    category: "Watch",
    image: [
      "/images/assets/watch_3.webp",
      "/images/assets/watch_4.webp",
      "/images/assets/watch_1.webp",
      "/images/assets/watch_2.webp",
    ],
    price: 70000,
    oldPrice: 89000,
    brand: "addidas",
    rating: 5.0,
    countInStock: 12,
    description: "A popular boat smart watch",
  },
  {
    name: "Boat Speaker Continet",
    slug: "boat-speaker-io36",
    category: "Speaker",
    image: ["/images/assets/speaker4.webp", "/images/assets/speaker3.webp"],
    price: 15000,
    brand: "boat",
    rating: 3.8,
    countInStock: 10,
    description: "A popular boat speaker",
  },
  {
    name: "Boat Smart watch",
    slug: "boat-smart-watch-vg62",
    category: "Watch",
    image: ["/images/assets/watch_3.webp", "/images/assets/watch_2.webp"],
    price: 65000,
    oldPrice: 72000,
    brand: "boat",
    rating: 3.0,
    countInStock: 12,
    description: "A popular boat smart watch",
  },
];

export const banners: IBanner[] = [
  {
    image: "/images/assets/watch_2.webp",
    title: "Get your Smart Watch",
    buttonText: "Get Now",
    description: "A popular boat smart watch - Lorem ipsum, dolor sit amet.",
    discount: 20,
    saleTime: Date.now() + 30 * 24 * 60 * 60 * 1000,
    color: "#007baa",
  },
  {
    image: "/images/assets/headphones_a_2.webp",
    title: "Boat Headphone up for Grab",
    buttonText: "Shop Now",
    description: "A popular boat headphone - Lorem ipsum, dolor sit amet.",
    discount: 30,
    saleTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
    color: "#e63e67",
  },
  {
    image: "/images/assets/earphones_c_2.webp",
    title: "A Very Affordable Earphone up at 20% discount",
    buttonText: "Shop Now",
    description: "A popular boat earphone - Lorem ipsum, dolor sit amet.",
    discount: 20,
    saleTime: Date.now() + 7 * 24 * 60 * 60 * 1000,
    color: "#ffa573",
  },
];
